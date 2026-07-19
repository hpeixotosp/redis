"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FileText, Check, Loader2, Plus, Trash2,
  Calendar, Database, ArrowRight, Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type DocStatus = { id: string; documentoId: string; entregue: boolean; dataEntrega: string | null; observacao: string | null; };
type Documento  = { id: string; nome: string; observacaoDoc: string | null; obrigatorio: boolean; status: DocStatus | null; };
type Grupo      = { id: string; nome: string; tribunalAlvo: string | null; ordem: string; documentos: Documento[]; };
type AndamentoLog = { id: string; servidorId: string; dataRegistro: string; observacao: string; createdAt: string; };
type ServidorResumo = { id: string; nome: string; cargo: string; orgaoOrigem: string; orgaoDestino: string; regraTribunal: string; concluido: boolean; ordem: string; progresso: { total: number; entregues: number }; ultimoAndamento: { dataRegistro: string; observacao: string } | null; };
type ServidorDetalhe = { servidor: { id: string; nome: string; cargo: string; orgaoOrigem: string; orgaoDestino: string; regraTribunal: string; }; grupos: Grupo[]; logs: AndamentoLog[]; };

// ─── Helpers ─────────────────────────────────────────────────────────────────
const AVATAR_COLORS = ["#2563eb","#7c3aed","#059669","#d97706","#db2777"];

function initials(nome: string) {
  return nome.split(" ")[0][0].toUpperCase();
}

function pctColor(pct: number) {
  if (pct === 100) return "#3fb950";
  if (pct >= 50)   return "#d29922";
  return "#58a6ff";
}

function pctLabel(pct: number, total: number) {
  if (total === 0)  return "Sem docs";
  if (pct === 100)  return "Concluído";
  if (pct >= 50)    return "Em andamento";
  return "Pendente";
}

function calcPct(grupos: Grupo[]) {
  const total     = grupos.reduce((a, g) => a + g.documentos.length, 0);
  const entregues = grupos.reduce((a, g) => a + g.documentos.filter(d => d.status?.entregue).length, 0);
  return { total, entregues, pct: total === 0 ? 0 : Math.round((entregues / total) * 100) };
}

// ─── Círculo clicável ─────────────────────────────────────────────────────────
function DocCircle({ entregue, readonly, loading, onClick }: { entregue: boolean; readonly?: boolean; loading?: boolean; onClick: () => void; }) {
  return (
    <button
      className={`doc-circle${entregue ? " done" : ""}${readonly ? " readonly" : ""}`}
      onClick={readonly ? undefined : onClick}
      title={readonly ? undefined : entregue ? "Marcar como pendente" : "Marcar como entregue"}
    >
      {loading
        ? <Loader2 style={{ width: 10, height: 10, color: "white", animation: "spin 1s linear infinite", opacity: 1 }} />
        : <Check />}
    </button>
  );
}

// ─── Item de documento ────────────────────────────────────────────────────────
function DocItem({ doc, readonly, onToggle }: { doc: Documento; readonly?: boolean; onToggle: (id: string, v: boolean) => Promise<void>; }) {
  const [loading, setLoading] = useState(false);
  const entregue = doc.status?.entregue ?? false;

  const handleClick = async () => {
    if (readonly) return;
    setLoading(true);
    await onToggle(doc.id, !entregue);
    setLoading(false);
  };

  return (
    <div className="doc-item">
      <DocCircle entregue={entregue} readonly={readonly} loading={loading} onClick={handleClick} />
      <div className="doc-text">
        <div className={`doc-name${entregue ? " done" : ""}`}>{doc.nome}</div>
        {doc.observacaoDoc && <div className="doc-note">{doc.observacaoDoc}</div>}
        {entregue && doc.status?.dataEntrega && (
          <div className="doc-date">
            Entregue em {new Date(doc.status.dataEntrega).toLocaleDateString("pt-BR")}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Andamento ────────────────────────────────────────────────────────────────
function AndamentoSection({ servidorId, logs: init }: { servidorId: string; logs: AndamentoLog[]; }) {
  // Retorna a data de hoje no formato yyyy-MM-dd
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [logs, setLogs]       = useState(init);
  const [data, setData]       = useState(getTodayString());
  const [obs, setObs]         = useState("");
  const [saving, setSaving]   = useState(false);
  const [delId, setDelId]     = useState<string | null>(null);

  // Formata yyyy-MM-dd para dd/MM/yyyy na exibição
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) {
      const [yyyy, mm, dd] = dateStr.split("-");
      return `${dd}/${mm}/${yyyy}`;
    }
    return dateStr;
  };

  const handleAdd = async () => {
    if (!data.trim() || !obs.trim()) return;
    setSaving(true);
    // Envia no formato dd/MM/yyyy amigável
    const formattedDate = formatDisplayDate(data);
    const res = await fetch(`/api/andamento/${servidorId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataRegistro: formattedDate, observacao: obs }),
    });
    if (res.ok) { 
      const novo = await res.json(); 
      setLogs(p => [...p, novo]); 
      setData(getTodayString()); 
      setObs(""); 
    }
    setSaving(false);
  };

  const handleDel = async (id: string) => {
    setDelId(id);
    await fetch(`/api/andamento/${servidorId}?logId=${id}`, { method: "DELETE" });
    setLogs(p => p.filter(l => l.id !== id));
    setDelId(null);
  };

  return (
    <div className="andamento-card fade-in">
      <div className="andamento-header">
        <h3><Clock size={14} /> Andamento do Processo</h3>
        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{logs.length} registro{logs.length !== 1 ? "s" : ""}</span>
      </div>

      {logs.length > 0 && (
        <div className="log-list">
          {[...logs].reverse().map(log => (
            <div key={log.id} className="log-item">
              <div className="log-dot" />
              <div className="log-info">
                <div className="log-date">{log.dataRegistro}</div>
                <div className="log-obs">{log.observacao}</div>
              </div>
              <button className="log-del" onClick={() => handleDel(log.id)} title="Remover">
                {delId === log.id
                  ? <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                  : <Trash2 size={12} />}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="andamento-form">
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Novo Registro
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Data</label>
            <input 
              type="date" 
              className="form-input" 
              value={data} 
              onChange={e => setData(e.target.value)} 
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Observação</label>
            <textarea className="form-textarea" rows={2} placeholder="Descreva o status atual..." value={obs} onChange={e => setObs(e.target.value)} />
          </div>
        </div>
        <button className="btn-save" onClick={handleAdd} disabled={saving || !data.trim() || !obs.trim()}>
          {saving ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Plus size={13} />}
          Salvar Andamento
        </button>
      </div>
    </div>
  );
}

// ─── Painel de detalhe ────────────────────────────────────────────────────────
function ServidorDetail({ servidorId }: { servidorId: string }) {
  const [data, setData]     = useState<ServidorDetalhe | null>(null);
  const [loading, setLoad]  = useState(true);

  const load = useCallback(async () => {
    setLoad(true);
    const res = await fetch(`/api/servidor/${servidorId}`);
    if (res.ok) setData(await res.json());
    setLoad(false);
  }, [servidorId]);

  useEffect(() => { load(); }, [load]);

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
    <div className="welcome">
      <Loader2 size={22} style={{ color: "var(--primary)", animation: "spin 1s linear infinite" }} />
    </div>
  );

  if (!data) return null;
  const { servidor, grupos, logs } = data;
  const { total, entregues, pct }  = calcPct(grupos);
  const color = pctColor(pct);

  return (
    <div className="content fade-in">
      {/* Header do servidor */}
      <div className="server-header">
        <h1>{servidor.nome}</h1>
        <div className="route">
          <span className="route-badge">{servidor.orgaoOrigem}</span>
          <ArrowRight size={12} style={{ color: "var(--text-dim)" }} />
          <span className="route-badge" style={{ color: "var(--primary)", borderColor: "rgba(88,166,255,0.2)", background: "var(--primary-bg)" }}>
            {servidor.orgaoDestino}
          </span>
          <span className="route-sep">·</span>
          <span style={{ color: "var(--text-muted)" }}>{servidor.regraTribunal}</span>
        </div>
      </div>

      {/* Card de progresso */}
      <div className="progress-card">
        <div className="progress-pct" style={{ color }}>{pct}%</div>
        <div className="progress-info">
          <div className="progress-label">{pctLabel(pct, total)}</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%`, background: color }} />
          </div>
          <div className="progress-stats">
            <strong>{entregues}</strong> de <strong>{total}</strong> documentos entregues
          </div>
        </div>
      </div>

      {/* Grupos de documentos */}
      {grupos.map(grupo => {
        const gEnt   = grupo.documentos.filter(d => d.status?.entregue).length;
        const gTot   = grupo.documentos.length;
        const gPct   = gTot === 0 ? 100 : Math.round((gEnt / gTot) * 100);
        const isDone = grupo.nome.startsWith("✅");
        const isConc = isDone || gPct === 100;

        return (
          <div key={grupo.id} className="group-card fade-in">
            <div className="group-header">
              <div className="group-title">
                <FileText size={13} style={{ color: isConc ? "var(--green)" : "var(--primary)" }} />
                {grupo.nome}
                <span className={`group-tag${isConc ? " done" : ""}`}>
                  {isConc ? "Completo" : grupo.tribunalAlvo ?? ""}
                </span>
              </div>
              <span className="group-progress-text">
                {gEnt}/{gTot} · <span style={{ color: isConc ? "var(--green)" : "var(--text-muted)" }}>{gPct}%</span>
              </span>
            </div>
            <div className="doc-list">
              {grupo.documentos.map(doc => (
                <DocItem key={doc.id} doc={doc} readonly={isDone} onToggle={handleToggle} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Andamento */}
      <AndamentoSection servidorId={servidor.id} logs={logs} />
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [servers, setServers]     = useState<ServidorResumo[]>([]);
  const [selected, setSelected]   = useState<string | null>(null);
  const [loading, setLoading]     = useState(true);
  const [setupLoading, setSetup]  = useState(false);
  const [setupMsg, setSetupMsg]   = useState("");
  const [error, setError]         = useState("");

  const fetchServers = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/servidores");
      if (!res.ok) throw new Error("Erro ao carregar");
      const data = await res.json();
      setServers(data);
      if (data.length > 0 && !selected) setSelected(data[0].id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchServers(); }, []);

  const handleSetup = async () => {
    setSetup(true); setSetupMsg("");
    const res = await fetch("/api/setup", { method: "POST", headers: { Authorization: "Bearer setup-redistribuicao" } });
    const data = await res.json();
    setSetupMsg(res.ok ? "✅ " + data.message : "❌ " + (data.error ?? "Erro"));
    if (res.ok) await fetchServers();
    setSetup(false);
  };

  // Progresso global
  const totalDocs = servers.reduce((a, s) => a + s.progresso.total, 0);
  const totalEnt  = servers.reduce((a, s) => a + s.progresso.entregues, 0);

  return (
    <div className="app-layout">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <FileText size={15} color="white" />
          </div>
          <div>
            <div className="sidebar-logo-text">Redistribuição</div>
            <div className="sidebar-logo-sub">
              {totalDocs > 0 ? `${totalEnt}/${totalDocs} docs` : "Checklist"}
            </div>
          </div>
        </div>

        <div className="sidebar-section-label">Servidores</div>

        <nav className="sidebar-nav">
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
              <Loader2 size={16} style={{ color: "var(--text-dim)", animation: "spin 1s linear infinite" }} />
            </div>
          )}
          {servers.map((srv, idx) => {
            const { total, entregues } = srv.progresso;
            const pct = total === 0 ? 0 : Math.round((entregues / total) * 100);
            const color = pctColor(pct);
            const isActive = selected === srv.id;

            return (
              <div
                key={srv.id}
                className={`server-item${isActive ? " active" : ""}`}
                onClick={() => setSelected(srv.id)}
              >
                <div
                  className="server-avatar"
                  style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                >
                  {initials(srv.nome)}
                </div>
                <div className="server-info">
                  <div className="server-name" title={srv.nome}>{srv.nome.split(" ")[0]}</div>
                  <div className="server-meta">{srv.orgaoDestino}</div>
                </div>
                <span className="server-pct" style={{ color }}>{pct}%</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Panel ───────────────────────────────────────────────────── */}
      <main className="main-panel">
        {/* Banco vazio */}
        {!loading && servers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><Database size={24} /></div>
            <div className="empty-title">Banco de dados não configurado</div>
            <div className="empty-desc">
              Configure a variável <code style={{ background: "var(--surface-2)", padding: "1px 5px", borderRadius: 3, color: "var(--primary)", fontSize: 12 }}>DATABASE_URL</code> nas variáveis de ambiente da Vercel e inicialize o banco.
            </div>
            {error    && <div className="error-box">{error}</div>}
            {setupMsg && <div className={setupMsg.startsWith("✅") ? "success-box" : "error-box"}>{setupMsg}</div>}
            <button className="btn-setup" onClick={handleSetup} disabled={setupLoading}>
              {setupLoading
                ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                : <Database size={14} />}
              {setupLoading ? "Inicializando..." : "Inicializar Banco de Dados"}
            </button>
          </div>
        )}

        {/* Nenhum selecionado */}
        {!loading && servers.length > 0 && !selected && (
          <div className="welcome">
            <h2>Selecione um servidor</h2>
            <p>Escolha um servidor na barra lateral para ver o checklist de documentos.</p>
          </div>
        )}

        {/* Detalhe do servidor */}
        {selected && <ServidorDetail key={selected} servidorId={selected} />}
      </main>
    </div>
  );
}
