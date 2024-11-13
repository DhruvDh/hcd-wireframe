import React from "react";
import { NodeType, TreeNode } from "@/types/tree";
import { FilterSection } from "@/components/hierarchical/FilterSection";

interface SelectedNode extends TreeNode {
  panel: "left" | "right";
}

interface SidePanelProps {
  selectedNodes: Record<string, SelectedNode>;
  onRemoveSelection: (nodeId: string, panel: "left" | "right") => void;
  onFilterChange: (filters: NodeType[]) => void;
  onExploreClick: () => void;
}

// @ts-expect-error - Duplicate function from TreeItem component, but needed for label display
const getNodeTypeLabel = (type: NodeType): string => {
  switch (type) {
    case NodeType.COLLEGE:
      return "College";
    case NodeType.DEPARTMENT:
      return "Dept";
    case NodeType.PROGRAM:
      return "Program";
    case NodeType.COURSE:
      return "Course";
  }
};

export const SidePanel: React.FC<SidePanelProps> = ({
  selectedNodes,
  onRemoveSelection,
  onFilterChange,
  onExploreClick,
}) => {
  return (
    <div className="w-80 border-r border-gray-200 bg-gray-50 p-4">
      <h2 className="text-xl font-semibold mb-4">Configuration</h2>

      <FilterSection onFilterChange={onFilterChange} />

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Selected Items</h3>
        <div className="space-y-2">
          {Object.entries(selectedNodes).map(([key, node]) => (
            <div
              key={key}
              className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm"
            >
              <div>
                <span className="text-sm font-medium">{node.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({getNodeTypeLabel(node.type)})
                </span>
              </div>
              <button
                onClick={() => onRemoveSelection(node.id, node.panel)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(selectedNodes).length > 0 && (
        <button
          onClick={onExploreClick}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Explore Relationships
        </button>
      )}
    </div>
  );
};
