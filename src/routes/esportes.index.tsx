import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { GradeEventos } from "@/components/bet/event-card";
import { CabecalhoSecao, FaixaChips, chipBase } from "@/components/bet/section";
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
    <section className="space-y-4">
      <CabecalhoSecao nivel="h1" titulo="Esportes" descricao={`${lista.length} partidas`} />
      <FaixaChips>
        {modalidades.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setEsporte(e)}
            aria-pressed={esporte === e}
            className={cn(
              chipBase,
              esporte === e &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )}
          >
            {e}
          </button>
        ))}
      </FaixaChips>
      <GradeEventos lista={lista} vazio={`Nenhuma partida disponível em ${esporte} agora.`} />
    </section>
  );
}
