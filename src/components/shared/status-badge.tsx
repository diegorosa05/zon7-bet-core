import { cn } from "@/lib/utils";

type Tom = "neutro" | "sucesso" | "alerta" | "perigo" | "info" | "destaque";

const tons: Record<Tom, string> = {
  neutro: "bg-muted text-muted-foreground ring-border",
  sucesso: "bg-success/12 text-success ring-success/30",
  alerta: "bg-warning/12 text-warning ring-warning/30",
  perigo: "bg-destructive/12 text-destructive ring-destructive/30",
  info: "bg-info/12 text-info ring-info/30",
  destaque: "bg-primary/12 text-primary ring-primary/30",
};

const mapa: Record<string, { rotulo: string; tom: Tom }> = {
  // KYC
  nao_iniciado: { rotulo: "Não iniciado", tom: "neutro" },
  pendente: { rotulo: "Pendente", tom: "alerta" },
  em_analise: { rotulo: "Em análise", tom: "info" },
  aprovado: { rotulo: "Aprovado", tom: "sucesso" },
  recusado: { rotulo: "Recusado", tom: "perigo" },
  // Conta
  ativa: { rotulo: "Ativa", tom: "sucesso" },
  limitada: { rotulo: "Limitada", tom: "alerta" },
  suspensa: { rotulo: "Suspensa", tom: "perigo" },
  autoexcluida: { rotulo: "Autoexcluída", tom: "neutro" },
  // Risco
  baixo: { rotulo: "Risco baixo", tom: "sucesso" },
  medio: { rotulo: "Risco médio", tom: "alerta" },
  alto: { rotulo: "Risco alto", tom: "perigo" },
  critico: { rotulo: "Risco crítico", tom: "perigo" },
  // Casos
  aberto: { rotulo: "Aberto", tom: "destaque" },
  aguardando_usuario: { rotulo: "Aguardando usuário", tom: "alerta" },
  // Etapas KYC
  concluida: { rotulo: "Concluída", tom: "sucesso" },
  recusada: { rotulo: "Recusada", tom: "perigo" },
  bloqueada: { rotulo: "Bloqueada", tom: "neutro" },
  // Tipos de caso
  kyc: { rotulo: "KYC", tom: "info" },
  aml: { rotulo: "AML", tom: "perigo" },
  risco: { rotulo: "Risco", tom: "alerta" },
  jogo_responsavel: { rotulo: "Jogo responsável", tom: "destaque" },
};

export function StatusBadge({
  valor,
  rotulo,
  className,
}: {
  valor: string;
  rotulo?: string;
  className?: string;
}) {
  const cfg = mapa[valor] ?? { rotulo: valor, tom: "neutro" as Tom };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        tons[cfg.tom],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-80" />
      {rotulo ?? cfg.rotulo}
    </span>
  );
}