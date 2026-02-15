export interface FunctionNode {
  id: string;
  name: string;
  package: string;
  file: string | null;
  line: number | null;
  type_info?: string | null;
}

export interface GraphNodeData {
  id: string;
  label: string;
  package: string;
  file: string | null;
  line: number | null;
  type: "center" | "caller" | "callee";
  hasDuplicates?: boolean;
  duplicateIndex?: number;
  duplicateCount?: number;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
}

export interface GraphElement<T> {
  data: T;
}

export interface GraphData {
  elements: {
    nodes: GraphElement<GraphNodeData>[];
    edges: GraphElement<GraphEdgeData>[];
  };
}

export interface Stats {
  total_packages: string;
  total_files: string;
  total_nodes: string;
  total_edges: string;
  total_functions: string;
}

export interface SearchFunctionsResponse {
  count: number;
  functions: FunctionNode[];
}

export interface GraphResponse {
  elements: GraphData["elements"];
}

export interface SourceCodeResponse {
  file_path: string;
  content: string;
  language: string;
}

export interface UseAsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface NavigationState {
  history: FunctionNode[];
  currentIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
  push: (func: FunctionNode) => void;
  goBack: () => FunctionNode | null;
  goForward: () => FunctionNode | null;
}

export interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
