import { createFileRoute } from "@tanstack/react-router";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { meta } from "@/components/shared/page-meta";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { recompensas } from "@/data/wallet-mock";

export const Route = createFileRoute("/bonus")({
  head: () =>
    meta(
      "Meus bônus — saldo bônus e rollover | Zon7 BET",
      "Acompanhe bônus ativos, progresso de rollover, rodadas grátis e apostas grátis disponíveis na sua conta Zon7 BET.",
    ),
  component: Bonus,
});

function Bonus() {
  return (
    <BetLayout>
      <div className="space-y-5">
        <CabecalhoSecao nivel="h1" titulo="Meus bônus" descricao="Bônus ativos e progresso de rollover" />
        <LoginGate recurso="Meus bônus">
          <div className="grid gap-3 lg:grid-cols-2">
            {recompensas.map((r) => (
              <article key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold">{r.titulo}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{r.descricao}</p>
                  </div>
                  <span className="tabular ml-auto shrink-0 text-sm font-semibold text-primary">
                    {r.valor}
                  </span>
                </div>
                <Progress value={r.progresso} className="mt-4" />
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{r.progresso}% do rollover</span>
                  <Button size="sm" disabled={!r.resgatavel} className="ml-auto rounded-full px-5">
                    {r.resgatavel ? "Resgatar" : "Em progresso"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </LoginGate>
      </div>
    </BetLayout>
  );
}
