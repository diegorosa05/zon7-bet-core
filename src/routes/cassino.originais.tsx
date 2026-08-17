import { createFileRoute } from "@tanstack/react-router";

import { GradeJogos } from "@/components/bet/game-card";
import { jogos } from "@/data/bet-mock";

const TITULO = "Originais da Zon7 — Crash, Mines, Double e Plinko";
const DESCRICAO =
  "Jogos originais da Zon7 BET com RTP publicado e resultado comprovadamente justo: Crash, Mines, Double e Plinko.";

export const Route = createFileRoute("/cassino/originais")({
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
  component: Originais,
});

function Originais() {
  const lista = jogos.filter((j) => j.categoria === "Originais");
  return (
    <section className="mt-6">
      <h1 className="text-xl font-semibold">Originais da Zon7</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Jogos próprios com RTP publicado e verificação de resultado.
      </p>
      <GradeJogos lista={lista} />
    </section>
  );
}