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
  onBackClick: () => void;
  showExploreButton: boolean;
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
  onBackClick,
  showExploreButton,
}) => {
  return (
    <div className="w-80 border-r border-[#005035]/20 bg-[#005035]/5 p-4">
      <h2 className="text-xl font-semibold mb-2">Configuration</h2>
      <p className="text-sm text-gray-500 italic mb-4">
        Use filters to focus on specific types of academic entities. This helps narrow down your search across both views.
      </p>

      <FilterSection onFilterChange={onFilterChange} />

      {!showExploreButton && (
        <button
          onClick={onBackClick}
          className="w-full my-4 bg-[#005035] text-white py-2 px-4 rounded-md hover:bg-[#005035]/90"
        >
          ← Back to Browse Mode
        </button>
      )}

      {showExploreButton && Object.keys(selectedNodes).length > 0 && (
        <button
          onClick={onExploreClick}
          className="w-full my-4 bg-[#005035] text-white py-2 px-4 rounded-md hover:bg-[#005035]/90"
        >
          Explore Relationships
        </button>
      )}

      <div className="mt-2">
        <h3 className="text-lg font-medium mb-2">Selected Items</h3>
        <p className="text-sm text-gray-500 italic mb-3">
          Items you select from either view will appear here. Select multiple items to discover their relationships in Relationship Mode.
        </p>
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
    </div>
  );
};
