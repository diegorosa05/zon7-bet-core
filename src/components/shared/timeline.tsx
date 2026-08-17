import { formatarData } from "@/lib/format";

export function Timeline({
  itens,
}: {
  itens: { em: string; ator: string; acao: string; detalhe?: string }[];
}) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {itens.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute top-1.5 -left-[27px] h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
          <p className="text-sm font-medium">{item.acao}</p>
          {item.detalhe ? <p className="mt-0.5 text-sm text-muted-foreground">{item.detalhe}</p> : null}
          <p className="tabular mt-1 text-xs text-muted-foreground">
            {item.ator} · {formatarData(item.em)}
          </p>
        </li>
      ))}
    </ol>
  );
}