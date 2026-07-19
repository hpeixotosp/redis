// ─── Dados de seed atualizados estritamente de acordo com as regras de negócio fornecidas ─────────────────

const G = {
  H01: "a1100001-0000-0000-0000-000000000001", // Humberto -> TRE-SP Cenário A
  A01: "a2200001-0000-0000-0000-000000000001", // Antonio -> TRE-BA
  K01: "a3300001-0000-0000-0000-000000000001", // Karlyana -> TRT6 Entrada
  M01: "a4400001-0000-0000-0000-000000000001", // Mayla -> TRT21
  S01: "a5500001-0000-0000-0000-000000000001", // Stephani -> TRT2 (Concluído)
  S02: "a5500002-0000-0000-0000-000000000002", // Stephani -> TRE-SP (Cenário B)
  S03: "a5500003-0000-0000-0000-000000000003", // Stephani -> TRE-BA
  S04: "a5500004-0000-0000-0000-000000000004", // Stephani -> TRT6 (Saindo)
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
    { id: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "TRE-SP — Cenário A (Anexo II)", tribunalAlvo: "TRE-SP", ordem: "1" },
    { id: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "TRE-BA — Documentos Exigidos", tribunalAlvo: "TRE-BA", ordem: "1" },
    { id: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "TRT6 — Documentos Fornecidos pelo Servidor e Origem", tribunalAlvo: "TRT 6ª Região PE", ordem: "1" },
    { id: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "TRT21 — Documentos Exigidos", tribunalAlvo: "TRT 21ª Região RN", ordem: "1" },
    { id: G.S01, servidorId: "55555555-5555-5555-5555-555555555555", nome: "✅ TRT 2ª Região SP — Concluído", tribunalAlvo: "TRT 2ª Região SP", ordem: "1" },
    { id: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRE-SP — Cenário B (Anexo IV)", tribunalAlvo: "TRE-SP", ordem: "2" },
    { id: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRE-BA — Documentação a Fornecer", tribunalAlvo: "TRE-BA", ordem: "3" },
    { id: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRT6 — Saindo do Tribunal", tribunalAlvo: "TRT 6ª Região PE", ordem: "4" },
    { id: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "TRT21 — Documentação a Fornecer", tribunalAlvo: "TRT 21ª Região RN", ordem: "5" },
  ],

  documentos: [
    // ── 1. TRE-BA (Antonio e Stephani) ─────────────────────────────────────────
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "1. Ficha Cadastral", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "2. Portaria de nomeação do cargo efetivo ocupado, com data de publicação", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "3. Ficha financeira do presente exercício", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "4. Certidão do órgão de origem informando data de posse e exercício no cargo", observacaoDoc: "Item 4.1" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "4. Certidão do órgão de origem informando se o servidor possui o mínimo de 36 meses de efetivo exercício no cargo", observacaoDoc: "Item 4.2" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "4. Certidão do órgão de origem informando se o mesmo cargo foi redistribuído nos últimos 03 anos", observacaoDoc: "Item 4.3" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "4. Certidão do órgão de origem informando se o servidor está respondendo a sindicância ou PAD ou cumprindo penalidade", observacaoDoc: "Item 4.4" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "5. Cópias das 03 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "6. Certidão emitida no site do TSE de que o servidor não se encontra filiado a partido político", observacaoDoc: "Para origem fora da Justiça Eleitoral" },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "7. Certidão sobre eventual existência de banco de horas e, se for o caso, plano de compensação, com anuência da chefia", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "8. Manifestação favorável da chefia acerca da redistribuição pleiteada", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "9. Curriculum vitae", observacaoDoc: null },
    { grupoId: G.A01, servidorId: "22222222-2222-2222-2222-222222222222", nome: "Nota Geral: Requerimento conjunto dirigido ao Presidente do TRE-BA com interesse ou renúncia ao prazo de trânsito", observacaoDoc: null },

    // Stephani fornecendo para TRE-BA
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "1. Ficha Cadastral", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "2. Portaria de nomeação do cargo efetivo ocupado, com data de publicação", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "3. Ficha financeira do presente exercício", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "4. Certidão do órgão de origem informando data de posse/exercício, se possui 36 meses no cargo, se cargo foi redistribuído nos últimos 3 anos, se responde a sindicância/PAD", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "5. Cópias das 03 últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "6. Certidão emitida no site do TSE de que o servidor não se encontra filiado a partido político", observacaoDoc: null },
    { grupoId: G.S03, servidorId: "55555555-5555-5555-5555-555555555555", nome: "9. Curriculum vitae", observacaoDoc: null },

    // ── 2. TRE-SP Cenário A (Humberto) ───────────────────────────────────────
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "1. Formulário de requerimento de redistribuição de cargo e declarações sobre revisão de direitos e vantagens e banco de horas", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "2. Ficha cadastral", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "3. Certidão de situação funcional (órgão de origem, matrícula, lotação atual, tempo de exercício e histórico de redistribuição)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "4. Cópia da publicação do ato de nomeação no órgão de origem", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "5. Certidão ou relatório de provimento e vacância", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "6. Certidão expedida pelo Tribunal em que esteve em exercício nos últimos cinco anos (sindicância, PAD ou penalidade)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "7. Histórico de lotações", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "8. Certidão do saldo de horas credoras (ou documento de sistemas internos)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "9. Relatório de escala de férias", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "10. Histórico de afastamentos", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "11. Relatório de progressão, movimentação e promoção funcional", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "12. As três últimas avaliações de desempenho", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "13. Ficha financeira do exercício em curso", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "14. Declaração do tribunal de origem sobre eventual determinação judicial/legal de verba", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "15. Relatório de adicional de qualificação e treinamento (cursos, carga horária e período/percentuais)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "16. Diploma de graduação (se recebe AQ)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "17. Certificado de pós-graduação (se recebe AQ)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "18. Declaração de vínculo com o órgão origem (dados, cargo, regime, migração, Funpresp-Jud)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "19. Certidão de Benefício Especial (se ingresso até 13/10/2013 e optou por migração)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "20. Prontuário médico (Documento Sigiloso - Envio exclusivo por e-mail para a Saúde do TRE-SP)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "21. Formulário do perfil profissional (para avaliação do futuro gestor)", observacaoDoc: null },
    { grupoId: G.H01, servidorId: "11111111-1111-1111-1111-111111111111", nome: "22. Declaração ou Certidão de tempo de serviço averbado e sua utilização prévia", observacaoDoc: null },

    // ── 2. TRE-SP Cenário B (Stephani) ───────────────────────────────────────
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "1. Formulário de requerimento de redistribuição de cargo", observacaoDoc: null },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "2. Ofício do órgão de origem comunicando atendimento ao interesse público", observacaoDoc: null },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "3. Certidão de situação funcional (órgão de origem, lotação, tempo de exercício e histórico de redistribuição)", observacaoDoc: null },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "5. Ficha cadastral (numeração original pula o item 4)", observacaoDoc: null },
    { grupoId: G.S02, servidorId: "55555555-5555-5555-5555-555555555555", nome: "6. Certidão expedida pelo Tribunal em que esteve em exercício nos últimos cinco anos (sindicância, PAD ou penalidade)", observacaoDoc: null },

    // ── 3. TRT6 Entrada (Karlyana) ──────────────────────────────────────────
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Requerimento solicitando redistribuição com assinatura de todos servidores", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Solicitação do trânsito para deslocamento à nova sede (podendo ser renunciado)", observacaoDoc: "Apenas servidor vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Certidão se responde ou não a sindicância ou processo administrativo disciplinar", observacaoDoc: "Levada por ambos servidores para destino" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Certidão do órgão de origem (dados de ingresso/efetivação, lei de criação, classe, padrão, regime jurídico, férias, licenças)", observacaoDoc: "Levada por ambos servidores" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Cópia do Termo de posse", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Cópia do Ato de homologação do estágio probatório e respectiva publicação", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Certidão com as averbações do tempo de serviço de outros órgão/empresas", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Histórico de progressões com as respectivas portarias/atos de concessão", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Declaração do órgão de origem sobre o tipo de previdência e opção por Previdência complementar", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Certidão de tempo estimado para aposentadoria", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Ofício da Chefia imediata de informações de relacionamento interpessoal desempenho funcional", observacaoDoc: "Apenas servidor vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Ofício do Setor de Saúde: Relatório médico + Prontuário médico enviado DIRETAMENTE por e-mail à SSO do TRT6", observacaoDoc: "Apenas servidor vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Cópias das fichas financeiras dos 03(três) últimos anos", observacaoDoc: "Apenas vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Ficha cadastral preenchida", observacaoDoc: "Apenas vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Comprovante de conta salário Bradesco", observacaoDoc: "Apenas vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Cópia do Ato de Nomeação e publicação", observacaoDoc: "Apenas vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Certidão a título de VPNI (quintos, décimos, incorporados)", observacaoDoc: "Apenas vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Cópia das 03(três) últimas Avaliações Funcionais", observacaoDoc: "Apenas vindo para o TRT6" },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Declaração de ciência da lotação atual ou a critério da administração", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Declaração de renúncia da ajuda de custo", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Certidão com a descrição dos cursos homologados no Tribunal para fins de AQ e respectivos prazos", observacaoDoc: null },
    { grupoId: G.K01, servidorId: "33333333-3333-3333-3333-333333333333", nome: "* Ofício/declaração com a manifestação da unidade do servidor do TRT6 quanto à lotação do recíproco", observacaoDoc: null },

    // Stephani saindo do TRT6
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Requerimento solicitando redistribuição com assinatura de todos servidores", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão se responde ou não a sindicância ou processo administrativo disciplinar", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão do órgão de origem (dados de ingresso/efetivação, lei de criação, classe, padrão, regime jurídico, férias, licenças)", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Cópia do Termo de posse", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Cópia do Ato de homologação do estágio probatório e respectiva publicação", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão com as averbações do tempo de serviço de outros órgão/empresas", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Histórico de progressões com as respectivas portarias/atos de concessão", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Declaração do órgão de origem sobre o tipo de previdência e opção por Previdência complementar", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão de tempo estimado para aposentadoria", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Declaração de ciência da lotação atual ou a critério da administração", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Declaração de renúncia da ajuda de custo", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão com a descrição dos cursos homologados no Tribunal para fins de AQ e prazos", observacaoDoc: null },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Devolução de crachá e token", observacaoDoc: "Apenas para servidor TRT6 saindo" },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Declaração de devolução de bens ao Tribunal", observacaoDoc: "Apenas para servidor TRT6 saindo" },
    { grupoId: G.S04, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Ficha e-Pessoal (antigo Sisac)", observacaoDoc: null },

    // ── 4. TRT21 (Mayla e Stephani) ──────────────────────────────────────────
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Requerimento subscrito pelos servidores interessados", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Certidão expedida pelo órgão de origem (data de posse/exercício, informação se redistribuído últimos 3 anos, lei de criação do cargo)", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Certidão de que não responde a sindicância/processo administrativo disciplinar (incluir certidão de exercício e origem se já removido)", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Relatório de afastamentos do servidor e folgas a serem usufruídas (se já removido/cedido ao TRT21, requerer no Regional também)", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Histórico de Progressão, Promoção e Movimentação Funcional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Relatório de Adicional de Qualificação (SIGEP) - adicionais de capacitação", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Certidão de Adicional de Qualificação (SIGEP) - AQ-PG", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Relatório de férias", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Opção Ajuda de Custo e Férias", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Ficha financeira", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Histórico de lotações", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Três últimas avaliações de desempenho funcional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Relatório médico atualizado, constando restrições laborais", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Currículo profissional", observacaoDoc: null },
    { grupoId: G.M01, servidorId: "44444444-4444-4444-4444-444444444444", nome: "* Documento de identidade (RG)", observacaoDoc: null },

    // Stephani fornecendo para TRT21
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Requerimento subscrito pelos servidores interessados", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão expedida pelo órgão de origem (data de posse/exercício, informação se redistribuído últimos 3 anos, lei de criação do cargo)", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão de que não responde a sindicância/processo administrativo disciplinar (incluir certidão de exercício e origem se já removido)", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Relatório de afastamentos do servidor e folgas a serem usufruídas (se já removido/cedido ao TRT21, requerer no Regional também)", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Histórico de Progressão, Promoção e Movimentação Funcional", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Relatório de Adicional de Qualificação (SIGEP) - adicionais de capacitação", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Certidão de Adicional de Qualificação (SIGEP) - AQ-PG", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Relatório de férias", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Opção Ajuda de Custo e Férias", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Ficha financeira", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Histórico de lotações", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Três últimas avaliações de desempenho funcional", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Relatório médico atualizado, constando restrições laborais", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Currículo profissional", observacaoDoc: null },
    { grupoId: G.S05, servidorId: "55555555-5555-5555-5555-555555555555", nome: "* Documento de identidade (RG)", observacaoDoc: null },

    // ── STEPHANI — TRT2 CONCLUÍDO ────────────────────────────────────────────
    { grupoId: G.S01, servidorId: "55555555-5555-5555-5555-555555555555", nome: "Processo integralmente concluído junto ao TRT 2ª Região SP", observacaoDoc: "Redistribuição efetivada" },
  ],

  GRUPO_STEPHANI_TRT2: G.S01,
};
