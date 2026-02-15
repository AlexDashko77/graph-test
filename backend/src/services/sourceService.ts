import { getDatabase } from "../db/database";
import type { SourceFile } from "../types";

export function getSourceByPath(filePath: string): SourceFile | null {
  const db = getDatabase();

  const query = `SELECT file, content, package FROM sources WHERE file = ?`;
  return db.prepare(query).get(filePath) as SourceFile | null;
}
