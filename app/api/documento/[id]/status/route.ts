export const dynamic = "force-dynamic";

import { getDb } from "@/lib/db";
import { documentoStatus } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// PATCH /api/documento/[id]/status — toggle entregue/pendente
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = getDb();
  const { id } = await params;
  try {
    const body = await req.json();
    const { entregue, observacao } = body as {
      entregue: boolean;
      observacao?: string;
    };

    const [updated] = await db
      .update(documentoStatus)
      .set({
        entregue,
        dataEntrega: entregue ? new Date() : null,
        observacao: observacao ?? null,
        updatedAt: new Date(),
      })
      .where(eq(documentoStatus.documentoId, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar status" }, { status: 500 });
  }
}
