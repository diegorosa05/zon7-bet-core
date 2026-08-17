import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Inbox } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function EmptyState({
  icone: Icone = Inbox,
  titulo,
  descricao,
  acao,
}: {
  icone?: LucideIcon;
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-14 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icone className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-medium">{titulo}</p>
      {descricao ? <p className="mt-1 max-w-sm text-sm text-muted-foreground">{descricao}</p> : null}
      {acao ? <div className="mt-5">{acao}</div> : null}
    </div>
  );
}

export function ErrorState({
  titulo = "Não foi possível carregar",
  descricao = "Ocorreu uma falha ao buscar estes dados. Tente novamente em instantes.",
  onRetry,
}: {
  titulo?: string;
  descricao?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-destructive/12 text-destructive">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-medium">{titulo}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{descricao}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
          Tentar novamente
        </Button>
      ) : null}
    </div>
  );
}

export function TableSkeleton({ linhas = 6, colunas = 4 }: { linhas?: number; colunas?: number }) {
  return (
    <div className="rounded-xl border border-border">
      <div className="border-b border-border px-4 py-3">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: linhas }).map((_, i) => (
          <div
            key={i}
            className="grid gap-4 px-4 py-4"
            style={{ gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: colunas }).map((__, j) => (
              <Skeleton key={j} className="h-4 w-full max-w-[70%]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardsSkeleton({ itens = 4 }: { itens?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: itens }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-4 h-7 w-20" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}