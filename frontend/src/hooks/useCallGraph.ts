import { useState, useEffect } from "react";
import { getCallGraph } from "@/lib/api";
import type { GraphData, UseAsyncResult } from "@/types";

export function useCallGraph(
  functionId: string | null,
): UseAsyncResult<GraphData> {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!functionId) {
      setGraphData(null);
      return;
    }

    let cancelled = false;

    async function fetchGraph() {
      setLoading(true);
      setError(null);

      try {
        const data = await getCallGraph(functionId || "");
        if (!cancelled) {
          setGraphData(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load graph");
          setGraphData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGraph();
    return () => {
      cancelled = true;
    };
  }, [functionId]);

  return { data: graphData, loading, error };
}
