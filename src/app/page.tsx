// src/app/page.tsx
"use client";

import { useState } from "react";
import HierarchicalView from "@/components/hierarchical/HierarchicalView";
import { TreeNode } from "@/types/tree";

// Define the SelectedNode type to match HierarchicalView
interface SelectedNode extends TreeNode {
  panel: 'left' | 'right';
}

export default function Home() {
  // Update the state type to match what HierarchicalView expects
  const [selectedNodes, setSelectedNodes] = useState<Record<string, SelectedNode>>({});

  return (
    <main className="flex min-h-screen flex-col">
      <HierarchicalView onSelectionChange={setSelectedNodes} />
    </main>
  );
}
