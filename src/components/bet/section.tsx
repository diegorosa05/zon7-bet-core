import { Link, type LinkProps } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Base visual de todos os chips/pílulas de navegação da plataforma. */
export const chipBase =
  "inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-card px-4 text-[13px] font-medium text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";

export const chipAtivo = "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground";

export function FaixaChips({ children }: { children: ReactNode }) {
  return <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">{children}</div>;
}

export function NavChips({
  itens,
}: {
  itens: readonly { rotulo: string; to: NonNullable<LinkProps["to"]>; exact?: boolean }[];
}) {
  return (
    <FaixaChips>
      {itens.map((i) => (
        <Link
          key={`${i.to}-${i.rotulo}`}
          to={i.to}
          activeOptions={{ exact: i.exact ?? false }}
          className={cn(chipBase, "data-[status=active]:bg-primary data-[status=active]:text-primary-foreground")}
        >
          {i.rotulo}
        </Link>
      ))}
    </FaixaChips>
  );
}

/** Cabeçalho padrão de seção: título à esquerda, "ver todos" opcional à direita. */
export function CabecalhoSecao({
  titulo,
  descricao,
  verTodos,
  acao,
  nivel = "h2",
}: {
  titulo: string;
  descricao?: string;
  verTodos?: LinkProps["to"];
  acao?: ReactNode;
  nivel?: "h1" | "h2";
}) {
  const Tag = nivel;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="min-w-0">
        <Tag className={cn("truncate font-semibold", nivel === "h1" ? "text-lg sm:text-xl" : "text-[15px]")}>
          {titulo}
        </Tag>
        {descricao && <p className="mt-0.5 truncate text-xs text-muted-foreground">{descricao}</p>}
      </div>
      {acao}
      {verTodos && (
        <Link
          to={verTodos}
          className="inline-flex items-center rounded-sm text-xs text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          Ver todos <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
