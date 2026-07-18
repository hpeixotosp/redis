import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy singleton — conexão criada somente na primeira chamada,
// nunca no momento do import (evita erro no build sem DATABASE_URL)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;

export function getDb() {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!);
    _db = drizzle(sql, { schema });
  }
  return _db as ReturnType<typeof drizzle<typeof schema>>;
}
