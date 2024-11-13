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
      />
      {!showRadial ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <SearchBar 
              data={mockHierarchicalData} 
              onSelect={handleSearchSelect}
            />
          </div>
          <div className="flex-1 flex">
            <div className="flex-1 border-r border-gray-200 min-h-[calc(100vh-4rem)]">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold">Left Panel</h2>
                <div className="text-sm text-gray-600">
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
                <h2 className="text-lg font-semibold">Right Panel</h2>
                <div className="text-sm text-gray-600">
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
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Relationship View</h2>
            <button 
              onClick={() => setShowRadial(false)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Selection
            </button>
          </div>
          <RadialView selectedNodes={selectedNodes} />
        </div>
      )}
    </div>
  );
};

export default HierarchicalView;
