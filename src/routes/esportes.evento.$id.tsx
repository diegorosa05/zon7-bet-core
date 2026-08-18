import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Radio } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import { meta } from "@/components/shared/page-meta";
import { Button } from "@/components/ui/button";
import { mercadosExtras } from "@/data/bet-extra";
import { eventos } from "@/data/bet-mock";
import { useBetslip } from "@/lib/betslip";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/esportes/evento/$id")({
  loader: ({ params }) => {
    const ev = eventos.find((e) => e.id === params.id);
    if (!ev) throw notFound();
    return { ev };
  },
  head: ({ loaderData }) =>
    loaderData
      ? meta(
          `${loaderData.ev.casa} x ${loaderData.ev.fora} — odds e mercados | Zon7 BET`,
          `Todos os mercados de ${loaderData.ev.casa} x ${loaderData.ev.fora} pelo ${loaderData.ev.competicao}: 1x2, total de gols, ambas marcam, handicap, escanteios e cartões.`,
        )
      : { meta: [{ title: "Evento indisponível" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="rounded-xl border border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">Evento não encontrado.</p>
      <Button asChild className="mt-4">
        <Link to="/esportes">Voltar aos esportes</Link>
      </Button>
    </div>
  ),
  component: PaginaEvento,
});

function PaginaEvento() {
  const { ev } = Route.useLoaderData();
  const { alternar, ativo } = useBetslip();

  return (
    <div className="space-y-5">
      <Link
        to="/esportes"
        className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <section className="rounded-xl border border-border bg-card p-5">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          {ev.pais} · {ev.competicao}
          {ev.aoVivo && (
            <span className="flex items-center gap-1 text-primary">
              <Radio className="h-3.5 w-3.5 animate-pulse" /> Ao vivo {ev.minuto}
            </span>
          )}
        </p>
        <div className="mt-4 flex items-center justify-center gap-5 sm:gap-10">
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <EscudoTime nome={ev.casa} tamanho="lg" />
            <h1 className="text-sm font-semibold sm:text-base">{ev.casa}</h1>
          </div>
          <div className="text-center">
            {ev.placar ? (
              <p className="tabular text-3xl font-semibold">
                {ev.placar[0]} <span className="text-muted-foreground">—</span> {ev.placar[1]}
              </p>
            ) : (
              <p className="text-2xl text-muted-foreground">x</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {ev.aoVivo ? `Em andamento ${ev.minuto ?? ""}` : ev.inicio}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 text-center">
            <EscudoTime nome={ev.fora} tamanho="lg" />
            <p className="text-sm font-semibold sm:text-base">{ev.fora}</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <CabecalhoSecao titulo="Resultado final (1x2)" />
        <div className="grid gap-2 sm:grid-cols-3">
          {ev.mercados.map((m) => {
            const sel = ativo(`${ev.id}:${m.rotulo}`);
            return (
              <button
                key={m.rotulo}
                type="button"
                onClick={() => alternar(ev, m.rotulo, m.odd)}
                aria-pressed={sel}
                className={cn(
                  "flex h-12 items-center justify-between rounded-lg px-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  sel ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent",
                )}
              >
                <span className={sel ? "" : "text-muted-foreground"}>
                  {m.rotulo === "X" ? "Empate" : m.rotulo}
                </span>
                <span className="tabular font-semibold">{m.odd.toFixed(2)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {mercadosExtras.map((grupo) => (
        <section key={grupo.grupo} className="space-y-3">
          <CabecalhoSecao titulo={grupo.grupo} />
          <div className="grid gap-2 sm:grid-cols-3">
            {grupo.opcoes.map((o) => {
              const chave = `${grupo.grupo} — ${o.rotulo}`;
              const sel = ativo(`${ev.id}:${chave}`);
              return (
                <button
                  key={o.rotulo}
                  type="button"
                  onClick={() => alternar(ev, chave, o.odd)}
                  aria-pressed={sel}
                  className={cn(
                    "flex h-11 items-center justify-between rounded-lg px-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    sel ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent",
                  )}
                >
                  <span className={sel ? "" : "text-muted-foreground"}>{o.rotulo}</span>
                  <span className="tabular font-semibold">{o.odd.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
