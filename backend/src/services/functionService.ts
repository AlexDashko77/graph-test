import { getDatabase } from "../db/database";
import type { FunctionNode, FunctionDetail } from "../types";

export function searchFunctions(search?: string, limit = 100): FunctionNode[] {
  const db = getDatabase();

  let query = `
    SELECT id, name, package, file, line, type_info
    FROM nodes
    WHERE kind = 'function'
  `;

  const params: (string | number)[] = [];

  if (search) {
    query += ` AND name LIKE ?`;
    params.push(`${search}`);
  }

  query += ` ORDER BY name LIMIT ?`;
  params.push(limit);

  return db.prepare(query).all(...params) as FunctionNode[];
}

export function getFunctionDetails(functionId: string): FunctionDetail | null {
  const db = getDatabase();

  const query = `
    SELECT 
      n.id, n.name, n.package, n.file, n.line, n.type_info,
      m.cyclomatic_complexity, m.fan_in, m.fan_out, m.loc
    FROM nodes n
    LEFT JOIN metrics m ON m.function_id = n.id
    WHERE n.id = ? AND n.kind = 'function'
  `;

  return db.prepare(query).get(functionId) as FunctionDetail | null;
}
