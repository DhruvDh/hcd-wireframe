import React, { useState } from "react";
import { TreePanel } from "@/components/hierarchical/TreePanel";
import { SidePanel } from "@/components/hierarchical/SidePanel";
import { mockHierarchicalData } from "@/lib/mock-data";
import { TreeNode, NodeType } from "@/types/tree";
import { RadialView } from "@/components/radial/RadialView";
import { SearchBar } from '@/components/hierarchical/SearchBar';

interface SelectedNode extends TreeNode {
  panel: 'left' | 'right';
}

interface HierarchicalViewProps {
  onSelectionChange?: (nodes: Record<string, SelectedNode>) => void;
}

const HierarchicalView: React.FC<HierarchicalViewProps> = ({ onSelectionChange }) => {
  const [selectedNodes, setSelectedNodes] = useState<Record<string, SelectedNode>>({});
  const [activeFilters, setActiveFilters] = useState<NodeType[]>([]);
  const [showRadial, setShowRadial] = useState(false);

  // Helper function to get all descendants of a node
  const getAllDescendants = (node: TreeNode): TreeNode[] => {
    const descendants: TreeNode[] = [];
    if (node.children) {
      node.children.forEach(child => {
        descendants.push(child);
        descendants.push(...getAllDescendants(child));
      });
    }
    return descendants;
  };

  // Helper function to check if a node is already selected in any panel
  const isNodeSelectedInAnyPanel = (nodeId: string): boolean => {
    return Object.keys(selectedNodes).some(key => key.endsWith(`-${nodeId}`));
  };

  const handleNodeSelect = (node: TreeNode, panel: 'left' | 'right') => {
    const key = `${panel}-${node.id}`;
    
    setSelectedNodes(prev => {
      const next = { ...prev };
      const descendants = getAllDescendants(node);
      
      // Check if the node is currently selected
      const isSelected = !!next[key];
      
      if (isSelected) {
        // Deselect the node and all its descendants
        delete next[key];
        descendants.forEach(descendant => {
          delete next[`${panel}-${descendant.id}`];
        });
      } else {
        // Check if node or any descendants are selected in the other panel
        const otherPanel = panel === 'left' ? 'right' : 'left';
        const isNodeSelectedInOtherPanel = !!next[`${otherPanel}-${node.id}`];
        const isAnyDescendantSelectedInOtherPanel = descendants.some(
          d => !!next[`${otherPanel}-${d.id}`]
        );

        if (isNodeSelectedInOtherPanel || isAnyDescendantSelectedInOtherPanel) {
          return prev; // Don't allow selection if already selected in other panel
        }

        // Select the node and all its descendants
        next[key] = { ...node, panel };
        descendants.forEach(descendant => {
          next[`${panel}-${descendant.id}`] = { ...descendant, panel };
        });
      }
      
      return next;
    });
  };

  const handleRemoveSelection = (nodeId: string, panel: 'left' | 'right') => {
    setSelectedNodes(prev => {
      const next = { ...prev };
      delete next[`${panel}-${nodeId}`];
      return next;
    });
  };

  const getSelectedNodesForPanel = (panel: 'left' | 'right') => {
    return Object.values(selectedNodes).filter(node => node.panel === panel);
  };

  const filterData = (data: TreeNode[]): TreeNode[] => {
    if (activeFilters.length === 0) return data;
    
    const filterNode = (node: TreeNode): TreeNode | null => {
      if (activeFilters.includes(node.type)) {
        return node;
      }
      
      if (node.children && node.children.length > 0) {
        const filteredChildren = node.children
          .map(filterNode)
          .filter((n): n is TreeNode => n !== null);
        
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
      }
      
      return null;
    };

    return data
      .map(filterNode)
      .filter((n): n is TreeNode => n !== null);
  };

  const handleSearchSelect = (node: TreeNode) => {
    const existingSelection = Object.entries(selectedNodes).find(
      ([key, selectedNode]) => selectedNode.id === node.id
    );

    if (existingSelection) {
      return;
    }

    const leftCount = Object.values(selectedNodes).filter(n => n.panel === 'left').length;
    const rightCount = Object.values(selectedNodes).filter(n => n.panel === 'right').length;
    
    const targetPanel = leftCount <= rightCount ? 'left' : 'right';
    handleNodeSelect(node, targetPanel);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <SidePanel 
        selectedNodes={selectedNodes}
        onRemoveSelection={handleRemoveSelection}
        onFilterChange={setActiveFilters}
        onExploreClick={() => setShowRadial(true)}
        onBackClick={() => setShowRadial(false)}
        showExploreButton={!showRadial}
      />
      {!showRadial ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-[#005035]/20 bg-[#005035]/5">
            <h1 className="text-3xl font-bold text-[#005035] mb-2">
              Academic Compass - Browse Mode
            </h1>
            <p className="text-sm text-gray-500 italic mb-4">
              Browse and select courses, faculty, or programs that interest you. The two panels below act as separate views 
              into the same data, like having two monitors. Once you've made your selections, click "Explore Relationships" 
              to discover how they're connected.
            </p>
            <SearchBar 
              data={mockHierarchicalData} 
              onSelect={handleSearchSelect}
              placeholder="Search for courses, faculty, or programs..."
            />
          </div>
          <div className="flex-1 flex">
            <div className="flex-1 border-r border-gray-200 min-h-[calc(100vh-4rem)]">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Primary View</h2>
                <p className="text-sm text-gray-500 italic">
                  Both views show the same academic structure. Select items here to compare with the Secondary View.
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  {getSelectedNodesForPanel('left').length} items selected
                </div>
              </div>
              <div className="p-4">
                <TreePanel 
                  data={filterData(mockHierarchicalData)}
                  panel="left"
                  selectedNodes={selectedNodes}
                  onNodeSelect={handleNodeSelect}
                />
              </div>
            </div>
            <div className="flex-1 min-h-[calc(100vh-4rem)]">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Secondary View</h2>
                <p className="text-sm text-gray-500 italic">
                  Use this view to explore different branches while keeping your Primary View as reference.
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  {getSelectedNodesForPanel('right').length} items selected
                </div>
              </div>
              <div className="p-4">
                <TreePanel 
                  data={filterData(mockHierarchicalData)}
                  panel="right"
                  selectedNodes={selectedNodes}
                  onNodeSelect={handleNodeSelect}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <div className="p-4 border-b border-[#005035]/20 bg-[#005035]/5">
            <div>
              <h1 className="text-3xl font-bold text-[#005035] mb-2">
                Academic Compass - Relationship Mode
              </h1>
              <p className="text-sm text-gray-500 italic">
                Click and drag on the canvas below to pan the view to your selected entities. 
                If nothing appears, try selecting "Dr. Sarah Smith" and "AI and Robotics" in Browse Mode.
              </p>
            </div>
          </div>
          <RadialView selectedNodes={selectedNodes} />
        </div>
      )}
    </div>
  );
};

export default HierarchicalView;
