import { TreeNode } from "@/types/tree";
import { RelationshipType } from "@/lib/mock-data";

export interface NodePosition {
  x: number;
  y: number;
  radius: number;
}

export interface PositionedNode extends TreeNode {
  x: number;
  y: number;
  radius: number;
}

export const calculateNodePositions = (
  nodes: TreeNode[],
  width: number,
  height: number,
  centerRadius: number = 200
): PositionedNode[] => {
  const center = { x: width / 2, y: height / 2 };
  const angleStep = (2 * Math.PI) / nodes.length;

  return nodes.map((node, i) => {
    const angle = i * angleStep;
    return {
      ...node,
      x: center.x + Math.cos(angle) * centerRadius,
      y: center.y + Math.sin(angle) * centerRadius,
      radius: getNodeRadius(node),
    };
  });
};

export const getNodeRadius = (node: TreeNode): number => {
  switch (node.type) {
    case 'college':
      return 40;
    case 'department':
      return 35;
    case 'program':
      return 30;
    case 'course':
      return 25;
    default:
      return 20;
  }
};

export const getRelationshipStyle = (type: RelationshipType) => {
  switch (type) {
    case RelationshipType.TEACHES:
      return {
        strokeWidth: 2,
        strokeDasharray: "none",
        color: "#4B5563", // gray-600
      };
    case RelationshipType.PREREQUISITE:
      return {
        strokeWidth: 2,
        strokeDasharray: "5,5",
        color: "#DC2626", // red-600
      };
    case RelationshipType.COLLABORATES:
      return {
        strokeWidth: 2,
        strokeDasharray: "2,2",
        color: "#2563EB", // blue-600
      };
    case RelationshipType.RESEARCHES:
      return {
        strokeWidth: 2,
        strokeDasharray: "none",
        color: "#7C3AED", // purple-600
      };
    default:
      return {
        strokeWidth: 1,
        strokeDasharray: "none",
        color: "#9CA3AF", // gray-400
      };
  }
};

export const calculateCurvedPath = (
  source: PositionedNode,
  target: PositionedNode
): string => {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const dr = Math.sqrt(dx * dx + dy * dy);
  
  // Calculate points where line should start/end (on node boundaries)
  const angle = Math.atan2(dy, dx);
  const sourceX = source.x + Math.cos(angle) * source.radius;
  const sourceY = source.y + Math.sin(angle) * source.radius;
  const targetX = target.x - Math.cos(angle) * target.radius;
  const targetY = target.y - Math.sin(angle) * target.radius;

  // Create curved path
  return `M ${sourceX} ${sourceY} A ${dr} ${dr} 0 0 1 ${targetX} ${targetY}`;
}; 