import { cn } from "@/lib/utils";
import { escudoDoTime } from "@/data/team-crests";

/** Cor determinística por nome do time (tons da marca + neutros). */
const paleta = [
  "from-brand-blue/80 to-brand-blue/30",
  "from-primary/70 to-primary/20",
  "from-emerald-500/70 to-emerald-500/20",
  "from-rose-500/70 to-rose-500/20",
  "from-amber-500/70 to-amber-500/20",
  "from-violet-500/70 to-violet-500/20",
  "from-cyan-500/70 to-cyan-500/20",
  "from-orange-500/70 to-orange-500/20",
];

function hash(nome: string) {
  let h = 0;
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) >>> 0;
  return h;
}

function sigla(nome: string) {
  const partes = nome
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(" ")
    .filter((p) => p.length > 1);
  if (partes.length === 0) return nome.slice(0, 2).toUpperCase();
  if (partes.length === 1) return partes[0]!.slice(0, 3).toUpperCase();
  return partes
    .slice(0, 3)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function EscudoTime({
  nome,
  tamanho = "md",
  className,
}: {
  nome: string;
  tamanho?: "sm" | "md" | "lg";
  className?: string;
}) {
  const cor = paleta[hash(nome) % paleta.length];
  const dim =
    tamanho === "sm" ? "h-7 w-7 text-[9px]" : tamanho === "lg" ? "h-14 w-14 text-sm" : "h-9 w-9 text-[10px]";
  const escudo = escudoDoTime(nome);

  if (escudo) {
    return (
      <img
        src={escudo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        title={nome}
        className={cn("shrink-0 object-contain", dim.replace(/text-\[?[\w.]+\]?/, ""), className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full border border-border/80 bg-gradient-to-br font-bold tracking-tight text-foreground",
        cor,
        dim,
        className,
      )}
      title={nome}
    >
      {sigla(nome)}
    </span>
  );
}
