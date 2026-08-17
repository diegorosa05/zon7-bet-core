import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  rotulo,
  valor,
  apoio,
  icone: Icone,
  destaque,
}: {
  rotulo: string;
  valor: string;
  apoio?: string;
  icone?: LucideIcon;
  destaque?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 transition-colors",
        destaque && "border-primary/40 bg-primary/5",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-xs font-medium tracking-wide text-muted-foreground uppercase">{rotulo}</p>
        {Icone ? <Icone className={cn("h-4 w-4 shrink-0 text-muted-foreground", destaque && "text-primary")} /> : null}
      </div>
      <p className="tabular mt-3 text-2xl font-semibold">{valor}</p>
      {apoio ? <p className="mt-1 text-xs text-muted-foreground">{apoio}</p> : null}
    </div>
  );
}