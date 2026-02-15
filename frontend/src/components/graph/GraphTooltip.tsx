import { memo } from "react";

interface GraphTooltipProps {
  show: boolean;
  x: number;
  y: number;
  name: string;
  package: string;
  file: string | null;
  id: string;
}

function GraphTooltip({
  show,
  x,
  y,
  name,
  package: pkg,
  file,
  id,
}: GraphTooltipProps) {
  if (!show) return null;

  return (
    <div
      className="absolute z-1000 bg-gray-900/95 text-white px-4 py-3 rounded-lg shadow-2xl border border-gray-700 pointer-events-none max-w-md"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="font-mono text-sm font-bold mb-2 break-all text-blue-300">
        {name}
      </div>
      <div className="text-xs text-gray-300 mb-1 break-all">{pkg}</div>
      {file && (
        <div className="text-xs text-gray-400 font-mono break-all mb-2">
          {file}
        </div>
      )}
      <div className="text-xs text-gray-500 font-mono break-all pt-2 border-t border-gray-700">
        {id}
      </div>
    </div>
  );
}

export default memo(GraphTooltip);
