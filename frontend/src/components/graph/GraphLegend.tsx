import { memo } from "react";

interface GraphLegendProps {
  nodeCount?: number;
  edgeCount?: number;
}

function GraphLegend({ nodeCount = 0, edgeCount = 0 }: GraphLegendProps) {
  return (
    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-xl text-sm max-w-70">
      <div className="font-semibold mb-3 text-gray-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Graph Legend</span>
        </div>
        {nodeCount > 0 && (
          <div className="text-xs text-gray-500 font-mono">
            {nodeCount}n · {edgeCount}e
          </div>
        )}
      </div>

      <div className="space-y-2.5 mb-4">
        <LegendItem color="bg-violet-500" label="Current Function" />
        <LegendItem color="bg-teal-500" label="Callers (incoming)" />
        <LegendItem color="bg-cyan-500" label="Callees (outgoing)" />
      </div>

      <div className="pt-3 border-t border-gray-200 space-y-1.5 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span>🖱️</span>
          <span>Click node to navigate</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <span>Auto Zoom for best view</span>
        </div>
      </div>
    </div>
  );
}

const LegendItem = memo(
  ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-md ${color} shadow-sm shrink-0`} />
      <span className="text-gray-700 text-sm">{label}</span>
    </div>
  ),
);

LegendItem.displayName = "LegendItem";

export default memo(GraphLegend);
