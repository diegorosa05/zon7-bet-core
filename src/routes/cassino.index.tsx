import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { GradeJogos } from "@/components/bet/game-card";
import { Input } from "@/components/ui/input";
import { jogos } from "@/data/bet-mock";

const TITULO = "Cassino online Zon7 BET — slots, originais e mesas ao vivo";
const DESCRICAO =
  "Todo o catálogo do cassino Zon7 BET: jogos originais, slots em destaque e mesas ao vivo com provedores como Pragmatic, PG Soft e Evolution.";

export const Route = createFileRoute("/cassino/")({
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
  component: CassinoTodos,
});

function CassinoTodos() {
  const [busca, setBusca] = useState("");
  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return q ? jogos.filter((j) => `${j.nome} ${j.provedor}`.toLowerCase().includes(q)) : jogos;
  }, [busca]);

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Todos os jogos</h1>
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar jogo ou provedor"
          aria-label="Buscar jogo ou provedor"
          className="h-9 w-full sm:w-72"
        />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{lista.length} jogos disponíveis</p>
      <GradeJogos lista={lista} />
    </section>
  );
}