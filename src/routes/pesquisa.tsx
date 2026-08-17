import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { GradeEventos } from "@/components/bet/event-card";
import { Betslip } from "@/components/bet/betslip";
import { GradeJogos } from "@/components/bet/game-card";
import { BetLayout } from "@/components/layouts/bet-layout";
import { Input } from "@/components/ui/input";
import { eventos, jogos } from "@/data/bet-mock";

const TITULO = "Pesquisa — encontre jogos e partidas na Zon7 BET";
const DESCRICAO = "Busque por jogos de cassino, provedores, times e competições em toda a plataforma Zon7 BET.";

export const Route = createFileRoute("/pesquisa")({
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
  component: Pesquisa,
});

function Pesquisa() {
  const [q, setQ] = useState("");
  const termo = q.trim().toLowerCase();

  const jogosFiltrados = useMemo(
    () => (termo ? jogos.filter((j) => `${j.nome} ${j.provedor} ${j.categoria}`.toLowerCase().includes(termo)) : []),
    [termo],
  );
  const eventosFiltrados = useMemo(
    () =>
      termo
        ? eventos.filter((e) => `${e.casa} ${e.fora} ${e.competicao} ${e.esporte} ${e.pais}`.toLowerCase().includes(termo))
        : [],
    [termo],
  );

  const sugestoes = ["Crash", "Mines", "Roleta", "Benfica", "eSports", "Evolution"];

  return (
    <BetLayout aside={<Betslip />}>
      <section className="space-y-4">
        <h1 className="text-lg font-semibold sm:text-xl">Pesquisa</h1>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar jogos, provedores, times ou competições"
            aria-label="Buscar na plataforma"
            className="h-11 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {sugestoes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className="rounded-full bg-card px-3 py-1.5 text-xs text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {s}
            </button>
          ))}
        </div>

        {!termo ? (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Digite para buscar em todo o catálogo de jogos e partidas.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-[15px] font-semibold">Jogos ({jogosFiltrados.length})</h2>
              <GradeJogos lista={jogosFiltrados} />
            </div>
            <div className="space-y-3">
              <h2 className="text-[15px] font-semibold">Partidas ({eventosFiltrados.length})</h2>
              <GradeEventos lista={eventosFiltrados} vazio="Nenhuma partida encontrada para essa busca." />
            </div>
          </div>
        )}
      </section>
    </BetLayout>
  );
}