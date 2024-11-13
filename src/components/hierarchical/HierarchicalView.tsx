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

  const handleNodeSelect = (node: TreeNode, panel: 'left' | 'right') => {
    const next = { ...selectedNodes };
    const key = `${panel}-${node.id}`;
    
    if (next[key]) {
      delete next[key];
    } else {
      next[key] = { ...node, panel };
    }
    
    setSelectedNodes(next);
    onSelectionChange?.(next);
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
