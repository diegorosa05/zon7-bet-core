import { cn } from "@/lib/utils";

export function Logo({ className, compacto = false }: { className?: string; compacto?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
        Z7
      </span>
      {!compacto && (
        <span className="font-display text-base font-semibold tracking-tight">
          Zon7 <span className="text-primary">BET</span>
        </span>
      )}
    </span>
  );
}