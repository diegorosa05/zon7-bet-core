import { createFileRoute } from "@tanstack/react-router";

import { GradeJogos } from "@/components/bet/game-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { jogos } from "@/data/bet-mock";

const TITULO = "Cassino ao vivo — roleta e blackjack com dealer real";
const DESCRICAO =
  "Mesas ao vivo da Zon7 BET: roleta brasileira, roleta relâmpago e blackjack VIP com dealers reais.";

export const Route = createFileRoute("/cassino/ao-vivo")({
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
  component: AoVivo,
});

function AoVivo() {
  return (
    <section className="space-y-4">
      <CabecalhoSecao
        nivel="h1"
        titulo="Cassino ao vivo"
        descricao="Mesas com dealer real transmitidas em tempo real"
      />
      <GradeJogos lista={jogos.filter((j) => j.categoria === "Ao vivo")} />
    </section>
  );
}
