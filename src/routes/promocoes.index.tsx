import { Link, createFileRoute } from "@tanstack/react-router";

import bannerCassino from "@/assets/banner-cassino.jpg";
import bannerCrash from "@/assets/banner-crash.jpg";
import bannerEsportes from "@/assets/banner-esportes.jpg";
import { CabecalhoSecao } from "@/components/bet/section";
import { meta } from "@/components/shared/page-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { promocoes } from "@/data/wallet-mock";

const capas = [bannerEsportes, bannerCassino, bannerCrash];

export const Route = createFileRoute("/promocoes/")({
  head: () =>
    meta(
      "Promoções e bônus — Zon7 BET",
      "Bônus de boas-vindas de 100%, rodadas grátis, super odds no Brasileirão e cashback semanal na Zon7 BET.",
    ),
  component: Promocoes,
});

function Promocoes() {
  return (
    <section className="space-y-4">
      <CabecalhoSecao
        nivel="h1"
        titulo="Promoções"
        descricao="Ofertas ativas do ambiente de demonstração"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {promocoes.map((p, i) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
          >
            <img
              src={capas[i % capas.length]}
              alt=""
              width={1200}
              height={500}
              loading="lazy"
              className="h-40 w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <Badge variant="secondary">{p.categoria}</Badge>
              <h2 className="text-base font-semibold">{p.titulo}</h2>
              <p className="text-sm text-muted-foreground">{p.chamada}</p>
              <Button asChild size="sm" className="rounded-full px-5">
                <Link to="/promocoes/$id" params={{ id: p.id }}>
                  Ver promoção
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
