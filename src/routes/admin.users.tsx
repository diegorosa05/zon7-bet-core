import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DataTable, type Coluna } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { ErrorState, TableSkeleton } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { usuariosQuery } from "@/data/queries";
import type { Usuario } from "@/data/types";
import { formatarData } from "@/lib/format";

const TITULO = "Usuários — Zon7 BET Compliance";
const DESCRICAO = "Base de contas com status de KYC, nível de risco e situação operacional.";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const { data, isLoading, isError, refetch } = useQuery(usuariosQuery());
  const [selecionado, setSelecionado] = useState<Usuario | null>(null);

  const colunas: Coluna<Usuario>[] = [
    {
      chave: "nome",
      titulo: "Usuário",
      render: (u) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{u.nome}</p>
          <p className="truncate text-xs text-muted-foreground">{u.email}</p>
        </div>
      ),
    },
    { chave: "kyc", titulo: "KYC", render: (u) => <StatusBadge valor={u.kycStatus} /> },
    { chave: "conta", titulo: "Conta", render: (u) => <StatusBadge valor={u.contaStatus} /> },
    { chave: "risco", titulo: "Risco", render: (u) => <StatusBadge valor={u.risco} /> },
    {
      chave: "criado",
      titulo: "Cadastro",
      ocultarNoMobile: true,
      render: (u) => <span className="tabular text-sm whitespace-nowrap">{formatarData(u.criadoEm, false)}</span>,
    },
  ];

  return (
    <>
      <PageHeader titulo="Usuários" descricao="Consulte contas e abra o detalhe para ver o contexto de compliance." />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <TableSkeleton colunas={5} />
      ) : (
        <DataTable
          dados={data!}
          colunas={colunas}
          chaveItem={(u) => u.id}
          busca={(u, termo) => `${u.nome} ${u.email} ${u.cidade}`.toLowerCase().includes(termo)}
          placeholderBusca="Buscar por nome, e-mail ou cidade…"
          filtros={[
            {
              id: "kyc",
              rotulo: "KYC",
              opcoes: [
                { valor: "nao_iniciado", rotulo: "Não iniciado" },
                { valor: "pendente", rotulo: "Pendente" },
                { valor: "em_analise", rotulo: "Em análise" },
                { valor: "aprovado", rotulo: "Aprovado" },
                { valor: "recusado", rotulo: "Recusado" },
              ],
              aplicar: (u, v) => u.kycStatus === v,
            },
            {
              id: "risco",
              rotulo: "Risco",
              opcoes: [
                { valor: "baixo", rotulo: "Baixo" },
                { valor: "medio", rotulo: "Médio" },
                { valor: "alto", rotulo: "Alto" },
                { valor: "critico", rotulo: "Crítico" },
              ],
              aplicar: (u, v) => u.risco === v,
            },
          ]}
          onSelecionar={setSelecionado}
        />
      )}

      <Sheet open={!!selecionado} onOpenChange={(aberto) => !aberto && setSelecionado(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selecionado?.nome}</SheetTitle>
            <SheetDescription>{selecionado?.email}</SheetDescription>
          </SheetHeader>
          {selecionado ? (
            <div className="space-y-6 px-4 pb-6">
              <div className="flex flex-wrap gap-2">
                <StatusBadge valor={selecionado.kycStatus} />
                <StatusBadge valor={selecionado.contaStatus} />
                <StatusBadge valor={selecionado.risco} />
              </div>
              <dl className="space-y-3 border-t border-border pt-4 text-sm">
                <Linha rotulo="Identificador" valor={selecionado.id} />
                <Linha rotulo="Documento" valor={selecionado.documento} />
                <Linha rotulo="Telefone" valor={selecionado.telefone} />
                <Linha rotulo="Localidade" valor={`${selecionado.cidade}/${selecionado.uf}`} />
                <Linha rotulo="Cadastro" valor={formatarData(selecionado.criadoEm)} />
              </dl>
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                <Button variant="outline" size="sm">
                  Solicitar documento
                </Button>
                <Button variant="outline" size="sm">
                  Limitar conta
                </Button>
              </div>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{rotulo}</dt>
      <dd className="tabular min-w-0 truncate text-right">{valor}</dd>
    </div>
  );
}