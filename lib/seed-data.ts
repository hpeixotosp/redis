// ─── Dados de seed para o dashboard de redistribuição ──────────────────────────

// IDs dos grupos (UUID válidos)
const G = {
  H01: "a1100001-0000-0000-0000-000000000001",
  A01: "a2200001-0000-0000-0000-000000000001",
  K01: "a3300001-0000-0000-0000-000000000001",
  K02: "a3300002-0000-0000-0000-000000000002",
  M01: "a4400001-0000-0000-0000-000000000001",
  S01: "a5500001-0000-0000-0000-000000000001", // TRT2 — concluído
  S02: "a5500002-0000-0000-0000-000000000002", // TRE-SP
  S03: "a5500003-0000-0000-0000-000000000003", // TRE-BA
  S04: "a5500004-0000-0000-0000-000000000004", // TRT6
  S05: "a5500005-0000-0000-0000-000000000005", // TRT21
};

export const SEED_DATA = {
  servidores: [
    {
      id: "11111111-1111-1111-1111-111111111111",
      nome: "Humberto Acácio Peixoto",
      cargo: "TJAA",
      orgaoOrigem: "TRT 2ª Região SP",
      orgaoDestino: "TRE-SP",
      regraTribunal: "TRE-SP — Cenário A (Anexo II)",
      concluido: false,
      ordem: "1",
    },
    {
      id: "22222222-2222-2222-2222-222222222222",
      nome: "Antonio Carlos Cerqueira Santos",
      cargo: "TJAA",
      orgaoOrigem: "TRE-SP",
      orgaoDestino: "TRE-BA",
      regraTribunal: "TRE-BA",
      concluido: false,
      ordem: "2",
    },
    {
      id: "33333333-3333-3333-3333-333333333333",
      nome: "Karlyana Ramos De Melo",
      cargo: "TJAA",
      orgaoOrigem: "TRE-BA",
      orgaoDestino: "TRT 6ª Região PE",
      regraTribunal: "TRT6 — Entrada",
      concluido: false,
      ordem: "3",
    },
    {
      id: "44444444-4444-4444-4444-444444444444",
      nome: "Mayla da Luz Albano Farache",
      cargo: "TJAA",
      orgaoOrigem: "TRT 6ª Região PE",
      orgaoDestino: "TRT 21ª Região RN",
      regraTribunal: "TRT21",
      concluido: false,
      ordem: "4",
    },
    {
      id: "55555555-5555-5555-5555-555555555555",
      nome: "Stephani Espfar",
      cargo: "TJAA",
      orgaoOrigem: "TRT 21ª Região RN",
      orgaoDestino: "TRT 2ª Região SP",
      regraTribunal: "Pentagonal — Fornecimento a demais tribunais",
      concluido: false,
      ordem: "5",
    },
  ],

  grupos: [
    // ── HUMBERTO → TRE-SP ───────────────────────────────────────────────────
    { id: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "TRE-SP — Documentos Exigidos (Cenário A / Anexo II)", tribunalAlvo: "TRE-SP", ordem: "1" },

    // ── ANTONIO → TRE-BA ────────────────────────────────────────────────────
    { id: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "TRE-BA — Documentos Exigidos", tribunalAlvo: "TRE-BA", ordem: "1" },

    // ── KARLYANA → TRT6 ─────────────────────────────────────────────────────
    { id: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "TRT6 — Documentos Comuns (Origem e Destino)", tribunalAlvo: "TRT 6ª Região PE", ordem: "1" },
    { id: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "TRT6 — Específico: Servidor Entrando no TRT6", tribunalAlvo: "TRT 6ª Região PE", ordem: "2" },

    // ── MAYLA → TRT21 ───────────────────────────────────────────────────────
    { id: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "TRT21 — Documentos Exigidos", tribunalAlvo: "TRT 21ª Região RN", ordem: "1" },

    // ── STEPHANI ────────────────────────────────────────────────────────────
    { id: G.S01, servidorId: "55555555-5555-5555-5555-555555555555", nome: "✅ TRT 2ª Região SP — Concluído", tribunalAlvo: "TRT 2ª Região SP", ordem: "1" },
    { id: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRE-SP — Documentação a Fornecer", tribunalAlvo: "TRE-SP", ordem: "2" },
    { id: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRE-BA — Documentação a Fornecer", tribunalAlvo: "TRE-BA", ordem: "3" },
    { id: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRT 6ª Região PE — Documentação a Fornecer", tribunalAlvo: "TRT 6ª Região PE", ordem: "4" },
    { id: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRT 21ª Região RN — Documentação a Fornecer", tribunalAlvo: "TRT 21ª Região RN", ordem: "5" },
  ],

  documentos: [
    // ── HUMBERTO — TRE-SP Cenário A ─────────────────────────────────────────
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Formulário de requerimento e declarações", observacaoDoc: "Inclui revisão de direitos e banco de horas" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Ficha Cadastral e Perfil Profissional", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidões Funcionais", observacaoDoc: "Órgão, matrícula, lotação, tempo de exercício, histórico de redistribuição, provimento/vacância, saldo de horas credoras, disciplinar dos últimos 5 anos" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Cópia de nomeação no órgão de origem", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Históricos de lotações, afastamentos, progressão/promoção e Relatório de férias", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "3 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Ficha financeira atual e Declaração sobre determinações judiciais em verbas", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Relatórios/Certificados de Adicional de Qualificação", observacaoDoc: "Treinamento, Graduação e Pós-graduação" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Declaração de vínculo e regime previdenciário", observacaoDoc: "RPPS/RGPS, migração e previdência complementar" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidão de Benefício Especial e Certidão de tempo averbado", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Prontuário Médico", observacaoDoc: "Envio exclusivamente via e-mail sigiloso à Saúde do TRE-SP" },

    // ── ANTONIO — TRE-BA ────────────────────────────────────────────────────
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Requerimento conjunto", observacaoDoc: "Com interesse/renúncia a trânsito" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Ficha Cadastral", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Portaria de nomeação", observacaoDoc: "Com data de publicação" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Ficha financeira do exercício atual", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Certidão do órgão de origem", observacaoDoc: "Contendo: posse/exercício, tempo >36 meses, se redistribuído nos últimos 3 anos, status disciplinar/PAD" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "3 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Certidão TSE de desfiliação partidária", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Certidão de banco de horas/compensação", observacaoDoc: "Com anuência da chefia" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Manifestação favorável da chefia", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Curriculum vitae", observacaoDoc: null },

    // ── KARLYANA — TRT6 Comum ───────────────────────────────────────────────
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Requerimento conjunto", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão disciplinar", observacaoDoc: "PAD/Sindicância" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão de ingresso/efetivação", observacaoDoc: "Lei, classe, padrão, regime, férias e licenças" },

    // ── KARLYANA — TRT6 Específico Entrada ─────────────────────────────────
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Solicitação/Renúncia de trânsito", observacaoDoc: null },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Cópias: Posse, Homologação de Estágio, Nomeação e Fichas financeiras", observacaoDoc: "Fichas financeiras dos últimos 3 anos" },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidões: Tempo averbado, Tempo para aposentadoria, VPNI, Cursos para AQ", observacaoDoc: null },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Histórico de progressões e 3 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Declarações: Previdência/Funpresp, Ciência de lotação, Renúncia de ajuda de custo", observacaoDoc: null },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Ficha Cadastral e Comprovante de conta salário Bradesco", observacaoDoc: null },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Ofícios: Chefia imediata (desempenho/relacionamento) e Unidade TRT6 (manifestação de recíproco)", observacaoDoc: null },
    { grupoId: G.K02, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Relatório e Prontuário Médico", observacaoDoc: "Envio direto via e-mail à Saúde Ocupacional do TRT6" },

    // ── MAYLA — TRT21 ───────────────────────────────────────────────────────
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Requerimento conjunto", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Documento de identidade (RG) e Currículo profissional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Certidão de origem", observacaoDoc: "Posse/exercício, histórico de redistribuição dos últimos 3 anos, lei do cargo" },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Certidão disciplinar/PAD", observacaoDoc: "Origem e exercício, se aplicável" },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Históricos de lotações, progressão/movimentação", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Relatórios de afastamentos/folgas, férias e médico com restrições laborais", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "3 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Ficha financeira e Opção de Ajuda de Custo e Férias", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Relatórios e Certidões de Adicional de Qualificação", observacaoDoc: "Capacitação e Pós-graduação" },

    // ── STEPHANI — TRT2 CONCLUÍDO ────────────────────────────────────────────
    { grupoId: G.S01, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Processo integralmente concluído junto ao TRT 2ª Região SP", observacaoDoc: "Redistribuição efetivada" },

    // ── STEPHANI — TRE-SP ───────────────────────────────────────────────────
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão funcional / Documento de saída do TRT 21ª RN", observacaoDoc: "A definir conforme solicitação do TRE-SP" },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Declaração de situação disciplinar", observacaoDoc: null },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Outros documentos solicitados pelo TRE-SP", observacaoDoc: "Verificar demanda específica" },

    // ── STEPHANI — TRE-BA ───────────────────────────────────────────────────
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão funcional / Documento de saída do TRT 21ª RN", observacaoDoc: "A definir conforme solicitação do TRE-BA" },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Declaração de situação disciplinar", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Outros documentos solicitados pelo TRE-BA", observacaoDoc: "Verificar demanda específica" },

    // ── STEPHANI — TRT6 ─────────────────────────────────────────────────────
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão funcional / Documento de saída do TRT 21ª RN", observacaoDoc: "A definir conforme solicitação do TRT6" },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão disciplinar", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Outros documentos solicitados pelo TRT6", observacaoDoc: "Verificar demanda específica" },

    // ── STEPHANI — TRT21 ────────────────────────────────────────────────────
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão funcional / Documento de saída do TRT 21ª RN", observacaoDoc: "A definir conforme solicitação do TRT21" },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Declaração de situação disciplinar", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Outros documentos solicitados pelo TRT21", observacaoDoc: "Verificar demanda específica" },
  ],

  // ID do grupo da Stephani que nasce como "concluído"
  GRUPO_STEPHANI_TRT2: G.S01,
};
