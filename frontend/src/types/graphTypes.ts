import { StylesheetCSS } from "cytoscape";
import type { NodeSingular } from "cytoscape";

export interface GraphNodeData {
  id: string;
  label: string;
  package: string;
  file: string | null;
  line: number | null;
  type: "center" | "caller" | "callee";
  displayLabel?: string;
  hasDuplicates?: boolean;
  duplicateIndex?: number;
  duplicateCount?: number;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
}

export interface EnrichedNode {
  data: GraphNodeData;
}

export interface EnrichedEdge {
  data: GraphEdgeData;
}

export interface ColorScheme {
  main: string;
  dark: string;
  light: string;
}

export interface GraphColors {
  center: ColorScheme;
  caller: ColorScheme;
  callee: ColorScheme;
}

export interface LayoutConfig {
  name: "cose";
  animate: boolean;
  animationDuration: number;
  animationEasing: string;
  nodeRepulsion: (node: NodeSingular) => number;
  nodeOverlap: number;
  idealEdgeLength: number;
  edgeElasticity: number;
  gravity: number;
  numIter: number;
  initialTemp: number;
  coolingFactor: number;
  minTemp: number;
  nestingFactor: number;
  padding: number;
  componentSpacing: number;
  randomize: boolean;
  fit: boolean;
  refresh: number;
  tile: boolean;
  tilingPaddingVertical: number;
  tilingPaddingHorizontal: number;
}

export type GraphStylesheet = StylesheetCSS[];
