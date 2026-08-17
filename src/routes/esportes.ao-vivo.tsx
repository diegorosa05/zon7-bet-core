import { createFileRoute } from "@tanstack/react-router";

import { GradeEventos } from "@/components/bet/event-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { eventos } from "@/data/bet-mock";

const TITULO = "Jogos ao vivo — odds em tempo real na Zon7 BET";
const DESCRICAO =
  "Acompanhe as partidas em andamento com placar, minuto e odds 1x2 atualizadas para apostar ao vivo na Zon7 BET.";

export const Route = createFileRoute("/esportes/ao-vivo")({
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
  component: EsportesAoVivo,
});

function EsportesAoVivo() {
  const lista = eventos.filter((e) => e.aoVivo);
  return (
    <section className="space-y-4">
      <CabecalhoSecao nivel="h1" titulo="Jogos ao vivo" descricao={`${lista.length} partidas em andamento agora`} />
      <GradeEventos lista={lista} vazio="Nenhuma partida ao vivo no momento." />
    </section>
  );
}