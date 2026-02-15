import type { NodeSingular } from "cytoscape";
import type {
  GraphColors,
  GraphStylesheet,
  LayoutConfig,
} from "../types/graphTypes";

export const GRAPH_COLORS: GraphColors = {
  center: {
    main: "#8b5cf6",
    dark: "#6d28d9",
    light: "#a78bfa",
  },
  caller: {
    main: "#14b8a6",
    dark: "#0f766e",
    light: "#2dd4bf",
  },
  callee: {
    main: "#06b6d4",
    dark: "#0e7490",
    light: "#22d3ee",
  },
};

const GENERIC_FUNCTION_NAMES = [
  "String",
  "New",
  "Read",
  "Write",
  "Close",
  "Open",
  "Get",
  "Set",
  "Init",
  "Error",
];

function getNodeColor(type: string): string {
  switch (type) {
    case "center":
      return GRAPH_COLORS.center.main;
    case "caller":
      return GRAPH_COLORS.caller.main;
    case "callee":
      return GRAPH_COLORS.callee.main;
    default:
      return "#64748b";
  }
}

function getNodeOutlineColor(type: string): string {
  switch (type) {
    case "center":
      return GRAPH_COLORS.center.dark;
    case "caller":
      return GRAPH_COLORS.caller.dark;
    case "callee":
      return GRAPH_COLORS.callee.dark;
    default:
      return "#1e293b";
  }
}

function createNodeLabel(ele: NodeSingular): string {
  const fullName = ele.data("label") as string;
  const packageName = ele.data("package") as string;
  const hasDuplicates = ele.data("hasDuplicates") as boolean;
  const duplicateIndex = ele.data("duplicateIndex") as number;

  let shortName = fullName;
  if (fullName.includes("::")) {
    const parts = fullName.split("::");
    shortName = parts[parts.length - 1];
  }

  let shortPackage = packageName;
  if (packageName.includes("/")) {
    const parts = packageName.split("/");
    shortPackage = parts[parts.length - 1];
  }

  if (hasDuplicates) {
    return `${shortPackage}.\n${shortName} #${duplicateIndex}`;
  }

  if (GENERIC_FUNCTION_NAMES.includes(shortName)) {
    return `${shortPackage}.\n${shortName}`;
  }

  if (shortName.length > 15) {
    return shortName.substring(0, 12) + "...";
  }

  return shortName;
}

export const graphStyles: GraphStylesheet = [
  {
    selector: "node",
    css: {
      "background-color": (ele: NodeSingular) => getNodeColor(ele.data("type")),
      label: createNodeLabel,
      color: "#ffffff",
      "text-valign": "center",
      "text-halign": "center",
      "font-family": '"Inter", -apple-system, sans-serif',
      "font-size": "11px",
      "font-weight": 600,
      "text-outline-width": 2.5,
      "text-outline-color": (ele: NodeSingular) =>
        getNodeOutlineColor(ele.data("type")),
      "text-wrap": "wrap",
      "text-max-width": "95px",
      "line-height": 1.3,
      width: (ele: NodeSingular) => (ele.data("type") === "center" ? 110 : 85),
      height: (ele: NodeSingular) => (ele.data("type") === "center" ? 110 : 85),
      "border-width": 2,
      "border-color": (ele: NodeSingular) =>
        ele.data("type") === "center" ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
      "border-opacity": 0.8,
      "transition-property": "border-width, border-color",
      "transition-duration": 0.15,
    },
  },

  {
    selector: "edge",
    css: {
      width: 2,
      "line-color": "#cbd5e1",
      "target-arrow-color": "#cbd5e1",
      "target-arrow-shape": "triangle",
      "arrow-scale": 1.2,
      "curve-style": "bezier",
      opacity: 0.5,
      "transition-property": "width, line-color, opacity",
      "transition-duration": 0.15,
    },
  },

  {
    selector: "edge.highlighted",
    css: {
      width: 3.5,
      "line-color": "#8b5cf6",
      "target-arrow-color": "#8b5cf6",
      opacity: 1,
      "z-index": 998,
    },
  },

  {
    selector: "node.hovered",
    css: {
      "border-width": 3,
      "border-color": "#ffffff",
      "border-opacity": 1,
      "z-index": 999,
    },
  },
];

export function createLayout(nodeCount: number): LayoutConfig {
  const basePadding =
    nodeCount > 80 ? 20 : nodeCount > 50 ? 25 : nodeCount > 30 ? 35 : 40;
  const baseEdgeLength =
    nodeCount > 80 ? 70 : nodeCount > 50 ? 85 : nodeCount > 30 ? 95 : 100;

  return {
    name: "cose",
    animate: true,
    animationDuration: 500,
    animationEasing: "ease-out",
    nodeRepulsion: () => 15000,
    nodeOverlap: 30,
    idealEdgeLength: baseEdgeLength,
    edgeElasticity: 100,
    gravity: 0.5,
    numIter: 1500,
    initialTemp: 100,
    coolingFactor: 0.95,
    minTemp: 1,
    nestingFactor: 1.2,
    padding: basePadding,
    componentSpacing: 60,
    randomize: false,
    fit: true,
    refresh: 20,
    tile: true,
    tilingPaddingVertical: 8,
    tilingPaddingHorizontal: 8,
  };
}

export function calculateAutoZoom(nodeCount: number): number {
  if (nodeCount > 80) return 2.5;
  if (nodeCount > 50) return 2.0;
  if (nodeCount > 30) return 1.6;
  if (nodeCount > 15) return 1.3;
  return 1.0;
}
