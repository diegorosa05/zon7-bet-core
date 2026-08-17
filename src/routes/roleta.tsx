import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { Button } from "@/components/ui/button";
import { premiosRoleta } from "@/data/wallet-mock";

const TITULO = "Roleta Grátis — Zon7 BET";
const DESCRICAO = "Gire a roleta diária da Zon7 BET e concorra a bônus e rodadas grátis.";

export const Route = createFileRoute("/roleta")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Roleta,
});

function Roleta() {
  const [girando, setGirando] = useState(false);
  const [premio, setPremio] = useState<string | null>(null);
  const [angulo, setAngulo] = useState(0);

  function girar() {
    if (girando) return;
    setGirando(true);
    setPremio(null);
    const indice = Math.floor(Math.random() * premiosRoleta.length);
    const setor = 360 / premiosRoleta.length;
    setAngulo((a) => a + 360 * 5 + (360 - indice * setor));
    setTimeout(() => {
      setGirando(false);
      setPremio(premiosRoleta[indice]!);
      toast.success(`Resultado: ${premiosRoleta[indice]} (demonstração)`);
    }, 3200);
  }

  return (
    <BetLayout>
      <section className="space-y-4">
        <CabecalhoSecao
          nivel="h1"
          titulo="Roleta grátis"
          descricao="Um giro por dia, sem depósito"
        />
        <LoginGate recurso="Roleta grátis">
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <div className="mx-auto w-full max-w-[18rem]">
              <div className="relative aspect-square">
                <div
                  className="h-full w-full rounded-full border-4 border-primary/60 transition-transform duration-[3000ms] ease-out"
                  style={{
                    transform: `rotate(${angulo}deg)`,
                    background:
                      "conic-gradient(var(--color-primary) 0 12.5%, var(--color-secondary) 0 25%, var(--color-primary) 0 37.5%, var(--color-secondary) 0 50%, var(--color-primary) 0 62.5%, var(--color-secondary) 0 75%, var(--color-primary) 0 87.5%, var(--color-secondary) 0 100%)",
                  }}
                />
                <span className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background text-xs font-semibold">
                  Zon7
                </span>
                <span
                  aria-hidden
                  className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-[14px] border-x-transparent border-t-primary"
                />
              </div>
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold">
                {premio ? `Você ganhou: ${premio}` : "Gire e descubra seu prêmio"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prêmios possíveis: {premiosRoleta.join(", ")}.
              </p>
              <Button
                className="mt-5 rounded-full px-8 font-semibold"
                onClick={girar}
                disabled={girando}
              >
                {girando ? "Girando…" : "Girar roleta"}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Ambiente de demonstração — nenhum prêmio real é creditado.
              </p>
            </div>
          </div>
        </LoginGate>
      </section>
    </BetLayout>
  );
}