import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";

import bannerCassino from "@/assets/banner-cassino.jpg";
import { meta } from "@/components/shared/page-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { promocoes } from "@/data/wallet-mock";

export const Route = createFileRoute("/promocoes/$id")({
  loader: ({ params }) => {
    const promo = promocoes.find((p) => p.id === params.id);
    if (!promo) throw notFound();
    return { promo };
  },
  head: ({ loaderData }) =>
    loaderData
      ? meta(`${loaderData.promo.titulo} — Zon7 BET`, loaderData.promo.chamada)
      : { meta: [{ title: "Promoção indisponível" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="rounded-xl border border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">Promoção não encontrada.</p>
      <Button asChild className="mt-4">
        <Link to="/promocoes">Ver promoções</Link>
      </Button>
    </div>
  ),
  component: Detalhe,
});

function Detalhe() {
  const { promo } = Route.useLoaderData();

  return (
    <article className="space-y-5">
      <Link
        to="/promocoes"
        className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-4 w-4" /> Promoções
      </Link>

      <div className="overflow-hidden rounded-xl border border-border">
        <img
          src={bannerCassino}
          alt=""
          width={1600}
          height={500}
          className="h-48 w-full object-cover sm:h-60"
        />
      </div>

      <header className="space-y-2">
        <Badge variant="secondary">{promo.categoria}</Badge>
        <h1 className="text-2xl font-semibold">{promo.titulo}</h1>
        <p className="text-sm text-muted-foreground">{promo.chamada}</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            titulo: "Como participar",
            itens: [
              "Crie sua conta e conclua a verificação.",
              "Faça um depósito via Pix dentro do período da oferta.",
              "O bônus é creditado automaticamente em até 5 minutos.",
            ],
          },
          {
            titulo: "Requisitos",
            itens: [
              "Depósito mínimo de R$ 50.",
              "Apostas qualificadas em odds 1.60 ou superiores.",
              "Uma participação por CPF, IP e método de pagamento.",
            ],
          },
          {
            titulo: "Termos da promoção",
            itens: [promo.regra, "Válido apenas para maiores de 18 anos.", "Ambiente de demonstração — sem valores reais."],
          },
        ].map((bloco) => (
          <div key={bloco.titulo} className="rounded-xl border border-border bg-card p-4">
            <h2 className="text-sm font-semibold">{bloco.titulo}</h2>
            <ul className="mt-3 space-y-2">
              {bloco.itens.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Button asChild className="rounded-full px-7 font-semibold">
        <Link to="/carteira/deposito">Participar agora</Link>
      </Button>
    </article>
  );
}
