import { memo } from "react";
import type { FunctionNode } from "@/types";
import SearchBar from "./search/SearchBar";

interface HeaderProps {
  onSelectFunction: (func: FunctionNode) => void;
}

function Header({ onSelectFunction }: HeaderProps) {
  return (
    <header className="bg-linear-to-r z-50 from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-5 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <span className="text-4xl">🔍</span>
              <span>CPG Viewer</span>
            </h1>
            <p className="text-sm text-blue-100 mt-1.5 font-medium">
              Interactive Code Property Graph Explorer
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold text-blue-100">
              Full-Stack Assignment
            </div>
            <div className="font-mono text-xs text-blue-200 mt-1">
              Next.js · Express · SQLite · Cytoscape
            </div>
          </div>
        </div>

        <SearchBar onSelect={onSelectFunction} />
      </div>
    </header>
  );
}

export default memo(Header);
