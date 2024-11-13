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
