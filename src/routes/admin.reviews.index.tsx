import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { DataTable, type Coluna } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState, TableSkeleton } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { casosQuery } from "@/data/queries";
import type { CasoCompliance } from "@/data/types";
import { formatarData } from "@/lib/format";

const TITULO = "Fila de análise — Zon7 BET Compliance";
const DESCRICAO = "Casos de KYC, AML, risco e jogo responsável priorizados por SLA.";

export const Route = createFileRoute("/admin/reviews/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { data, isLoading, isError, refetch } = useQuery(casosQuery());
  const navigate = useNavigate();

  const colunas: Coluna<CasoCompliance>[] = [
    {
      chave: "id",
      titulo: "Caso",
      render: (c) => (
        <div className="min-w-0">
          <p className="tabular text-sm font-medium">{c.id}</p>
          <p className="truncate text-xs text-muted-foreground">{c.usuarioNome}</p>
        </div>
      ),
    },
    { chave: "tipo", titulo: "Tipo", render: (c) => <StatusBadge valor={c.tipo} /> },
    { chave: "status", titulo: "Status", render: (c) => <StatusBadge valor={c.status} /> },
    { chave: "risco", titulo: "Risco", render: (c) => <StatusBadge valor={c.risco} /> },
    {
      chave: "sla",
      titulo: "SLA",
      render: (c) => (
        <span
          className={`tabular text-sm ${c.slaHoras > 0 && c.slaHoras <= 6 ? "text-destructive" : ""}`}
        >
          {c.slaHoras > 0 ? `${c.slaHoras}h restantes` : "encerrado"}
        </span>
      ),
    },
    {
      chave: "aberto",
      titulo: "Aberto em",
      ocultarNoMobile: true,
      render: (c) => (
        <span className="tabular text-sm whitespace-nowrap">{formatarData(c.abertoEm, false)}</span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Fila de análise"
        descricao="Selecione um caso para revisar evidências e registrar a decisão."
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <TableSkeleton colunas={6} />
      ) : (
        <DataTable
          dados={data!}
          colunas={colunas}
          chaveItem={(c) => c.id}
          busca={(c, termo) => `${c.id} ${c.usuarioNome} ${c.resumo}`.toLowerCase().includes(termo)}
          placeholderBusca="Buscar por caso, usuário ou resumo…"
          filtros={[
            {
              id: "tipo",
              rotulo: "Tipo",
              opcoes: [
                { valor: "kyc", rotulo: "KYC" },
                { valor: "aml", rotulo: "AML" },
                { valor: "risco", rotulo: "Risco" },
                { valor: "jogo_responsavel", rotulo: "Jogo responsável" },
              ],
              aplicar: (c, v) => c.tipo === v,
            },
            {
              id: "status",
              rotulo: "Status",
              opcoes: [
                { valor: "aberto", rotulo: "Aberto" },
                { valor: "em_analise", rotulo: "Em análise" },
                { valor: "aguardando_usuario", rotulo: "Aguardando usuário" },
                { valor: "aprovado", rotulo: "Aprovado" },
                { valor: "recusado", rotulo: "Recusado" },
              ],
              aplicar: (c, v) => c.status === v,
            },
          ]}
          onSelecionar={(c) => navigate({ to: "/admin/reviews/$id", params: { id: c.id } })}
          tituloVazio="Fila vazia"
          descricaoVazio="Nenhum caso corresponde aos filtros selecionados."
        />
      )}
    </>
  );
}
