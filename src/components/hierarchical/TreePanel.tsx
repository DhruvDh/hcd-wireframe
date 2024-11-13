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
      // Simply pass the node selection up to the parent
      onNodeSelect(selectedNode, panel);
    }
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