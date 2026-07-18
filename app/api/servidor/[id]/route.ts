export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import {
  servidores,
  gruposDocumento,
  documentos,
  documentoStatus,
  andamentoLog,
} from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/servidor/[id] — detalhes completos + checklist
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = getDb();
  const { id } = await params;
  try {
    const [servidor] = await db
      .select()
      .from(servidores)
      .where(eq(servidores.id, id))
      .limit(1);

    if (!servidor) {
      return NextResponse.json({ error: "Servidor não encontrado" }, { status: 404 });
    }

    const grupos = await db
      .select()
      .from(gruposDocumento)
      .where(eq(gruposDocumento.servidorId, id))
      .orderBy(gruposDocumento.ordem);

    const gruposComDocs = await Promise.all(
      grupos.map(async (grupo) => {
        const docs = await db
          .select()
          .from(documentos)
          .where(eq(documentos.grupoId, grupo.id));

        const docsComStatus = await Promise.all(
          docs.map(async (doc) => {
            const [status] = await db
              .select()
              .from(documentoStatus)
              .where(eq(documentoStatus.documentoId, doc.id))
              .limit(1);
            return { ...doc, status: status ?? null };
          })
        );

        return { ...grupo, documentos: docsComStatus };
      })
    );

    const logs = await db
      .select()
      .from(andamentoLog)
      .where(eq(andamentoLog.servidorId, id))
      .orderBy(andamentoLog.createdAt);

    return NextResponse.json({ servidor, grupos: gruposComDocs, logs });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
