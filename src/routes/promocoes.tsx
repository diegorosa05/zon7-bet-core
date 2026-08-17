import { createFileRoute } from "@tanstack/react-router";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { promocoes } from "@/data/wallet-mock";

const TITULO = "Promoções — Zon7 BET";
const DESCRICAO =
  "Bônus de boas-vindas, rodadas grátis, super odds e cashback disponíveis na Zon7 BET.";

export const Route = createFileRoute("/promocoes")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Promocoes,
});

function Promocoes() {
  return (
    <BetLayout>
      <section className="space-y-4">
        <CabecalhoSecao
          nivel="h1"
          titulo="Promoções"
          descricao="Ofertas ativas do ambiente de demonstração"
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {promocoes.map((p) => (
            <article
              key={p.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4"
            >
              <Badge variant="secondary" className="w-fit">
                {p.categoria}
              </Badge>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold">{p.titulo}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.chamada}</p>
              </div>
              <p className="text-xs text-muted-foreground">{p.regra}</p>
              <Button size="sm" className="mt-auto w-fit rounded-full px-5">
                Participar
              </Button>
            </article>
          ))}
        </div>
      </section>
    </BetLayout>
  );
}