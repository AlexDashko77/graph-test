import { useRef, useEffect, useCallback } from "react";
import cytoscape, { Core } from "cytoscape";
import {
  graphStyles,
  createLayout,
  calculateAutoZoom,
} from "@/lib/graphStyles";
import type { GraphData } from "@/types";
import type { EnrichedNode } from "@/types/graphTypes";

interface UseGraphInstanceProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  graphData: GraphData;
}

export function useGraphInstance({
  containerRef,
  graphData,
}: UseGraphInstanceProps) {
  const cyRef = useRef<Core | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) {
      console.warn("Container ref is not ready");
      return;
    }

    const container = containerRef.current;
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      console.warn("Container has zero size");
      return;
    }

    if (!document.contains(containerRef.current)) {
      console.warn("Container is not in DOM");
      return;
    }

    mountedRef.current = true;

    if (cyRef.current) {
      try {
        cyRef.current.destroy();
      } catch (error) {
        console.error("Error destroying previous Cytoscape instance:", error);
      }
      cyRef.current = null;
    }

    try {
      const enrichedNodes = enrichNodesWithDuplicateInfo(
        graphData.elements.nodes as EnrichedNode[],
      );

      const nodeCount = enrichedNodes.length;
      const layout = createLayout(nodeCount);

      const instance = cytoscape({
        container: containerRef.current,
        elements: [...enrichedNodes, ...graphData.elements.edges],
        style: graphStyles,
        layout,
        minZoom: 0.4,
        maxZoom: 2.5,
        autoungrabify: false,
        autounselectify: false,
        boxSelectionEnabled: false,
      });

      instance.ready(() => {
        if (!mountedRef.current) return;

        const zoomMultiplier = calculateAutoZoom(nodeCount);
        instance.zoom(instance.zoom() * zoomMultiplier);
        instance.center();
      });

      cyRef.current = instance;
    } catch (error) {
      console.error("Error creating Cytoscape instance:", error);
      cyRef.current = null;
    }

    return () => {
      mountedRef.current = false;

      if (cyRef.current) {
        try {
          cyRef.current.destroy();
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
        cyRef.current = null;
      }
    };
  }, [containerRef, graphData]);

  const getCy = useCallback(() => cyRef.current, []);

  return getCy;
}

function enrichNodesWithDuplicateInfo(nodes: EnrichedNode[]): EnrichedNode[] {
  const labelCounts = new Map<string, number>();
  const labelIndexes = new Map<string, number>();

  nodes.forEach((node) => {
    const key = `${node.data.package}::${node.data.label}`;
    labelCounts.set(key, (labelCounts.get(key) || 0) + 1);
  });

  return nodes.map((node) => {
    const key = `${node.data.package}::${node.data.label}`;
    const count = labelCounts.get(key) || 1;

    if (count > 1) {
      const currentIndex = labelIndexes.get(key) || 0;
      labelIndexes.set(key, currentIndex + 1);

      return {
        ...node,
        data: {
          ...node.data,
          hasDuplicates: true,
          duplicateIndex: currentIndex + 1,
          duplicateCount: count,
        },
      };
    }

    return node;
  });
}
