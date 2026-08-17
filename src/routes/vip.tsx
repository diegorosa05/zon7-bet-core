import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { meta } from "@/components/shared/page-meta";
import { Progress } from "@/components/ui/progress";
import { nivelAtual, niveisVip } from "@/data/bet-extra";
import { formatarMoeda } from "@/lib/format";

export const Route = createFileRoute("/vip")({
  head: () =>
    meta(
      "Clube VIP — níveis e benefícios | Zon7 BET",
      "Bronze a Black: acompanhe seu nível VIP, cashback progressivo, saques prioritários e gerente de conta na Zon7 BET.",
    ),
  component: Vip,
});

function Vip() {
  return (
    <BetLayout>
      <div className="space-y-6">
        <CabecalhoSecao
          nivel="h1"
          titulo="Clube VIP"
          descricao="Quanto mais você joga, melhores os benefícios"
        />

        <section className="rounded-xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Crown className="h-4 w-4 text-primary" /> Nível atual: {nivelAtual.nome}
          </p>
          <Progress value={nivelAtual.progresso} className="mt-4" />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{nivelAtual.progresso}% concluído</span>
            <span>
              {formatarMoeda(nivelAtual.faltam)} para {nivelAtual.proximo}
            </span>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {niveisVip.map((n) => (
            <article
              key={n.nome}
              className={`rounded-xl border p-4 ${
                n.nome === nivelAtual.nome ? "border-primary bg-card" : "border-border bg-card"
              }`}
            >
              <h2 className="text-sm font-semibold">{n.nome}</h2>
              <p className="tabular mt-1 text-xs text-muted-foreground">
                Requisito: {n.requisito}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{n.beneficio}</p>
            </article>
          ))}
        </section>
      </div>
    </BetLayout>
  );
}
