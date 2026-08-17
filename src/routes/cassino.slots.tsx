import { createFileRoute } from "@tanstack/react-router";

import { GradeJogos } from "@/components/bet/game-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { jogos } from "@/data/bet-mock";

const TITULO = "Slots em destaque — Zon7 BET";
const DESCRICAO = "Os slots mais jogados da Zon7 BET, com provedores como Pragmatic e PG Soft e RTP informado.";

export const Route = createFileRoute("/cassino/slots")({
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
  component: Slots,
});

function Slots() {
  return (
    <section className="space-y-4">
      <CabecalhoSecao nivel="h1" titulo="Slots em destaque" descricao="Seleção de slots populares com RTP informado" />
      <GradeJogos lista={jogos.filter((j) => j.categoria === "Slots")} />
    </section>
  );
}