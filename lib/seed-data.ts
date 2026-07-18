// ─── Dados de seed atualizados de acordo com as Regras de Negócio ─────────────────

const G = {
  H01: "a1100001-0000-0000-0000-000000000001", // Humberto -> TRE-SP Cenário A
  A01: "a2200001-0000-0000-0000-000000000001", // Antonio -> TRE-BA
  K01: "a3300001-0000-0000-0000-000000000001", // Karlyana -> TRT6 Entrada
  M01: "a4400001-0000-0000-0000-000000000001", // Mayla -> TRT21
  S01: "a5500001-0000-0000-0000-000000000001", // Stephani -> TRT2 (Concluído)
  S02: "a5500002-0000-0000-0000-000000000002", // Stephani -> TRE-SP (Cenário B)
  S03: "a5500003-0000-0000-0000-000000000003", // Stephani -> TRE-BA
  S04: "a5500004-0000-0000-0000-000000000004", // Stephani -> TRT6 (Saída)
  S05: "a5500005-0000-0000-0000-000000000005", // Stephani -> TRT21
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
    { id: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "TRE-SP — Cenário A (Anexo II)", tribunalAlvo: "TRE-SP", ordem: "1" },

    // ── ANTONIO → TRE-BA ────────────────────────────────────────────────────
    { id: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "TRE-BA — Documentos Exigidos", tribunalAlvo: "TRE-BA", ordem: "1" },

    // ── KARLYANA → TRT6 ─────────────────────────────────────────────────────
    { id: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "TRT6 — Entrada no Tribunal", tribunalAlvo: "TRT 6ª Região PE", ordem: "1" },

    // ── MAYLA → TRT21 ───────────────────────────────────────────────────────
    { id: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "TRT21 — Documentos Exigidos", tribunalAlvo: "TRT 21ª Região RN", ordem: "1" },

    // ── STEPHANI ────────────────────────────────────────────────────────────
    { id: G.S01, servidorId: "55555555-5555-5555-5555-555555555555", nome: "✅ TRT 2ª Região SP — Concluído", tribunalAlvo: "TRT 2ª Região SP", ordem: "1" },
    { id: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRE-SP — Cenário B (Anexo IV)", tribunalAlvo: "TRE-SP", ordem: "2" },
    { id: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRE-BA — Documentação a Fornecer", tribunalAlvo: "TRE-BA", ordem: "3" },
    { id: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRT6 — Saindo do Tribunal", tribunalAlvo: "TRT 6ª Região PE", ordem: "4" },
    { id: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRT21 — Documentação a Fornecer", tribunalAlvo: "TRT 21ª Região RN", ordem: "5" },
  ],

  documentos: [
    // ── 1. TRE-BA (Antonio e Stephani) ─────────────────────────────────────────
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Requerimento conjunto dirigido ao Presidente do TRE-BA com interesse/renúncia ao trânsito", observacaoDoc: "Item obrigatório do processo" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Ficha Cadastral", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Portaria de nomeação do cargo efetivo ocupado, com data de publicação", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Ficha financeira do presente exercício", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Certidão do órgão de origem informando data de posse/exercício, mínimo 36 meses no cargo, se houve redistribuição nos últimos 3 anos, se responde a sindicância/PAD ou cumpre penalidade", observacaoDoc: "Seção 4 da norma" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Cópias das 03 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Certidão do site do TSE de que o servidor não se encontra filiado a partido político", observacaoDoc: "Para origem fora da Justiça Eleitoral" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Certidão sobre eventual existência de banco de horas e, se aplicável, plano de compensação com anuência da chefia", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Manifestação favorável da chefia acerca da redistribuição", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Curriculum vitae", observacaoDoc: null },

    // Stephani fornecendo para TRE-BA
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Ficha Cadastral", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Portaria de nomeação do cargo efetivo ocupado, com data de publicação", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Ficha financeira do presente exercício", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão do órgão de origem informando data de posse/exercício, mínimo 36 meses no cargo, se houve redistribuição nos últimos 3 anos, se responde a sindicância/PAD", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Cópias das 03 últimas avaliações de desempenho", observacaoDoc: null },

    // ── 2. TRE-SP Cenário A (Humberto) ───────────────────────────────────────
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Formulário de requerimento de redistribuição de cargo e declarações (revisão de direitos/banco de horas)", observacaoDoc: "Item 1" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Ficha cadastral", observacaoDoc: "Item 2" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidão de situação funcional (matrícula, lotação, tempo de cargo e histórico de redistribuição)", observacaoDoc: "Item 3" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Cópia da publicação do ato de nomeação no órgão de origem", observacaoDoc: "Item 4" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidão ou relatório de provimento e vacância", observacaoDoc: "Item 5" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidão expedida pelo Tribunal dos últimos cinco anos sobre sindicância, PAD ou penalidade", observacaoDoc: "Item 6" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Histórico de lotações", observacaoDoc: "Item 7" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidão do saldo de horas credoras", observacaoDoc: "Item 8" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Relatório de escala de férias", observacaoDoc: "Item 9" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Histórico de afastamentos", observacaoDoc: "Item 10" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Relatório de progressão, movimentação e promoção funcional", observacaoDoc: "Item 11" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "As três últimas avaliações de desempenho", observacaoDoc: "Item 12" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Ficha financeira do exercício em curso", observacaoDoc: "Item 13" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Declaração sobre eventual determinação judicial/legal de verba", observacaoDoc: "Item 14" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Relatório de adicional de qualificação e treinamento", observacaoDoc: "Item 15" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Diploma de graduação (se recebe AQ)", observacaoDoc: "Item 16" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certificado de pós-graduação (se recebe AQ)", observacaoDoc: "Item 17" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Declaração de vínculo com o órgão origem (dados, cargo, ingresso e regime previdenciário)", observacaoDoc: "Item 18" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Certidão de Benefício Especial (se ingresso até 13/10/2013 e optou por migração)", observacaoDoc: "Item 19" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Prontuário médico (Documento Sigiloso - Envio por e-mail para a Saúde)", observacaoDoc: "Item 20" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Formulário do perfil profissional", observacaoDoc: "Item 21" },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "Declaração/Certidão de tempo de serviço averbado e sua utilização prévia", observacaoDoc: "Item 22" },

    // ── 2. TRE-SP Cenário B (Stephani) ───────────────────────────────────────
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Formulário de requerimento de redistribuição de cargo", observacaoDoc: "Item 1" },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Ofício do órgão de origem comunicando atendimento ao interesse público", observacaoDoc: "Item 2" },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão de situação funcional (órgão de origem, lotação, tempo e redistribuições)", observacaoDoc: "Item 3" },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Ficha cadastral", observacaoDoc: "Item 5" },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão expedida pelo Tribunal dos últimos cinco anos sobre sindicância, PAD ou penalidade", observacaoDoc: "Item 6" },

    // ── 3. TRT6 Entrada (Karlyana e Stephani) ──────────────────────────────────
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Requerimento solicitando redistribuição assinado por todos os servidores", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Solicitação ou renúncia do trânsito para deslocamento", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão se responde ou não a sindicância ou processo administrativo disciplinar", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão do órgão de origem (dados de ingresso, efetivação, lei do cargo, classe, padrão, férias e licenças)", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Cópia do Termo de posse", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Cópia do Ato de homologação do estágio probatório", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão com as averbações do tempo de serviço de outros órgãos/empresas", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Histórico de progressões com as respectivas portarias/atos", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Declaração do órgão de origem sobre o tipo de previdência e opção por Previdência complementar", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão de tempo estimado para aposentadoria", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Ofício da Chefia imediata com informações de relacionamento e desempenho", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Ofício do Setor de Saúde: Relatório médico constando restrições/PCD + Prontuário médico direto via e-mail à SSO", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Cópias das fichas financeiras dos 03(três) últimos anos", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Ficha cadastral preenchida", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Comprovante de conta salário Bradesco", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Cópia do Ato de Nomeação e publicação", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão a título de VPNI (quintos, décimos incorporados)", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Cópia das 03(três) últimas Avaliações Funcionais", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Declaração de ciência da lotação atual ou a critério da administração", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Declaração de renúncia da ajuda de custo", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Certidão com a descrição dos cursos homologados no Tribunal para fins de AQ", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "Ofício/declaração com a manifestação da unidade do TRT6 quanto à lotação do recíproco", observacaoDoc: null },

    // Stephani saindo do TRT6
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Devolução de crachá e token", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Declaração de devolução de bens ao Tribunal", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Ficha e-Pessoal (antigo Sisac)", observacaoDoc: null },

    // ── 4. TRT21 (Mayla e Stephani) ──────────────────────────────────────────
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Requerimento subscrito pelos servidores interessados", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Certidão expedida pelo órgão de origem (posse, exercício, se redistribuído últimos 3 anos, lei do cargo)", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Certidão de que não responde a sindicância/processo administrativo disciplinar (origem e exercício)", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Relatório de afastamentos do servidor e folgas a serem usufruídas", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Histórico de Progressão, Promoção e Movimentação Funcional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Relatório de Adicional de Qualificação (SIGEP) - adicionais de capacitação", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Certidão de Adicional de Qualificação (SIGEP) - AQ-PG", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Relatório de férias", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Opção Ajuda de Custo e Férias", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Ficha financeira", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Histórico de lotações", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Três últimas avaliações de desempenho funcional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Relatório médico atualizado, constando restrições laborais", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Currículo profissional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "Documento de identidade (RG)", observacaoDoc: null },

    // Stephani fornecendo para TRT21
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Requerimento subscrito pelos servidores interessados", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão expedida pelo órgão de origem (posse, exercício, se redistribuído últimos 3 anos)", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Certidão de que não responde a sindicância/processo administrativo disciplinar", observacaoDoc: null },

    // ── STEPHANI — TRT2 CONCLUÍDO ────────────────────────────────────────────
    { grupoId: G.S01, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Processo integralmente concluído junto ao TRT 2ª Região SP", observacaoDoc: "Redistribuição efetivada" },
  ],

  GRUPO_STEPHANI_TRT2: G.S01,
};
