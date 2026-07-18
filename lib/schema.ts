import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// ─── Servidores ────────────────────────────────────────────────────────────────
export const servidores = pgTable("servidores", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  cargo: text("cargo").notNull(),
  orgaoOrigem: text("orgao_origem").notNull(),
  orgaoDestino: text("orgao_destino").notNull(),
  regraTribunal: text("regra_tribunal").notNull(),
  concluido: boolean("concluido").default(false).notNull(),
  ordem: text("ordem").notNull(), // para ordenação visual
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Grupos de documentos (agrupamento visual) ─────────────────────────────────
export const gruposDocumento = pgTable("grupos_documento", {
  id: uuid("id").primaryKey().defaultRandom(),
  servidorId: uuid("servidor_id")
    .references(() => servidores.id, { onDelete: "cascade" })
    .notNull(),
  nome: text("nome").notNull(), // ex: "Documentos Comuns", "Específico - Entrada TRT6"
  tribunalAlvo: text("tribunal_alvo"), // para Stephani: qual tribunal este grupo atende
  ordem: text("ordem").notNull(),
});

// ─── Documentos (checklist) ────────────────────────────────────────────────────
export const documentos = pgTable("documentos", {
  id: uuid("id").primaryKey().defaultRandom(),
  grupoId: uuid("grupo_id")
    .references(() => gruposDocumento.id, { onDelete: "cascade" })
    .notNull(),
  servidorId: uuid("servidor_id")
    .references(() => servidores.id, { onDelete: "cascade" })
    .notNull(),
  nome: text("nome").notNull(),
  observacaoDoc: text("observacao_doc"), // dica/detalhe fixo do documento
  obrigatorio: boolean("obrigatorio").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Status dos documentos (entregue/pendente) ─────────────────────────────────
export const documentoStatus = pgTable("documento_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  documentoId: uuid("documento_id")
    .references(() => documentos.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  entregue: boolean("entregue").default(false).notNull(),
  dataEntrega: timestamp("data_entrega"),
  observacao: text("observacao"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Log de andamento manual ───────────────────────────────────────────────────
export const andamentoLog = pgTable("andamento_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  servidorId: uuid("servidor_id")
    .references(() => servidores.id, { onDelete: "cascade" })
    .notNull(),
  dataRegistro: text("data_registro").notNull(), // data inserida manualmente pelo usuário (texto livre)
  observacao: text("observacao").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Types inferidos ───────────────────────────────────────────────────────────
export type Servidor = typeof servidores.$inferSelect;
export type GrupoDocumento = typeof gruposDocumento.$inferSelect;
export type Documento = typeof documentos.$inferSelect;
export type DocumentoStatus = typeof documentoStatus.$inferSelect;
export type AndamentoLog = typeof andamentoLog.$inferSelect;
