import React from 'react';
import { Relationship } from '@/lib/mock-data';

interface RelationshipTooltipProps {
  relationship: Relationship;
  position: { x: number; y: number };
}

export const RelationshipTooltip: React.FC<RelationshipTooltipProps> = ({
  relationship,
  position,
}) => {
  return (
    <div
      className="absolute bg-white p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs"
      style={{
        left: position.x + 10,
        top: position.y + 10,
        zIndex: 50,
      }}
    >
      <div className="space-y-2">
        <div className="font-medium text-gray-900">
          {relationship.type.replace(/_/g, ' ')}
        </div>
        
        {relationship.metadata?.description && (
          <p className="text-sm text-gray-600">
            {relationship.metadata.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 text-xs">
          {relationship.metadata?.year && (
            <span className="bg-gray-100 px-2 py-1 rounded">
              Year: {relationship.metadata.year}
            </span>
          )}
          {relationship.metadata?.strength && (
            <span className="bg-gray-100 px-2 py-1 rounded">
              Strength: {(relationship.metadata.strength * 100).toFixed(0)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; 