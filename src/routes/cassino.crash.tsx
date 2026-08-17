import { createFileRoute } from "@tanstack/react-router";

import { GradeJogos } from "@/components/bet/game-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { meta } from "@/components/shared/page-meta";
import { jogosCrash } from "@/data/bet-extra";

export const Route = createFileRoute("/cassino/crash")({
  head: () =>
    meta(
      "Crash games — Zon7 BET",
      "Aviator, JetX, Spaceman e outros crash games com multiplicadores em tempo real na Zon7 BET.",
    ),
  component: Crash,
});

function Crash() {
  return (
    <section className="space-y-4">
      <CabecalhoSecao
        nivel="h1"
        titulo="Crash games"
        descricao="Multiplicadores em tempo real e cash out manual"
      />
      <GradeJogos lista={jogosCrash} />
    </section>
  );
}
