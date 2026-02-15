import { useState, useCallback } from "react";
import type { NodeSingular } from "cytoscape";
import type { GraphNodeData } from "@/types/graphTypes";

export interface TooltipState {
  show: boolean;
  x: number;
  y: number;
  name: string;
  package: string;
  file: string | null;
  id: string;
}

const INITIAL_TOOLTIP: TooltipState = {
  show: false,
  x: 0,
  y: 0,
  name: "",
  package: "",
  file: null,
  id: "",
};

export function useGraphTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState>(INITIAL_TOOLTIP);

  const showTooltip = useCallback((node: NodeSingular) => {
    const nodeData = node.data() as GraphNodeData;
    const renderedPosition = node.renderedPosition();

    setTooltip({
      show: true,
      x: renderedPosition.x,
      y: renderedPosition.y - 70,
      name: nodeData.label,
      package: nodeData.package || "",
      file: nodeData.file || null,
      id: nodeData.id,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(INITIAL_TOOLTIP);
  }, []);

  return { tooltip, showTooltip, hideTooltip };
}
