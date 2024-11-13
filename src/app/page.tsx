// src/app/page.tsx
"use client";

import { useState } from "react";
import HierarchicalView from "@/components/hierarchical/HierarchicalView";
import { TreeNode } from "@/types/tree";

export default function Home() {
  const [_selectedNodes, setSelectedNodes] = useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col">
      <HierarchicalView onSelectionChange={setSelectedNodes} />
    </main>
  );
}
