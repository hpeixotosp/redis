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

export async function GET() {
  const db = getDb();
  try {
    const lista = await db
      .select()
      .from(servidores)
      .orderBy(servidores.ordem);

    // Para cada servidor, calcular progresso
    const resultado = await Promise.all(
      lista.map(async (srv) => {
        const docs = await db
          .select({ id: documentos.id, grupoId: documentos.grupoId })
          .from(documentos)
          .where(eq(documentos.servidorId, srv.id));

        const statusList = await Promise.all(
          docs.map((d) =>
            db
              .select()
              .from(documentoStatus)
              .where(eq(documentoStatus.documentoId, d.id))
              .limit(1)
          )
        );

        const total = docs.length;
        const entregues = statusList.filter((s) => s[0]?.entregue).length;

        // Último andamento
        const ultimoAndamento = await db
          .select()
          .from(andamentoLog)
          .where(eq(andamentoLog.servidorId, srv.id))
          .orderBy(andamentoLog.createdAt)
          .limit(1);

        return {
          ...srv,
          progresso: { total, entregues },
          ultimoAndamento: ultimoAndamento[0] ?? null,
        };
      })
    );

    return NextResponse.json(resultado);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar servidores" }, { status: 500 });
  }
}
