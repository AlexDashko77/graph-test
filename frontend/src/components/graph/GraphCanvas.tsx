import { useRef, memo } from "react";
import type { GraphData, FunctionNode } from "@/types";
import GraphTooltip from "./GraphTooltip";
import GraphToolbar from "./GraphToolbar";
import { useGraphInstance } from "@/hooks/useGraphInstance";
import { useGraphTooltip } from "@/hooks/useGraphTooltip";
import { useGraphEvents } from "@/hooks/useGraphEvents";

interface GraphCanvasProps {
  graphData: GraphData;
  currentFunctionId: string;
  onNodeClick: (func: FunctionNode) => void;
}

function GraphCanvas({
  graphData,
  currentFunctionId,
  onNodeClick,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getCy = useGraphInstance({ containerRef, graphData });

  const { tooltip, showTooltip, hideTooltip } = useGraphTooltip();

  useGraphEvents({
    getCy,
    currentFunctionId,
    onNodeClick,
    showTooltip,
    hideTooltip,
  });

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-full bg-linear-to-br from-slate-50 via-purple-50/20 to-slate-50"
      />

      <GraphTooltip {...tooltip} />
      <GraphToolbar getCy={getCy} nodeCount={graphData.elements.nodes.length} />
    </>
  );
}

export default memo(GraphCanvas);
