import { createFileRoute } from "@tanstack/react-router";

import { GradeEventos } from "@/components/bet/event-card";
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
    <section className="mt-6 mb-6">
      <h1 className="text-xl font-semibold">Jogos ao vivo</h1>
      <p className="mt-1 text-sm text-muted-foreground">{lista.length} partidas em andamento agora.</p>
      <GradeEventos lista={lista} vazio="Nenhuma partida ao vivo no momento." />
    </section>
  );
}