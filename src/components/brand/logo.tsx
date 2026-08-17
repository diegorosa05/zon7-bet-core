import logoAsset from "@/assets/zon7-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className, compacto = false }: { className?: string; compacto?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <img
        src={logoAsset.url}
        alt="Zon7 BET"
        width={112}
        height={32}
        className={cn("w-auto object-contain", compacto ? "h-6" : "h-7")}
      />
      {!compacto && (
        <span className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">bet</span>
      )}
    </span>
  );
}