// src/app/page.tsx
"use client";

import { useState } from "react";
import HierarchicalView from "@/components/hierarchical/HierarchicalView";
import { TreeNode } from "@/types/tree";

export default function Home() {
  const [selectedNodes, setSelectedNodes] = useState<Record<string, TreeNode & { panel: 'left' | 'right' }>>({});

  return (
    <main className="flex min-h-screen flex-col">
      <HierarchicalView onSelectionChange={setSelectedNodes} />
    </main>
  );
}
