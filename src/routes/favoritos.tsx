import { createFileRoute } from "@tanstack/react-router";

import { GradeJogos } from "@/components/bet/game-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { meta } from "@/components/shared/page-meta";
import { jogosCrash } from "@/data/bet-extra";
import { jogos } from "@/data/bet-mock";

export const Route = createFileRoute("/favoritos")({
  head: () =>
    meta(
      "Favoritos — seus jogos salvos | Zon7 BET",
      "Acesse rapidamente os slots, originais e crash games que você marcou como favoritos na Zon7 BET.",
    ),
  component: Favoritos,
});

function Favoritos() {
  const favoritos = [...jogos.slice(0, 4), ...jogosCrash.slice(0, 2)];
  return (
    <BetLayout>
      <div className="space-y-5">
        <CabecalhoSecao nivel="h1" titulo="Favoritos" descricao="Jogos salvos para acesso rápido" />
        <LoginGate recurso="Favoritos">
          <GradeJogos lista={favoritos} />
        </LoginGate>
      </div>
    </BetLayout>
  );
}
