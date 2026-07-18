export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import { SEED_DATA } from "@/lib/seed-data";
import {
  servidores,
  gruposDocumento,
  documentos,
  documentoStatus,
  andamentoLog,
} from "@/lib/schema";
import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// POST /api/setup — cria tabelas e popula o banco
// Protegido por token simples: POST com header Authorization: Bearer setup-redistribuicao
export async function POST(req: Request) {
  const auth = req.headers.get("Authorization");
  if (auth !== "Bearer setup-redistribuicao") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL não configurada nas variáveis de ambiente da Vercel." },
      { status: 500 }
    );
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Criar tabelas
    await sql`CREATE TABLE IF NOT EXISTS servidores (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome TEXT NOT NULL,
      cargo TEXT NOT NULL,
      orgao_origem TEXT NOT NULL,
      orgao_destino TEXT NOT NULL,
      regra_tribunal TEXT NOT NULL,
      concluido BOOLEAN NOT NULL DEFAULT false,
      ordem TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;

    await sql`CREATE TABLE IF NOT EXISTS grupos_documento (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      servidor_id UUID NOT NULL REFERENCES servidores(id) ON DELETE CASCADE,
      nome TEXT NOT NULL,
      tribunal_alvo TEXT,
      ordem TEXT NOT NULL
    )`;

    await sql`CREATE TABLE IF NOT EXISTS documentos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      grupo_id UUID NOT NULL REFERENCES grupos_documento(id) ON DELETE CASCADE,
      servidor_id UUID NOT NULL REFERENCES servidores(id) ON DELETE CASCADE,
      nome TEXT NOT NULL,
      observacao_doc TEXT,
      obrigatorio BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;

    await sql`CREATE TABLE IF NOT EXISTS documento_status (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      documento_id UUID NOT NULL UNIQUE REFERENCES documentos(id) ON DELETE CASCADE,
      entregue BOOLEAN NOT NULL DEFAULT false,
      data_entrega TIMESTAMPTZ,
      observacao TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`;

    await sql`CREATE TABLE IF NOT EXISTS andamento_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      servidor_id UUID NOT NULL REFERENCES servidores(id) ON DELETE CASCADE,
      data_registro TEXT NOT NULL,
      observacao TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`;

    // Limpar dados
    await sql`TRUNCATE andamento_log, documento_status, documentos, grupos_documento, servidores CASCADE`;

    // Inserir servidores
    for (const s of SEED_DATA.servidores) {
      await sql`INSERT INTO servidores (id, nome, cargo, orgao_origem, orgao_destino, regra_tribunal, concluido, ordem)
        VALUES (${s.id}::uuid, ${s.nome}, ${s.cargo}, ${s.orgaoOrigem}, ${s.orgaoDestino}, ${s.regraTribunal}, ${s.concluido}, ${s.ordem})`;
    }

    // Inserir grupos
    for (const g of SEED_DATA.grupos) {
      await sql`INSERT INTO grupos_documento (id, servidor_id, nome, tribunal_alvo, ordem)
        VALUES (${g.id}::uuid, ${g.servidorId}::uuid, ${g.nome}, ${g.tribunalAlvo}, ${g.ordem})`;
    }

    // Inserir documentos + status
    let docsCount = 0;
    for (const d of SEED_DATA.documentos) {
      const [doc] = await sql`INSERT INTO documentos (grupo_id, servidor_id, nome, observacao_doc, obrigatorio)
        VALUES (${d.grupoId}::uuid, ${d.servidorId}::uuid, ${d.nome}, ${d.observacaoDoc}, true)
        RETURNING id`;

      const isConcluido = d.grupoId === SEED_DATA.GRUPO_STEPHANI_TRT2;
      await sql`INSERT INTO documento_status (documento_id, entregue, data_entrega, observacao)
        VALUES (${doc.id}::uuid, ${isConcluido}, ${isConcluido ? new Date().toISOString() : null}, ${isConcluido ? "Processo concluído junto ao TRT 2ª Região SP" : null})`;
      docsCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Setup concluído: ${SEED_DATA.servidores.length} servidores, ${SEED_DATA.grupos.length} grupos, ${docsCount} documentos.`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
