import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { TreeNode } from "@/types/tree";

interface SearchBarProps {
  data: TreeNode[];
  onSelect: (node: TreeNode) => void;
}

interface FuseResult {
  item: TreeNode;
  refIndex: number;
  score: number;
}

// Recursively flatten tree for searching
const flattenNodes = (nodes: TreeNode[]): TreeNode[] => {
  return nodes.reduce((acc: TreeNode[], node) => {
    acc.push(node);
    if (node.children && node.children.length > 0) {
      acc.push(...flattenNodes(node.children));
    }
    return acc;
  }, []);
};

export const SearchBar: React.FC<SearchBarProps> = ({ data, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TreeNode[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse instance
  const fuse = new Fuse(flattenNodes(data), {
    keys: ["name", "description", "code"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  useEffect(() => {
    // Handle clicks outside of search component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const searchResults = fuse
        .search(value)
        // @ts-expect-error - FuseResult type mismatch
        .map((result: FuseResult) => result.item);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (node: TreeNode) => {
    onSelect(node);
    setQuery("");
    setIsOpen(false);
  };

  // Add some logging to debug the flattened nodes
  useEffect(() => {
    const flattened = flattenNodes(data);
    console.log("Flattened nodes:", flattened);
  }, [data]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search nodes..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border max-h-60 overflow-auto">
          {results.map((node) => (
            <button
              key={node.id}
              onClick={() => handleSelect(node)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{node.name}</span>
                <span className="text-xs text-gray-500">{node.type}</span>
              </div>
              {node.description && (
                <p className="text-sm text-gray-600 truncate">
                  {node.description}
                </p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border p-4">
          <p className="text-gray-500 text-center">No results found</p>
        </div>
      )}
    </div>
  );
};
