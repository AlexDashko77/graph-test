import { getDatabase } from "../db/database";
import type { GraphNode } from "../types";

export function getNeighborhood(functionId: string): GraphNode[] {
  const db = getDatabase();

  const queryRow = db
    .prepare(
      `
    SELECT sql FROM queries WHERE name = 'function_neighborhood'
  `,
    )
    .get() as { sql: string } | undefined;

  if (!queryRow) {
    throw new Error('Query template "function_neighborhood" not found');
  }

  return db
    .prepare(queryRow.sql)
    .all({ function_id: functionId }) as GraphNode[];
}

export function buildGraphData(
  centerFunc: {
    id: string;
    name: string;
    package: string;
    file: string | null;
    line: number | null;
  },
  neighbors: GraphNode[],
  functionId: string,
) {
  const nodesMap = new Map();
  const edges: Array<{ data: { id: string; source: string; target: string } }> =
    [];
  const edgesSet = new Set<string>(); // Для предотвращения дублей рёбер

  nodesMap.set(functionId, {
    data: {
      id: centerFunc.id,
      label: centerFunc.name,
      package: centerFunc.package,
      file: centerFunc.file,
      line: centerFunc.line,
      type: "center",
    },
  });

  const neighborsMap = new Map<
    string,
    { caller: boolean; callee: boolean; node: GraphNode }
  >();

  neighbors.forEach((neighbor) => {
    if (!neighborsMap.has(neighbor.id)) {
      neighborsMap.set(neighbor.id, {
        caller: false,
        callee: false,
        node: neighbor,
      });
    }

    const entry = neighborsMap.get(neighbor.id)!;
    if (neighbor.direction === "caller") {
      entry.caller = true;
    } else if (neighbor.direction === "callee") {
      entry.callee = true;
    }
  });

  neighborsMap.forEach((entry, nodeId) => {
    const { node, caller, callee } = entry;

    let nodeType: "caller" | "callee" = "caller";
    if (caller && !callee) {
      nodeType = "caller";
    } else if (callee && !caller) {
      nodeType = "callee";
    } else if (caller && callee) {
      nodeType = "caller";
    }

    nodesMap.set(nodeId, {
      data: {
        id: node.id,
        label: node.name,
        package: node.package,
        file: node.file,
        line: node.line,
        type: nodeType,
      },
    });

    if (caller) {
      const edgeId = `e_${nodeId}_${functionId}`;
      if (!edgesSet.has(edgeId)) {
        edges.push({
          data: {
            id: edgeId,
            source: nodeId,
            target: functionId,
          },
        });
        edgesSet.add(edgeId);
      }
    }

    if (callee) {
      const edgeId = `e_${functionId}_${nodeId}`;
      if (!edgesSet.has(edgeId)) {
        edges.push({
          data: {
            id: edgeId,
            source: functionId,
            target: nodeId,
          },
        });
        edgesSet.add(edgeId);
      }
    }
  });

  return {
    nodes: Array.from(nodesMap.values()),
    edges,
  };
}
