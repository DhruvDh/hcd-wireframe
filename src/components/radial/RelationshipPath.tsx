import React from "react";
import { Relationship, RelationshipType } from "@/lib/mock-data";
import {
  PositionedNode,
  getRelationshipStyle,
  calculateCurvedPath,
} from "./utils";

interface RelationshipPathProps {
  source: PositionedNode;
  target: PositionedNode;
  relationship: Relationship;
  isHighlighted: boolean;
  onHover: (id: string | null) => void;
  onClick: (relationship: Relationship) => void;
}

export const RelationshipPath: React.FC<RelationshipPathProps> = ({
  source,
  target,
  relationship,
  isHighlighted,
  onHover,
  onClick,
}) => {
  const style = getRelationshipStyle(relationship.type);
  const path = calculateCurvedPath(source, target);
  const relationshipId = `${relationship.source}-${relationship.target}-${relationship.type}`;

  const baseWidth = style.strokeWidth;
  const strengthMultiplier = relationship.metadata?.strength || 1;
  const strokeWidth = baseWidth * strengthMultiplier;

  // Calculate control points for curved path
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;
  
  // Curve intensity based on distance
  const intensity = Math.sqrt(dx * dx + dy * dy) * 0.2;
  
  // Control point offset perpendicular to line
  const cpX = midX - dy * intensity / Math.sqrt(dx * dx + dy * dy);
  const cpY = midY + dx * intensity / Math.sqrt(dx * dx + dy * dy);

  // Get path styling based on relationship type
  const getPathStyles = () => {
    switch(relationship.type) {
      case RelationshipType.TEACHES:
        return "stroke-blue-500 stroke-[3px]";
      case RelationshipType.PREREQUISITE:
        return "stroke-red-500 stroke-[2px] stroke-dashed";
      case RelationshipType.COLLABORATES:
        return "stroke-purple-400 stroke-[2px] stroke-dotted";
      case RelationshipType.RESEARCHES:
        return "stroke-green-500 stroke-[3px]";
      default:
        return "stroke-gray-300 stroke-[1px]";
    }
  };

  return (
    <g>
      {/* Main path */}
      <path
        d={path}
        fill="none"
        stroke={style.color}
        strokeWidth={strokeWidth}
        strokeDasharray={style.strokeDasharray}
        opacity={isHighlighted ? 1 : 0.6}
        onMouseEnter={() => onHover(relationshipId)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick(relationship)}
        style={{ cursor: "pointer" }}
        markerEnd={
          relationship.type === RelationshipType.PREREQUISITE
            ? `url(#arrow-${relationshipId})`
            : undefined
        }
      />

      {/* Glow effect */}
      {isHighlighted && (
        <path
          d={path}
          fill="none"
          stroke={style.color}
          strokeWidth={strokeWidth * 2}
          opacity={0.1}
          style={{
            filter: "blur(4px)"
          }}
        />
      )}

      {/* Hover area */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={strokeWidth + 10}
        style={{ cursor: "pointer" }}
        onMouseEnter={() => onHover(relationshipId)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick(relationship)}
      />
    </g>
  );
};
