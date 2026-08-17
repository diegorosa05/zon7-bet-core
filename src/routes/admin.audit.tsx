import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { DataTable, type Coluna } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState, TableSkeleton } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { auditoriaQuery } from "@/data/queries";
import type { AuditEvent } from "@/data/types";
import { formatarData } from "@/lib/format";

const TITULO = "Trilha de auditoria — Zon7 BET Compliance";
const DESCRICAO =
  "Registro imutável de acessos, decisões e alterações de configuração da plataforma.";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuditPage,
});

const rotuloPapel: Record<AuditEvent["papel"], string> = {
  sistema: "Sistema",
  compliance: "Compliance",
  apostador: "Apostador",
};

function AuditPage() {
  const { data, isLoading, isError, refetch } = useQuery(auditoriaQuery());

  const colunas: Coluna<AuditEvent>[] = [
    {
      chave: "em",
      titulo: "Data",
      render: (a) => (
        <span className="tabular text-sm whitespace-nowrap">{formatarData(a.em)}</span>
      ),
    },
    {
      chave: "ator",
      titulo: "Ator",
      render: (a) => (
        <div className="min-w-0">
          <p className="truncate text-sm">{a.ator}</p>
          <p className="text-xs text-muted-foreground">{rotuloPapel[a.papel]}</p>
        </div>
      ),
    },
    { chave: "acao", titulo: "Ação", render: (a) => <span className="text-sm">{a.acao}</span> },
    {
      chave: "entidade",
      titulo: "Entidade",
      render: (a) => <span className="tabular text-sm text-muted-foreground">{a.entidade}</span>,
    },
    {
      chave: "hash",
      titulo: "Hash",
      ocultarNoMobile: true,
      render: (a) => <span className="tabular text-xs text-muted-foreground">{a.hash}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Auditoria"
        descricao="Eventos encadeados por hash — nenhum registro pode ser editado ou removido."
        acoes={
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Exportação solicitada")}
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        }
      />

      <div className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Retenção de 5 anos. Cada evento carrega o hash do anterior, permitindo verificação de
          integridade da cadeia.
        </p>
      </div>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <TableSkeleton colunas={5} />
      ) : (
        <DataTable
          dados={data!}
          colunas={colunas}
          chaveItem={(a) => a.id}
          busca={(a, termo) => `${a.ator} ${a.acao} ${a.entidade}`.toLowerCase().includes(termo)}
          placeholderBusca="Buscar por ator, ação ou entidade…"
          filtros={[
            {
              id: "papel",
              rotulo: "Papel",
              opcoes: Object.entries(rotuloPapel).map(([valor, rotulo]) => ({ valor, rotulo })),
              aplicar: (a, v) => a.papel === v,
            },
          ]}
        />
      )}

      <p className="text-xs text-muted-foreground">
        <StatusBadge valor="aprovado" rotulo="Cadeia íntegra" /> Última verificação automática há 12
        minutos.
      </p>
    </>
  );
}
