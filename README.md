# Redistribuição — Dashboard de Checklist

Dashboard profissional para acompanhar o processo **pentagonal de redistribuição** de 5 servidores do Judiciário Federal entre tribunais.

## Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Shadcn/ui** + Tailwind CSS v4
- **Drizzle ORM** + **Neon** (Vercel Postgres)
- Deploy: **Vercel**

## Servidores e Fluxo

```
TRT 2ª SP → TRE-SP → TRE-BA → TRT 6ª PE → TRT 21ª RN → TRT 2ª SP
```

| Servidor | Origem | Destino |
|---|---|---|
| Humberto Acácio Peixoto | TRT 2ª Região SP | TRE-SP |
| Antonio Carlos Cerqueira Santos | TRE-SP | TRE-BA |
| Karlyana Ramos De Melo | TRE-BA | TRT 6ª Região PE |
| Mayla da Luz Albano Farache | TRT 6ª Região PE | TRT 21ª Região RN |
| Stephani Espfar (TRT2 ✅) | TRT 21ª Região RN | TRT 2ª Região SP |

## Setup

### 1. Clone e instale

```bash
git clone https://github.com/hpeixotosp/redis.git
cd redis/redistribuicao-dashboard
npm install
```

### 2. Configure o banco de dados

Crie um banco **Neon** (ou Vercel Postgres) e copie a connection string.

```bash
cp .env.example .env.local
# Edite .env.local e adicione sua DATABASE_URL
```

### 3. Crie as tabelas e popule os dados

```bash
npm run setup:db
```

### 4. Rode em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Deploy na Vercel

1. Conecte o repositório GitHub na Vercel
2. Crie um banco **Neon** pelo marketplace da Vercel
3. Adicione a variável `DATABASE_URL` nas configurações do projeto
4. Configure `Root Directory` como `redistribuicao-dashboard`
5. Deploy automático a cada push

## Funcionalidades

- 📋 **Checklist por tribunal** — documentos agrupados por regra aplicável
- ✅ **Toggle em tempo real** — marcar/desmarcar com persistência no banco
- 📊 **Barra de progresso** — visual por servidor e global
- 📝 **Log de andamento manual** — data (texto livre) + observação
- 🔄 **Histórico** — todos os registros por servidor, ordenados
- 🎨 **Design dark premium** — glassmorphism, gradientes, animações suaves
