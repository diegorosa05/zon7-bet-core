import { Link, type LinkProps } from "@tanstack/react-router";
import { Play } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import type { JogoCassino } from "@/data/bet-mock";

export function CardJogo({ jogo, largo = false }: { jogo: JogoCassino; largo?: boolean }) {
  return (
    <Link
      to="/login"
      aria-label={`Jogar ${jogo.nome}`}
      className={`group relative block overflow-hidden rounded-xl border border-border bg-card outline-none transition-all hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring ${
        largo ? "w-full" : "w-[8.75rem] shrink-0 sm:w-[9.5rem]"
      }`}
    >
      <img
        src={jogo.capa}
        alt={jogo.nome}
        width={640}
        height={860}
        loading="lazy"
        className="aspect-[3/4] w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play className="h-4 w-4" />
        </span>
      </span>
      <span className="block truncate px-2.5 pt-2 text-xs font-semibold">{jogo.nome}</span>
      <span className="block truncate px-2.5 pb-2.5 text-[11px] text-muted-foreground">
        {jogo.provedor}
      </span>
    </Link>
  );
}

export function GradeJogos({ lista }: { lista: JogoCassino[] }) {
  if (lista.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Nenhum jogo encontrado.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7">
      {lista.map((j) => (
        <CardJogo key={j.id} jogo={j} largo />
      ))}
    </div>
  );
}

export function Carrossel({
  titulo,
  lista,
  verTodos,
}: {
  titulo: string;
  lista: JogoCassino[];
  verTodos?: LinkProps["to"];
}) {
  return (
    <section className="space-y-3">
      <CabecalhoSecao titulo={titulo} verTodos={verTodos} />
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {lista.map((j) => (
          <CardJogo key={`${titulo}-${j.id}`} jogo={j} />
        ))}
      </div>
    </section>
  );
}
