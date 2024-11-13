import React from 'react';
import { RelationshipType } from '@/lib/mock-data';
import { getRelationshipStyle } from './utils';

interface LegendProps {
  activeTypes: RelationshipType[];
  onToggleType: (type: RelationshipType) => void;
}

export const Legend: React.FC<LegendProps> = ({ activeTypes, onToggleType }) => {
  const relationshipTypes = Object.values(RelationshipType);

  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-sm font-semibold mb-2">Relationship Types</h3>
      <div className="space-y-2">
        {relationshipTypes.map(type => {
          const style = getRelationshipStyle(type);
          const isActive = activeTypes.includes(type);

          return (
            <button
              key={type}
              onClick={() => onToggleType(type)}
              className={`flex items-center space-x-2 w-full px-2 py-1 rounded
                ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <svg width="20" height="2" className="flex-shrink-0">
                <line
                  x1="0"
                  y1="1"
                  x2="20"
                  y2="1"
                  stroke={style.color}
                  strokeWidth={style.strokeWidth}
                  strokeDasharray={style.strokeDasharray}
                />
              </svg>
              <span className="text-sm text-gray-700">
                {type.replace(/_/g, ' ')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}; 