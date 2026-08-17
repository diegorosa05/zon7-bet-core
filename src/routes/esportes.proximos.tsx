import { createFileRoute } from "@tanstack/react-router";

import { GradeEventos } from "@/components/bet/event-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { eventos } from "@/data/bet-mock";

const TITULO = "Próximos jogos — agenda de partidas da Zon7 BET";
const DESCRICAO =
  "Veja a agenda das próximas partidas de futebol, basquete, tênis e eSports e monte seu cupom antes do apito.";

export const Route = createFileRoute("/esportes/proximos")({
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
  component: EsportesProximos,
});

function EsportesProximos() {
  const lista = eventos.filter((e) => !e.aoVivo);
  return (
    <section className="space-y-4">
      <CabecalhoSecao
        nivel="h1"
        titulo="Próximos jogos"
        descricao="Partidas que ainda vão começar"
      />
      <GradeEventos lista={lista} vazio="Nenhuma partida agendada." />
    </section>
  );
}
