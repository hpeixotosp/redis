import { getDb } from "./db";
import {
  servidores,
  gruposDocumento,
  documentos,
  documentoStatus,
} from "./schema";
import { SEED_DATA } from "./seed-data";
import { eq } from "drizzle-orm";

async function seed() {
  const db = getDb();
  console.log("🌱 Iniciando seed do banco de dados...\n");

  // Limpar tabelas na ordem correta (foreign keys)
  console.log("🗑️  Limpando dados existentes...");
  await db.delete(documentoStatus);
  await db.delete(documentos);
  await db.delete(gruposDocumento);
  await db.delete(servidores);

  // 1. Inserir servidores
  console.log("👤 Inserindo servidores...");
  for (const s of SEED_DATA.servidores) {
    await db.insert(servidores).values(s);
    console.log(`   ✓ ${s.nome}`);
  }

  // 2. Inserir grupos de documentos
  console.log("\n📁 Inserindo grupos de documentos...");
  for (const g of SEED_DATA.grupos) {
    await db.insert(gruposDocumento).values(g);
    console.log(`   ✓ ${g.nome}`);
  }

  // 3. Inserir documentos e criar status inicial
  console.log("\n📄 Inserindo documentos e status...");
  for (const d of SEED_DATA.documentos) {
    const [doc] = await db
      .insert(documentos)
      .values({
        grupoId: d.grupoId,
        servidorId: d.servidorId,
        nome: d.nome,
        observacaoDoc: d.observacaoDoc,
        obrigatorio: true,
      })
      .returning();

    // Criar status inicial como não entregue
    // Exceto o grupo g-s-01 (TRT2 concluído da Stephani) que nasce como entregue
    const isConcluido = d.grupoId === SEED_DATA.GRUPO_STEPHANI_TRT2;
    await db.insert(documentoStatus).values({
      documentoId: doc.id,
      entregue: isConcluido,
      dataEntrega: isConcluido ? new Date() : null,
      observacao: isConcluido ? "Processo concluído junto ao TRT 2ª Região SP" : null,
    });
  }

  console.log("\n✅ Seed concluído com sucesso!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro no seed:", err);
  process.exit(1);
});
