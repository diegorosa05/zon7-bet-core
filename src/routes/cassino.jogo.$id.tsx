import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Maximize2, Play, Star } from "lucide-react";
import { useState } from "react";

import { Carrossel } from "@/components/bet/game-card";
import { meta } from "@/components/shared/page-meta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jogosCrash } from "@/data/bet-extra";
import { jogos } from "@/data/bet-mock";

const catalogo = [...jogos, ...jogosCrash];

export const Route = createFileRoute("/cassino/jogo/$id")({
  loader: ({ params }) => {
    const jogo = catalogo.find((j) => j.id === params.id);
    if (!jogo) throw notFound();
    return { jogo };
  },
  head: ({ loaderData }) =>
    loaderData
      ? meta(
          `${loaderData.jogo.nome} — Zon7 BET`,
          `Jogue ${loaderData.jogo.nome} da ${loaderData.jogo.provedor} com RTP de ${loaderData.jogo.rtp} na Zon7 BET.`,
        )
      : { meta: [{ title: "Jogo indisponível" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="rounded-xl border border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">Jogo não encontrado.</p>
      <Button asChild className="mt-4">
        <Link to="/cassino">Voltar ao cassino</Link>
      </Button>
    </div>
  ),
  component: PaginaJogo,
});

function PaginaJogo() {
  const { jogo } = Route.useLoaderData();
  const [favorito, setFavorito] = useState(false);
  const semelhantes = catalogo.filter((j) => j.id !== jogo.id && j.categoria === jogo.categoria);

  return (
    <div className="space-y-5">
      <Link
        to="/cassino"
        className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative grid aspect-video w-full place-items-center bg-secondary">
          <img
            src={jogo.capa}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <Play className="h-6 w-6" />
            </span>
            <p className="mt-3 text-sm font-semibold">Player do jogo</p>
            <p className="text-xs text-muted-foreground">
              Demonstração — nenhum jogo real é executado
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-border p-4">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold">{jogo.nome}</h1>
            <p className="text-xs text-muted-foreground">
              {jogo.provedor} · RTP {jogo.rtp}
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {jogo.categoria}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            aria-pressed={favorito}
            onClick={() => setFavorito((f) => !f)}
          >
            <Star className={favorito ? "fill-primary text-primary" : ""} />
            {favorito ? "Favoritado" : "Favoritar"}
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 /> Tela cheia
          </Button>
        </div>
      </section>

      <Carrossel titulo="Jogos semelhantes" lista={semelhantes} verTodos="/cassino" />
    </div>
  );
}
