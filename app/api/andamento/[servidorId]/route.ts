export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import { andamentoLog } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/andamento/[servidorId] — busca todos os logs
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ servidorId: string }> }
) {
  const db = getDb();
  const { servidorId } = await params;
  try {
    const logs = await db
      .select()
      .from(andamentoLog)
      .where(eq(andamentoLog.servidorId, servidorId))
      .orderBy(andamentoLog.createdAt);

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar logs" }, { status: 500 });
  }
}

// POST /api/andamento/[servidorId] — cria novo registro de andamento
export async function POST(
  req: Request,
  { params }: { params: Promise<{ servidorId: string }> }
) {
  const db = getDb();
  const { servidorId } = await params;
  try {
    const body = await req.json();
    const { dataRegistro, observacao } = body as {
      dataRegistro: string;
      observacao: string;
    };

    if (!dataRegistro || !observacao) {
      return NextResponse.json(
        { error: "Data e observação são obrigatórias" },
        { status: 400 }
      );
    }

    const [log] = await db
      .insert(andamentoLog)
      .values({ servidorId, dataRegistro, observacao })
      .returning();

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao salvar andamento" }, { status: 500 });
  }
}

// DELETE /api/andamento/[servidorId]?logId=xxx — remove um registro
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ servidorId: string }> }
) {
  const db = getDb();
  const { searchParams } = new URL(req.url);
  const logId = searchParams.get("logId");

  if (!logId) {
    return NextResponse.json({ error: "logId é obrigatório" }, { status: 400 });
  }

  try {
    await db.delete(andamentoLog).where(eq(andamentoLog.id, logId));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar log" }, { status: 500 });
  }
}
