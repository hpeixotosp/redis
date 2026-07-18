// Script para criar as tabelas no banco e popular com dados iniciais
// Execute: npx tsx lib/setup-db.ts

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import {
  servidores,
  gruposDocumento,
  documentos,
  documentoStatus,
  andamentoLog,
} from "./schema";
import { SEED_DATA } from "./seed-data";

// Lê .env.local manualmente para uso no script
import { config } from "dotenv";
config({ path: ".env.local" });

async function setupDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não definido no .env.local");
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log("🔧 Criando tabelas...\n");

  // Criar tabelas via SQL raw (mais simples que migrations para setup inicial)
  await sql`
    CREATE TABLE IF NOT EXISTS servidores (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome TEXT NOT NULL,
      cargo TEXT NOT NULL,
      orgao_origem TEXT NOT NULL,
      orgao_destino TEXT NOT NULL,
      regra_tribunal TEXT NOT NULL,
      concluido BOOLEAN NOT NULL DEFAULT false,
      ordem TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS grupos_documento (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      servidor_id UUID NOT NULL REFERENCES servidores(id) ON DELETE CASCADE,
      nome TEXT NOT NULL,
      tribunal_alvo TEXT,
      ordem TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS documentos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      grupo_id UUID NOT NULL REFERENCES grupos_documento(id) ON DELETE CASCADE,
      servidor_id UUID NOT NULL REFERENCES servidores(id) ON DELETE CASCADE,
      nome TEXT NOT NULL,
      observacao_doc TEXT,
      obrigatorio BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS documento_status (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      documento_id UUID NOT NULL UNIQUE REFERENCES documentos(id) ON DELETE CASCADE,
      entregue BOOLEAN NOT NULL DEFAULT false,
      data_entrega TIMESTAMPTZ,
      observacao TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS andamento_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      servidor_id UUID NOT NULL REFERENCES servidores(id) ON DELETE CASCADE,
      data_registro TEXT NOT NULL,
      observacao TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("✅ Tabelas criadas!\n");
  console.log("🌱 Populando dados...\n");

  // Limpar dados existentes
  await sql`TRUNCATE andamento_log, documento_status, documentos, grupos_documento, servidores CASCADE`;

  // Inserir servidores
  for (const s of SEED_DATA.servidores) {
    await sql`
      INSERT INTO servidores (id, nome, cargo, orgao_origem, orgao_destino, regra_tribunal, concluido, ordem)
      VALUES (${s.id}::uuid, ${s.nome}, ${s.cargo}, ${s.orgaoOrigem}, ${s.orgaoDestino}, ${s.regraTribunal}, ${s.concluido}, ${s.ordem})
    `;
    console.log(`   👤 ${s.nome}`);
  }

  // Inserir grupos
  for (const g of SEED_DATA.grupos) {
    await sql`
      INSERT INTO grupos_documento (id, servidor_id, nome, tribunal_alvo, ordem)
      VALUES (${g.id}::uuid, ${g.servidorId}::uuid, ${g.nome}, ${g.tribunalAlvo}, ${g.ordem})
    `;
  }
  console.log(`   📁 ${SEED_DATA.grupos.length} grupos criados`);

  // Inserir documentos e status
  for (const d of SEED_DATA.documentos) {
    const [doc] = await sql`
      INSERT INTO documentos (grupo_id, servidor_id, nome, observacao_doc, obrigatorio)
      VALUES (${d.grupoId}::uuid, ${d.servidorId}::uuid, ${d.nome}, ${d.observacaoDoc}, true)
      RETURNING id
    `;

    const isConcluido = d.grupoId === "g-s-01";
    await sql`
      INSERT INTO documento_status (documento_id, entregue, data_entrega, observacao)
      VALUES (
        ${doc.id}::uuid,
        ${isConcluido},
        ${isConcluido ? new Date().toISOString() : null},
        ${isConcluido ? "Processo concluído junto ao TRT 2ª Região SP" : null}
      )
    `;
  }
  console.log(`   📄 ${SEED_DATA.documentos.length} documentos criados`);

  console.log("\n✅ Setup concluído com sucesso!");
  process.exit(0);
}

setupDatabase().catch((err) => {
  console.error("❌ Erro:", err);
  process.exit(1);
});
