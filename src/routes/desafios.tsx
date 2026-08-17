import { createFileRoute } from "@tanstack/react-router";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { desafios } from "@/data/wallet-mock";

const TITULO = "Desafios — Zon7 BET";
const DESCRICAO = "Missões semanais de cassino e esportes com prêmios em bônus e apostas grátis.";

export const Route = createFileRoute("/desafios")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Desafios,
});

function Desafios() {
  return (
    <BetLayout>
      <section className="space-y-4">
        <CabecalhoSecao
          nivel="h1"
          titulo="Desafios"
          descricao="Complete missões e libere prêmios"
        />
        <LoginGate recurso="Desafios">
          <div className="grid gap-3 sm:grid-cols-2">
            {desafios.map((d) => {
              const pct = Math.round((d.atual / d.meta) * 100);
              const concluido = d.atual >= d.meta;
              return (
                <article key={d.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <h2 className="truncate text-sm font-semibold">{d.titulo}</h2>
                    <Badge variant={concluido ? "default" : "secondary"} className="shrink-0">
                      {concluido ? "Concluído" : d.prazo}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{d.descricao}</p>
                  <Progress value={pct} className="mt-4 h-2" />
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="tabular">
                      {d.atual}/{d.meta}
                    </span>
                    <span className="text-primary">{d.premio}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </LoginGate>
      </section>
    </BetLayout>
  );
}