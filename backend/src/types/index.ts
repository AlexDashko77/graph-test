export interface FunctionNode {
  id: string;
  name: string;
  package: string;
  file: string | null;
  line: number | null;
  type_info: string | null;
}

export interface FunctionDetail extends FunctionNode {
  cyclomatic_complexity: number | null;
  fan_in: number | null;
  fan_out: number | null;
  loc: number | null;
}

export interface GraphNode {
  id: string;
  name: string;
  package: string;
  file: string | null;
  line: number | null;
  direction: "caller" | "callee";
}

export interface SourceFile {
  file: string;
  content: string;
  package: string;
}
