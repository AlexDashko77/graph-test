import { useEffect } from "react";
import type { Core, NodeSingular, EventObject } from "cytoscape";
import type { FunctionNode } from "@/types";
import type { GraphNodeData } from "@/types/graphTypes";

interface UseGraphEventsProps {
  getCy: () => Core | null; // ✅ Геттер вместо прямого cy
  currentFunctionId: string;
  onNodeClick: (func: FunctionNode) => void;
  showTooltip: (node: NodeSingular) => void;
  hideTooltip: () => void;
}

export function useGraphEvents({
  getCy,
  currentFunctionId,
  onNodeClick,
  showTooltip,
  hideTooltip,
}: UseGraphEventsProps) {
  useEffect(() => {
    const cy = getCy();
    if (!cy) return;

    const handleTap = (evt: EventObject) => {
      const node = evt.target as NodeSingular;
      const nodeData = node.data() as GraphNodeData;

      if (nodeData.id === currentFunctionId) return;

      node
        .animate({ style: { "border-width": 8 }, duration: 150 })
        .animate({ style: { "border-width": 2 }, duration: 150 });

      hideTooltip();

      onNodeClick({
        id: nodeData.id,
        name: nodeData.label,
        package: nodeData.package || "",
        file: nodeData.file || "",
        line: nodeData.line || 0,
      });
    };

    const handleMouseOver = (evt: EventObject) => {
      const node = evt.target as NodeSingular;
      node.addClass("hovered");
      node.connectedEdges().addClass("highlighted");
      showTooltip(node);
    };

    const handleMouseOut = (evt: EventObject) => {
      const node = evt.target as NodeSingular;
      node.removeClass("hovered");
      node.connectedEdges().removeClass("highlighted");
      hideTooltip();
    };

    const handleZoomPan = () => {
      hideTooltip();
    };

    const handleEdgeMouseOver = (evt: EventObject) => {
      const edge = evt.target;
      edge.style({
        width: 4,
        "line-color": "#64748b",
        "target-arrow-color": "#64748b",
        opacity: 0.9,
      });
    };

    const handleEdgeMouseOut = (evt: EventObject) => {
      const edge = evt.target;
      if (!edge.hasClass("highlighted")) {
        edge.style({
          width: 2,
          "line-color": "#cbd5e1",
          "target-arrow-color": "#cbd5e1",
          opacity: 0.5,
        });
      }
    };

    cy.on("tap", "node", handleTap);
    cy.on("mouseover", "node", handleMouseOver);
    cy.on("mouseout", "node", handleMouseOut);
    cy.on("mouseover", "edge", handleEdgeMouseOver);
    cy.on("mouseout", "edge", handleEdgeMouseOut);
    cy.on("zoom pan", handleZoomPan);

    return () => {
      cy.off("tap", "node", handleTap);
      cy.off("mouseover", "node", handleMouseOver);
      cy.off("mouseout", "node", handleMouseOut);
      cy.off("mouseover", "edge", handleEdgeMouseOver);
      cy.off("mouseout", "edge", handleEdgeMouseOut);
      cy.off("zoom pan", handleZoomPan);
    };
  }, [getCy, currentFunctionId, onNodeClick, showTooltip, hideTooltip]);
}
