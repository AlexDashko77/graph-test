import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(__dirname, "..", "..", "..", "data", "cpg.db");
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH, {
      readonly: true,
      fileMustExist: true,
    });

    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = NORMAL");
  }

  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
