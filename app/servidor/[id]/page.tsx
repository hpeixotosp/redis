"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock, AlertCircle,
  Info, Loader2, Plus, Trash2, Calendar, FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type DocStatus = {
  id: string; documentoId: string; entregue: boolean;
  dataEntrega: string | null; observacao: string | null;
};
type Documento = {
  id: string; nome: string; observacaoDoc: string | null;
  obrigatorio: boolean; status: DocStatus | null;
};
type Grupo = {
  id: string; nome: string; tribunalAlvo: string | null;
  ordem: string; documentos: Documento[];
};
type AndamentoLog = {
  id: string; servidorId: string; dataRegistro: string;
  observacao: string; createdAt: string;
};
type ServidorDetalhe = {
  id: string; nome: string; cargo: string; orgaoOrigem: string;
  orgaoDestino: string; regraTribunal: string; concluido: boolean;
};
type PageData = { servidor: ServidorDetalhe; grupos: Grupo[]; logs: AndamentoLog[] };

// ─── Utilitários ──────────────────────────────────────────────────────────────
function calcProgress(grupos: Grupo[]) {
  const total     = grupos.reduce((a, g) => a + g.documentos.length, 0);
  const entregues = grupos.reduce((a, g) => a + g.documentos.filter(d => d.status?.entregue).length, 0);
  const pct = total === 0 ? 0 : Math.round((entregues / total) * 100);
  return { total, entregues, pct };
}

// ─── Item de documento ────────────────────────────────────────────────────────
function DocItem({ doc, onToggle, readonly }: {
  doc: Documento;
  onToggle: (id: string, v: boolean) => Promise<void>;
  readonly?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const entregue = doc.status?.entregue ?? false;

  const handleChange = async (checked: boolean) => {
    if (readonly) return;
    setLoading(true);
    await onToggle(doc.id, checked);
    setLoading(false);
  };

  return (
    <div className={`doc-check-item flex items-start gap-3 ${entregue ? "entregue" : ""}`}>
      <div className="mt-0.5 shrink-0">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
        ) : (
          <Checkbox
            checked={entregue}
            disabled={readonly}
            onCheckedChange={v => handleChange(v === true)}
            className="border-slate-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 disabled:opacity-60"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-snug transition-colors ${entregue ? "text-slate-500 line-through" : "text-slate-200"}`}>
          {doc.nome}
        </p>
        {doc.observacaoDoc && (
          <p className="text-xs text-slate-600 mt-0.5 flex items-start gap-1">
            <Info className="w-3 h-3 mt-0.5 shrink-0 text-blue-500/50" />
            <span>{doc.observacaoDoc}</span>
          </p>
        )}
        {entregue && doc.status?.dataEntrega && (
          <p className="text-xs text-emerald-600 mt-0.5">
            ✓ {new Date(doc.status.dataEntrega).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Log de andamento ─────────────────────────────────────────────────────────
function AndamentoSection({ servidorId, logs: initialLogs }: {
  servidorId: string; logs: AndamentoLog[];
}) {
  const [logs, setLogs]           = useState<AndamentoLog[]>(initialLogs);
  const [dataRegistro, setData]   = useState("");
  const [observacao, setObs]      = useState("");
  const [saving, setSaving]       = useState(false);
  const [deletingId, setDelId]    = useState<string | null>(null);

  const handleAdd = async () => {
    if (!dataRegistro.trim() || !observacao.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/andamento/${servidorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataRegistro, observacao }),
      });
      if (res.ok) {
        const novo = await res.json();
        setLogs(prev => [...prev, novo]);
        setData(""); setObs("");
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (logId: string) => {
    setDelId(logId);
    try {
      await fetch(`/api/andamento/${servidorId}?logId=${logId}`, { method: "DELETE" });
      setLogs(prev => prev.filter(l => l.id !== logId));
    } finally { setDelId(null); }
  };

  return (
    <section className="glass-card p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center shrink-0">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <h2 className="font-semibold text-white text-sm">Andamento do Processo</h2>
        <span className="text-xs text-slate-500 ml-auto shrink-0">
          {logs.length} registro{logs.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Histórico */}
      {logs.length > 0 ? (
        <div className="space-y-4 mb-6">
          {[...logs].reverse().map(log => (
            <div key={log.id} className="log-entry animate-fade-in">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="text-xs font-semibold text-blue-300">{log.dataRegistro}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{log.observacao}</p>
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  disabled={deletingId === log.id}
                  className="shrink-0 p-1.5 rounded text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  {deletingId === log.id
                    ? <Loader2 className="w-3 h-3 animate-spin" />
                    : <Trash2 className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-6 text-slate-600 mb-4">
          <Clock className="w-8 h-8 mb-2 opacity-30" />
          <p className="text-sm">Nenhum registro ainda.</p>
        </div>
      )}

      <Separator className="mb-5 bg-white/5" />

      {/* Formulário */}
      <div className="space-y-3">
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Novo Registro</p>
        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Data</label>
            <input
              type="text"
              placeholder="ex: 18/07/2026"
              value={dataRegistro}
              onChange={e => setData(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Observação</label>
            <Textarea
              placeholder="Descreva o status atual..."
              value={observacao}
              onChange={e => setObs(e.target.value)}
              rows={2}
              className="bg-white/5 border-white/8 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 resize-none"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={saving || !dataRegistro.trim() || !observacao.trim()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-300 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          Salvar Andamento
        </button>
      </div>
    </section>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function ServidorPage() {
  const { id }    = useParams<{ id: string }>();
  const router    = useRouter();
  const [data, setData]   = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/servidor/${id}`);
      if (!res.ok) { router.push("/"); return; }
      setData(await res.json());
    } finally { setLoading(false); }
  }, [id, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggle = async (docId: string, entregue: boolean) => {
    await fetch(`/api/documento/${docId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entregue }),
    });
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        grupos: prev.grupos.map(g => ({
          ...g,
          documentos: g.documentos.map(d =>
            d.id === docId
              ? { ...d, status: { ...(d.status ?? { id: "", documentoId: docId, observacao: null }), entregue, dataEntrega: entregue ? new Date().toISOString() : null } as DocStatus }
              : d
          ),
        })),
      };
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );
  if (!data) return null;

  const { servidor, grupos, logs } = data;
  const { total, entregues, pct }  = calcProgress(grupos);

  const statusLabel = pct === 100 && total > 0 ? "Concluído" : pct >= 50 ? "Em Andamento" : "Pendente";
  const statusClass = pct === 100 && total > 0 ? "status-concluido" : pct >= 50 ? "status-andamento" : "status-pendente";
  const barColor    = pct === 100 && total > 0
    ? "linear-gradient(90deg,#10b981,#34d399)"
    : pct >= 50
    ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
    : "linear-gradient(90deg,#4f8ef7,#818cf8)";

  return (
    <main className="min-h-screen">
      {/* ── Header sticky ──────────────────────────────────────────────────── */}
      <header className="border-b border-white/5 bg-[#09101f]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <p className="text-xs text-slate-400 truncate flex-1 text-center sm:text-left font-medium">
            {servidor.nome}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusClass}`}>
              {statusLabel}
            </span>
            <span className="text-xs font-semibold text-blue-400">{pct}%</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div className="glass-card p-4 sm:p-6 animate-fade-in-up">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <h1 className="text-base sm:text-xl font-bold text-white leading-tight">{servidor.nome}</h1>
                <span className="text-[10px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded font-mono">{servidor.cargo}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{servidor.regraTribunal}</p>
              <div className="flex items-center gap-1.5 text-xs flex-wrap">
                <span className="text-slate-400">{servidor.orgaoOrigem}</span>
                <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
                <span className="text-blue-300 font-semibold">{servidor.orgaoDestino}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold gradient-text">{pct}%</div>
              <div className="text-[10px] text-slate-500">concluído</div>
            </div>
          </div>

          {/* Barra */}
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: barColor }} />
          </div>
          <p className="text-xs text-slate-500 mt-1.5">{entregues} de {total} documentos entregues</p>
        </div>

        {/* ── Grupos de documentos ────────────────────────────────────────── */}
        {grupos.map((grupo, gIdx) => {
          const gEntregues = grupo.documentos.filter(d => d.status?.entregue).length;
          const gTotal     = grupo.documentos.length;
          const gPct       = gTotal === 0 ? 100 : Math.round((gEntregues / gTotal) * 100);
          const isConcluido = grupo.nome.startsWith("✅");

          return (
            <section
              key={grupo.id}
              className={`glass-card overflow-hidden animate-fade-in-up delay-${Math.min((gIdx + 1) * 100, 500)}`}
            >
              {/* Header do grupo */}
              <div className={`px-4 sm:px-5 py-3 flex items-center justify-between gap-2 border-b border-white/5 ${isConcluido ? "bg-emerald-500/5" : "bg-white/[0.02]"}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className={`w-3.5 h-3.5 shrink-0 ${isConcluido ? "text-emerald-500" : "text-blue-400"}`} />
                  <h2 className="text-xs sm:text-sm font-semibold text-white truncate">{grupo.nome}</h2>
                  {grupo.tribunalAlvo && (
                    <span className="hidden sm:inline text-[10px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                      {grupo.tribunalAlvo}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 shrink-0">
                  {gEntregues}/{gTotal} · <span className={gPct === 100 ? "text-emerald-400" : "text-slate-400"}>{gPct}%</span>
                </span>
              </div>

              {/* Documentos */}
              <div className="p-2 sm:p-3 divide-y divide-white/[0.03]">
                {grupo.documentos.map(doc => (
                  <DocItem
                    key={doc.id}
                    doc={doc}
                    onToggle={handleToggle}
                    readonly={isConcluido}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ── Andamento Manual ────────────────────────────────────────────── */}
        <AndamentoSection servidorId={servidor.id} logs={logs} />

      </div>
    </main>
  );
}
