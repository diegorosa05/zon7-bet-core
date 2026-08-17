import { Link, createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import { meta } from "@/components/shared/page-meta";
import { jogos } from "@/data/bet-mock";
import { mesasAoVivo } from "@/data/bet-extra";
import { GradeJogos } from "@/components/bet/game-card";

export const Route = createFileRoute("/cassino/ao-vivo")({
  head: () =>
    meta(
      "Cassino ao vivo — mesas com dealers reais | Zon7 BET",
      "Roleta, blackjack e baccarat ao vivo com dealers, limites por mesa e transmissão em tempo real na Zon7 BET.",
    ),
  component: AoVivo,
});

function AoVivo() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <CabecalhoSecao
          nivel="h1"
          titulo="Cassino ao vivo"
          descricao="Mesas com dealers reais, limites e jogadores em tempo real"
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {mesasAoVivo.map((m) => (
            <Link
              key={m.id}
              to="/cassino/jogo/$id"
              params={{ id: "g-11" }}
              className="group overflow-hidden rounded-xl border border-border bg-card outline-none transition-all hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative">
                <img
                  src={m.capa}
                  alt={`Mesa ${m.nome} com dealer ${m.dealer}`}
                  width={640}
                  height={420}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-destructive">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" /> LIVE
                </span>
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate text-sm font-semibold">{m.nome}</p>
                <p className="text-xs text-muted-foreground">Dealer {m.dealer}</p>
                <p className="tabular text-xs text-muted-foreground">{m.limites}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Users className="h-3.5 w-3.5" /> {m.jogadores} jogando
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <CabecalhoSecao titulo="Outras mesas" descricao="Roleta, blackjack e game shows" />
        <GradeJogos lista={jogos.filter((j) => j.categoria === "Ao vivo")} />
      </section>
    </div>
  );
}
