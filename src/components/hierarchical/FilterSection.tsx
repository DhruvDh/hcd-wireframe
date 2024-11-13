import React, { useCallback } from 'react';
import { NodeType } from '@/types/tree';

interface FilterSectionProps {
  onFilterChange: (filters: NodeType[]) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const filterOptions = [
    { type: NodeType.COLLEGE, label: 'Colleges' },
    { type: NodeType.DEPARTMENT, label: 'Departments' },
    { type: NodeType.PROGRAM, label: 'Programs' },
    { type: NodeType.COURSE, label: 'Courses' },
  ];

  const handleFilterToggle = useCallback((type: NodeType, checked: boolean) => {
    onFilterChange(checked ? [type] : []);
  }, [onFilterChange]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Filters</h3>
      <div className="space-y-2">
        {filterOptions.map(({ type, label }) => (
          <label
            key={type}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="nodeTypeFilter"
              onChange={(e) => handleFilterToggle(type, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="nodeTypeFilter"
            onChange={() => onFilterChange([])}
            defaultChecked
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Show All</span>
        </label>
      </div>
    </div>
  );
}; 