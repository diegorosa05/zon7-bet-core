import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { GradeEventos } from "@/components/bet/event-card";
import { esportes as modalidades, eventos } from "@/data/bet-mock";
import { cn } from "@/lib/utils";

const TITULO = "Apostas esportivas — futebol, basquete, tênis e eSports";
const DESCRICAO =
  "Odds 1x2 em futebol, basquete, tênis e eSports na Zon7 BET, com partidas ao vivo, placares em tempo real e cupom lateral.";

export const Route = createFileRoute("/esportes/")({
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
  component: EsportesPopulares,
});

function EsportesPopulares() {
  const [esporte, setEsporte] = useState<string>("Populares");
  const lista = useMemo(
    () => (esporte === "Populares" ? eventos : eventos.filter((e) => e.esporte === esporte)),
    [esporte],
  );

  return (
    <section className="mt-6 mb-6">
      <h1 className="text-xl font-semibold">Esportes</h1>
      <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
        {modalidades.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setEsporte(e)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              esporte === e ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {e}
          </button>
        ))}
      </div>
      <GradeEventos lista={lista} vazio={`Nenhuma partida disponível em ${esporte} agora.`} />
    </section>
  );
}