export function isValidSearchQuery(query: string, minLength = 2): boolean {
  return typeof query === "string" && query.trim().length >= minLength;
}

export function isValidFunctionId(id: string): boolean {
  return typeof id === "string" && id.trim().length > 0;
}

export function isValidFilePath(path: string | null): boolean {
  if (!path) return false;
  return typeof path === "string" && path.trim().length > 0;
}

export function isValidLineNumber(line: number | null): boolean {
  if (line === null) return false;
  return typeof line === "number" && line > 0;
}
