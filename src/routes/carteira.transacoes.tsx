import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CabecalhoSecao, FaixaChips, chipAtivo, chipBase } from "@/components/bet/section";
import { transacoes, type Transacao } from "@/data/wallet-mock";
import { formatarData, formatarMoeda } from "@/lib/format";
import { cn } from "@/lib/utils";

const TITULO = "Transações — Zon7 BET";
const DESCRICAO = "Extrato de depósitos, saques, bônus e apostas da conta Zon7 BET.";

export const Route = createFileRoute("/carteira/transacoes")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Transacoes,
});

const filtros = ["Todos", "Depósito", "Saque", "Bônus", "Aposta", "Prêmio"] as const;

function Transacoes() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const lista = transacoes.filter((t) => filtro === "Todos" || t.tipo === filtro);

  return (
    <section className="space-y-4">
      <CabecalhoSecao nivel="h1" titulo="Transações" descricao="Extrato completo da carteira" />

      <FaixaChips>
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={cn(chipBase, filtro === f && chipAtivo)}
          >
            {f}
          </button>
        ))}
      </FaixaChips>

      {lista.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nenhuma transação neste filtro.
        </p>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {lista.map((t) => (
            <li key={t.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {t.tipo} · <span className="text-muted-foreground">{t.id}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.metodo} · {formatarData(t.data)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    "tabular text-sm font-semibold",
                    t.valor >= 0 ? "text-primary" : "text-foreground",
                  )}
                >
                  {formatarMoeda(t.valor)}
                </p>
                <p className={cn("text-xs", corStatus(t.status))}>{t.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function corStatus(status: Transacao["status"]) {
  if (status === "Concluído") return "text-muted-foreground";
  if (status === "Pendente") return "text-secondary";
  return "text-destructive";
}