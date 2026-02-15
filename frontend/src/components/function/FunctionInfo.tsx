import { memo } from "react";
import { formatPackageName, formatFilePath } from "@/lib/utils";
import type { FunctionNode } from "@/types";
import { isValidFilePath } from "@/lib/validator";

interface FunctionInfoProps {
  func: FunctionNode;
  onShowCode: () => void;
}

function FunctionInfo({ func, onShowCode }: FunctionInfoProps) {
  const hasSourceCode = isValidFilePath(func.file);

  return (
    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-xl p-5 shadow-xl max-w-md animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Selected Function
        </div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      </div>

      <div className="font-mono text-lg font-bold text-blue-600 mb-3 break-all">
        {func.name}
      </div>

      <div className="space-y-2 text-sm mb-4">
        <InfoRow icon="📦" label="Package">
          {formatPackageName(func.package)}
        </InfoRow>

        {hasSourceCode && (
          <InfoRow icon="📄" label="File">
            <span className="font-mono text-xs">
              {formatFilePath(func.file)}:{func.line}
            </span>
          </InfoRow>
        )}
      </div>

      {hasSourceCode ? (
        <button
          onClick={onShowCode}
          className="w-full px-4 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>📝</span>
          <span>View Source Code</span>
        </button>
      ) : (
        <div className="text-xs text-gray-400 italic p-3 bg-gray-50 rounded-lg border border-gray-200">
          Source code not available (external package)
        </div>
      )}
    </div>
  );
}

interface InfoRowProps {
  icon: string;
  label: string;
  children: React.ReactNode;
}

const InfoRow = memo(({ icon, label, children }: InfoRowProps) => (
  <div className="flex items-start gap-2 text-gray-700">
    <span className="text-lg shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <span className="text-gray-500 text-xs">{label}: </span>
      <span className="break-all">{children}</span>
    </div>
  </div>
));

InfoRow.displayName = "InfoRow";

export default memo(FunctionInfo);
