import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowUpFromLine, Receipt } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import { Button } from "@/components/ui/button";
import { carteira, transacoes } from "@/data/wallet-mock";
import { formatarData, formatarMoeda } from "@/lib/format";

const TITULO = "Carteira — Zon7 BET";
const DESCRICAO = "Saldo, bônus, depósitos e saques da sua conta Zon7 BET.";

export const Route = createFileRoute("/carteira/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CarteiraResumo,
});

const saldos = [
  { rotulo: "Saldo disponível", valor: carteira.saldoReal },
  { rotulo: "Saldo bônus", valor: carteira.saldoBonus },
  { rotulo: "Saques em análise", valor: carteira.emAnalise },
];

function CarteiraResumo() {
  return (
    <section className="space-y-5">
      <CabecalhoSecao nivel="h1" titulo="Carteira" descricao="Resumo financeiro da conta" />

      <div className="grid gap-3 sm:grid-cols-3">
        {saldos.map((s) => (
          <div key={s.rotulo} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.rotulo}</p>
            <p className="tabular mt-1 text-xl font-semibold">{formatarMoeda(s.valor)}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button asChild className="h-12 rounded-xl font-semibold">
          <Link to="/carteira/deposito">
            <ArrowDownToLine className="h-4 w-4" /> Depositar
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-xl font-semibold">
          <Link to="/carteira/saque">
            <ArrowUpFromLine className="h-4 w-4" /> Sacar
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-xl font-semibold">
          <Link to="/carteira/transacoes">
            <Receipt className="h-4 w-4" /> Transações
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        <CabecalhoSecao titulo="Últimas movimentações" verTodos="/carteira/transacoes" />
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {transacoes.slice(0, 5).map((t) => (
            <li
              key={t.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{t.tipo}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.metodo} · {formatarData(t.data)}
                </p>
              </div>
              <span
                className={`tabular shrink-0 text-sm font-semibold ${t.valor >= 0 ? "text-primary" : "text-foreground"}`}
              >
                {formatarMoeda(t.valor)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}