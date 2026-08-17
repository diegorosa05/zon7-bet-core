import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { recompensas } from "@/data/wallet-mock";

const TITULO = "Recompensas — Zon7 BET";
const DESCRICAO =
  "Acompanhe cashback, rodadas grátis e apostas grátis liberadas na sua conta Zon7 BET.";

export const Route = createFileRoute("/recompensas")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Recompensas,
});

function Recompensas() {
  return (
    <BetLayout>
      <section className="space-y-4">
        <CabecalhoSecao
          nivel="h1"
          titulo="Recompensas"
          descricao="Benefícios da sua conta e progresso de liberação"
        />
        <LoginGate recurso="Recompensas">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {recompensas.map((r) => (
              <article key={r.id} className="rounded-xl border border-border bg-card p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h2 className="truncate text-sm font-semibold">{r.titulo}</h2>
                  <span className="tabular shrink-0 text-sm font-semibold text-primary">
                    {r.valor}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.descricao}</p>
                <Progress value={r.progresso} className="mt-4 h-2" />
                <p className="mt-2 text-xs text-muted-foreground">{r.progresso}% concluído</p>
                <Button
                  size="sm"
                  className="mt-4 w-full rounded-full"
                  disabled={!r.resgatavel}
                  onClick={() => toast.success(`${r.titulo} resgatada (demonstração)`)}
                >
                  {r.resgatavel ? "Resgatar" : "Em progresso"}
                </Button>
              </article>
            ))}
          </div>
        </LoginGate>
      </section>
    </BetLayout>
  );
}