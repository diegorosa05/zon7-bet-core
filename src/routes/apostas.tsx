import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FaixaChips, chipAtivo, chipBase, CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { meta } from "@/components/shared/page-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apostas } from "@/data/bet-extra";
import { formatarData, formatarMoeda } from "@/lib/format";
import { cn } from "@/lib/utils";

const abas = ["Abertas", "Encerradas", "Cash out"] as const;

export const Route = createFileRoute("/apostas")({
  head: () =>
    meta(
      "Minhas apostas — abertas, encerradas e cash out | Zon7 BET",
      "Acompanhe suas apostas abertas, resultados encerrados, retorno potencial e histórico de cash out na Zon7 BET.",
    ),
  component: MinhasApostas,
});

function MinhasApostas() {
  const [aba, setAba] = useState<(typeof abas)[number]>("Abertas");

  const lista = apostas.filter((a) =>
    aba === "Abertas"
      ? a.status === "Aberta"
      : aba === "Cash out"
        ? a.status === "Cash out"
        : a.status === "Ganha" || a.status === "Perdida",
  );

  return (
    <BetLayout>
      <div className="space-y-5">
        <CabecalhoSecao nivel="h1" titulo="Minhas apostas" descricao="Bilhetes do ambiente de demonstração" />
        <LoginGate recurso="Minhas apostas">
          <div className="space-y-4">
            <FaixaChips>
              {abas.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAba(a)}
                  aria-pressed={aba === a}
                  className={cn(chipBase, aba === a && chipAtivo)}
                >
                  {a}
                </button>
              ))}
            </FaixaChips>

            {lista.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                Nenhuma aposta nesta aba.
              </p>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {lista.map((a) => (
                  <article key={a.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{a.evento}</p>
                        <p className="truncate text-xs text-muted-foreground">{a.selecao}</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto shrink-0">
                        {a.status}
                      </Badge>
                    </div>
                    <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      {[
                        ["Odd", a.odd.toFixed(2)],
                        ["Apostado", formatarMoeda(a.valor)],
                        ["Retorno", formatarMoeda(a.valor * a.odd)],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-lg bg-secondary p-2.5">
                          <dt className="text-muted-foreground">{k}</dt>
                          <dd className="tabular mt-0.5 text-sm font-semibold">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-3 flex items-center gap-3">
                      <p className="text-[11px] text-muted-foreground">{formatarData(a.data)}</p>
                      {a.status === "Aberta" && (
                        <Button size="sm" variant="outline" className="ml-auto rounded-full">
                          Cash out {formatarMoeda(a.valor * a.odd * 0.82)}
                        </Button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </LoginGate>
      </div>
    </BetLayout>
  );
}
