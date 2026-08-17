import { Radio } from "lucide-react";

import type { EventoEsportivo } from "@/data/bet-mock";
import { useBetslip } from "@/lib/betslip";
import { cn } from "@/lib/utils";

export function CardEvento({ ev }: { ev: EventoEsportivo }) {
  const { alternar, ativo } = useBetslip();

  return (
    <article className="rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/30">
      <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className="truncate">
          {ev.pais} · {ev.competicao}
        </span>
        {ev.aoVivo && (
          <span className="ml-auto flex shrink-0 items-center gap-1 text-primary">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            {ev.minuto}
          </span>
        )}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{ev.aoVivo ? "Ao vivo" : ev.inicio}</p>

      <div className="mt-3 space-y-1.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="truncate text-sm">{i === 0 ? ev.casa : ev.fora}</span>
            {ev.placar && (
              <span className="tabular ml-auto grid h-6 w-6 place-items-center rounded bg-secondary text-xs font-semibold">
                {ev.placar[i]}
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3.5 text-[11px] text-muted-foreground">1x2</p>
      <div className="mt-1.5 grid grid-cols-3 gap-2">
        {ev.mercados.map((m) => {
          const selecionado = ativo(`${ev.id}:${m.rotulo}`);
          return (
            <button
              key={m.rotulo}
              type="button"
              onClick={() => alternar(ev, m.rotulo, m.odd)}
              aria-pressed={selecionado}
              className={cn(
                "flex h-10 items-center justify-between rounded-lg px-3 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selecionado ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent",
              )}
            >
              <span className={cn("text-xs", selecionado ? "" : "text-muted-foreground")}>
                {m.rotulo === "X" ? "empate" : m.rotulo}
              </span>
              <span className="tabular font-semibold">{m.odd.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export function GradeEventos({ lista, vazio }: { lista: EventoEsportivo[]; vazio: string }) {
  if (lista.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        {vazio}
      </p>
    );
  }
  return (
    <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
      {lista.map((ev) => (
        <CardEvento key={ev.id} ev={ev} />
      ))}
    </div>
  );
}