"use client";

import type { FunctionNode } from "@/types";
import GraphCanvas from "./GraphCanvas";
import GraphLegend from "./GraphLegend";
import GraphError from "./GraphError";
import Loading from "../Loading";
import { useCallGraph } from "@/hooks/useCallGraph";

interface CallGraphProps {
  functionNode: FunctionNode;
  onNodeClick: (func: FunctionNode) => void;
}

export default function CallGraph({
  functionNode,
  onNodeClick,
}: CallGraphProps) {
  const { data, loading, error } = useCallGraph(functionNode.id);

  if (loading) {
    return <Loading message="Loading call graph..." />;
  }

  if (error) {
    return <GraphError error={error} />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No graph data available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GraphCanvas
        graphData={data}
        currentFunctionId={functionNode.id}
        onNodeClick={onNodeClick}
      />
      <GraphLegend
        nodeCount={data.elements.nodes.length}
        edgeCount={data.elements.edges.length}
      />
    </div>
  );
}
