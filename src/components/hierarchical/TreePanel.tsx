import React from 'react';
import { TreeItem } from './TreeItem';
import { TreeNode } from '@/types/tree';

interface SelectedNode extends TreeNode {
  panel: 'left' | 'right';
}

interface TreePanelProps {
  data: TreeNode[];
  panel: 'left' | 'right';
  selectedNodes: Record<string, SelectedNode>;
  onNodeSelect: (node: TreeNode, panel: 'left' | 'right') => void;
}

export const TreePanel: React.FC<TreePanelProps> = ({
  data,
  panel,
  selectedNodes,
  onNodeSelect,
}) => {
  const handleNodeSelect = (nodeId: string) => {
    // Find the node in the data tree
    const findNode = (nodes: TreeNode[]): TreeNode | undefined => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          // If selecting a parent, select all children
          if (node.children) {
            const allChildren = getAllChildren(node);
            allChildren.forEach(child => {
              onNodeSelect(child, panel);
            });
          }
          return node;
        }
        if (node.children) {
          const found = findNode(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    const selectedNode = findNode(data);
    if (selectedNode) {
      console.log('Selecting node:', selectedNode);
      onNodeSelect(selectedNode, panel);
    }
  };

  // Helper function to get all children of a node
  const getAllChildren = (node: TreeNode): TreeNode[] => {
    const children: TreeNode[] = [];
    if (node.children) {
      node.children.forEach(child => {
        children.push(child);
        if (child.children) {
          children.push(...getAllChildren(child));
        }
      });
    }
    return children;
  };

  return (
    <div className="space-y-1 p-2 bg-white">
      {data.map((node, index) => (
        <TreeItem
          key={`${panel}-${node.id}-${index}`}
          node={node}
          isSelected={!!selectedNodes[`${panel}-${node.id}`]}
          onSelect={handleNodeSelect}
          selectedNodes={selectedNodes}
          panel={panel}
        />
      ))}
    </div>
  );
}; 