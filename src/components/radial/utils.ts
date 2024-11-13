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

// Helper function for cotangent
const cot = (x: number): number => {
  return Math.cos(x) / Math.sin(x);
};

export const calculateNodePositions = (
  nodes: TreeNode[],
  width: number,
  height: number,
  centerRadius: number = Math.min(width, height) * 0.3
): PositionedNode[] => {
  const center = { x: width / 2, y: height / 2 };
  const angleStep = (2 * Math.PI) / nodes.length;
  
  const jitter = centerRadius * 0.1;

  return nodes.map((node, i) => {
    const angle = i * angleStep;
    const radius = centerRadius + (Math.random() - 0.5) * jitter;
    return {
      ...node,
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      radius: getNodeRadius(node),
    };
  });
};

export const getNodeRadius = (node: TreeNode): number => {
  switch (node.type) {
    case 'college':
      return 45;
    case 'department':
      return 40;
    case 'program':
      return 35;
    case 'course':
      return 30;
    case 'faculty':
      return 35;
    default:
      return 25;
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
  
  // Rectangle dimensions
  const sourceWidth = source.radius * 2;
  const sourceHeight = source.radius * 1.5;
  const targetWidth = target.radius * 2;
  const targetHeight = target.radius * 1.5;
  
  // Calculate angle between nodes
  const angle = Math.atan2(dy, dx);
  
  // Calculate intersection points with rectangles
  let sourceX, sourceY, targetX, targetY;
  
  // Source intersection
  if (Math.abs(Math.cos(angle)) * sourceHeight > Math.abs(Math.sin(angle)) * sourceWidth) {
    // Intersect with vertical edge
    sourceX = source.x + Math.sign(Math.cos(angle)) * sourceWidth / 2;
    sourceY = source.y + Math.tan(angle) * Math.sign(Math.cos(angle)) * sourceWidth / 2;
  } else {
    // Intersect with horizontal edge
    sourceX = source.x + cot(angle) * Math.sign(Math.sin(angle)) * sourceHeight / 2;
    sourceY = source.y + Math.sign(Math.sin(angle)) * sourceHeight / 2;
  }
  
  // Target intersection (similar but reversed)
  if (Math.abs(Math.cos(angle)) * targetHeight > Math.abs(Math.sin(angle)) * targetWidth) {
    targetX = target.x - Math.sign(Math.cos(angle)) * targetWidth / 2;
    targetY = target.y - Math.tan(angle) * Math.sign(Math.cos(angle)) * targetWidth / 2;
  } else {
    targetX = target.x - cot(angle) * Math.sign(Math.sin(angle)) * targetHeight / 2;
    targetY = target.y - Math.sign(Math.sin(angle)) * targetHeight / 2;
  }

  // Create curved path
  return `M ${sourceX} ${sourceY} A ${dr} ${dr} 0 0 1 ${targetX} ${targetY}`;
};