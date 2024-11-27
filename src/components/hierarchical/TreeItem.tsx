import React, { useState } from "react";
import {
  TreeNode,
  NodeType,
  CourseMetadata,
  ProgramMetadata,
  FacultyMetadata,
} from "@/types/tree";
import { ChevronRight, ChevronDown } from "lucide-react";

interface TreeItemProps {
  node: TreeNode;
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
  level?: number;
  selectedNodes: Record<string, TreeNode & { panel: "left" | "right" }>;
  panel: "left" | "right";
}

const getNodeTypeStyles = (type: NodeType) => {
  switch (type) {
    case NodeType.COLLEGE:
      return "bg-[#005035]/10 hover:bg-[#005035]/20 border-[#005035]/20";
    case NodeType.DEPARTMENT:
      return "bg-[#005035]/20 hover:bg-[#005035]/30 border-[#005035]/30";
    case NodeType.PROGRAM:
      return "bg-[#B3A369]/10 hover:bg-[#B3A369]/20 border-[#B3A369]/20";
    case NodeType.COURSE:
      return "bg-[#B3A369]/20 hover:bg-[#B3A369]/30 border-[#B3A369]/30";
    default:
      return "bg-gray-50 hover:bg-gray-100 border-gray-100";
  }
};

// @ts-expect-error - FuseResult type mismatch
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

export const TreeItem: React.FC<TreeItemProps> = ({
  node,
  isSelected,
  onSelect,
  level = 0,
  selectedNodes,
  panel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  // Check if any children are selected
  const hasSelectedChildren =
    hasChildren &&
    node.children?.some((child) => {
      const key = `${panel}-${child.id}`;
      return (
        !!selectedNodes[key] ||
        (child.children &&
          child.children.some(
            (grandChild) => !!selectedNodes[`${panel}-${grandChild.id}`]
          ))
      );
    });

  const renderMetadata = () => {
    if (!node.metadata) return null;

    switch (node.type) {
      case NodeType.COURSE: {
        const metadata = node.metadata as CourseMetadata;
        return (
          <div className="mt-2 text-sm space-y-1 border-t border-gray-200 pt-2">
            {metadata.faculty && (
              <p className="text-gray-600">
                <span className="font-medium">Instructor:</span>{" "}
                {metadata.faculty.join(", ")}
              </p>
            )}
            {metadata.prerequisites && metadata.prerequisites.length > 0 && (
              <p className="text-gray-600">
                <span className="font-medium">Prerequisites:</span>{" "}
                {metadata.prerequisites.join(", ")}
              </p>
            )}
            {metadata.lab && (
              <p className="text-gray-600">
                <span className="font-medium">Lab:</span> {metadata.lab}
              </p>
            )}
          </div>
        );
      }
      case NodeType.PROGRAM: {
        const metadata = node.metadata as ProgramMetadata;
        return (
          <div className="mt-2 text-sm space-y-1 border-t border-gray-200 pt-2">
            {metadata.creditHours && (
              <p className="text-gray-600">
                <span className="font-medium">Credit Hours:</span>{" "}
                {metadata.creditHours}
              </p>
            )}
            {metadata.duration && (
              <p className="text-gray-600">
                <span className="font-medium">Duration:</span>{" "}
                {metadata.duration}
              </p>
            )}
          </div>
        );
      }
      case NodeType.FACULTY: {
        const metadata = node.metadata as FacultyMetadata;
        return (
          <div className="mt-2 text-sm space-y-1 border-t border-gray-200 pt-2">
            <p className="text-gray-600">
              <span className="font-medium">Research Areas:</span>{" "}
              {metadata.researchAreas.join(", ")}
            </p>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);

    // If node has children and is being selected, expand it
    if (hasChildren && !isSelected) {
      setIsExpanded(true);
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mb-2">
      <div
        className={`
          rounded-md border transition-all duration-200
          ${getNodeTypeStyles(node.type)}
          ${isSelected || hasSelectedChildren ? "ring-2 ring-blue-500" : ""}
          p-3 relative
        `}
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex items-center gap-2">
          {/* Expand/Collapse button */}
          <div className="flex-shrink-0 w-6">
            {hasChildren && (
              <button
                onClick={handleExpandClick}
                className="w-6 h-6 flex items-center justify-center rounded 
                         hover:bg-black/5 text-gray-600 hover:text-gray-800"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Selection checkbox */}
          <div className="flex-shrink-0">
            <button
              onClick={handleCheckboxClick}
              className={`
                w-5 h-5 rounded border
                transition-colors duration-200
                ${
                  isSelected
                    ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                    : hasSelectedChildren
                    ? "bg-blue-200 border-blue-300 hover:bg-blue-300"
                    : "bg-white border-gray-300 hover:border-blue-400"
                }
              `}
            >
              {isSelected && "✓"}
              {!isSelected && hasSelectedChildren && "−"}
            </button>
          </div>

          {/* Node content */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{node.name}</span>
              {node.code && (
                <span className="text-sm text-gray-500">({node.code})</span>
              )}
              <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full text-gray-600">
                {getNodeTypeLabel(node.type)}
              </span>
            </div>

            {/* Description */}
            {node.description && (
              <p className="text-sm text-gray-600 mt-1">{node.description}</p>
            )}

            {/* Metadata section */}
            {isExpanded && renderMetadata()}
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-2 transition-all duration-200">
          {node.children?.map((child) => (
            <TreeItem
              key={`${node.id}-${child.id}`}
              node={child}
              isSelected={!!selectedNodes[`${panel}-${child.id}`]}
              onSelect={onSelect}
              level={level + 1}
              selectedNodes={selectedNodes}
              panel={panel}
            />
          ))}
        </div>
      )}
    </div>
  );
};
