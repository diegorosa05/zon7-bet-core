import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DataTable, type Coluna } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState, TableSkeleton } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { historicoQuery } from "@/data/queries";
import type { EventoConta } from "@/data/types";
import { formatarData } from "@/lib/format";

const TITULO = "Histórico da conta — Zon7 BET";
const DESCRICAO = "Linha do tempo de acessos, alterações de limites, eventos de KYC e segurança.";

export const Route = createFileRoute("/account/history")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: HistoryPage,
});

const rotuloCategoria: Record<EventoConta["categoria"], string> = {
  sessao: "Sessão",
  kyc: "KYC",
  limite: "Limite",
  seguranca: "Segurança",
  conta: "Conta",
};

function HistoryPage() {
  const { data, isLoading, isError, refetch } = useQuery(historicoQuery());
  const [selecionado, setSelecionado] = useState<EventoConta | null>(null);

  const colunas: Coluna<EventoConta>[] = [
    {
      chave: "em",
      titulo: "Data",
      render: (e) => (
        <span className="tabular text-sm whitespace-nowrap">{formatarData(e.em)}</span>
      ),
    },
    {
      chave: "categoria",
      titulo: "Categoria",
      render: (e) => <StatusBadge valor={e.categoria} rotulo={rotuloCategoria[e.categoria]} />,
    },
    {
      chave: "titulo",
      titulo: "Evento",
      render: (e) => <span className="text-sm">{e.titulo}</span>,
    },
    {
      chave: "origem",
      titulo: "Origem",
      ocultarNoMobile: true,
      render: (e) => <span className="text-sm text-muted-foreground">{e.origem}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Histórico"
        descricao="Todo evento relevante da conta fica registrado e disponível para consulta."
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          dados={data!}
          colunas={colunas}
          chaveItem={(e) => e.id}
          busca={(e, termo) => `${e.titulo} ${e.detalhe} ${e.origem}`.toLowerCase().includes(termo)}
          placeholderBusca="Buscar evento…"
          filtros={[
            {
              id: "categoria",
              rotulo: "Categoria",
              opcoes: Object.entries(rotuloCategoria).map(([valor, rotulo]) => ({ valor, rotulo })),
              aplicar: (e, v) => e.categoria === v,
            },
          ]}
          onSelecionar={setSelecionado}
          tituloVazio="Nenhum evento no período"
        />
      )}

      <Sheet open={!!selecionado} onOpenChange={(aberto) => !aberto && setSelecionado(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selecionado?.titulo}</SheetTitle>
            <SheetDescription>{selecionado ? formatarData(selecionado.em) : null}</SheetDescription>
          </SheetHeader>
          {selecionado ? (
            <div className="space-y-5 px-4 pb-6">
              <StatusBadge
                valor={selecionado.categoria}
                rotulo={rotuloCategoria[selecionado.categoria]}
              />
              <p className="text-sm text-muted-foreground">{selecionado.detalhe}</p>
              <dl className="space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Origem</dt>
                  <dd className="text-right">{selecionado.origem}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Identificador</dt>
                  <dd className="tabular text-right">{selecionado.id}</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
