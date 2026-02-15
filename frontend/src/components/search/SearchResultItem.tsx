import { memo } from "react";
import { formatPackageName, formatFilePath } from "@/lib/utils";
import type { FunctionNode } from "@/types";

interface SearchResultItemProps {
  func: FunctionNode;
  onSelect: (func: FunctionNode) => void;
}

function SearchResultItem({ func, onSelect }: SearchResultItemProps) {
  return (
    <button
      onClick={() => onSelect(func)}
      className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition-colors group"
    >
      <div className="font-mono text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
        {func.name}
      </div>
      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
        <span>{formatPackageName(func.package)}</span>
        {func.file && (
          <>
            <span className="text-gray-300">·</span>
            <span>
              {formatFilePath(func.file)}:{func.line}
            </span>
          </>
        )}
      </div>
    </button>
  );
}

export default memo(SearchResultItem);
