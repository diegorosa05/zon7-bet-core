import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Clock, Timer, UserPlus } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { CardsSkeleton, ErrorState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { casosQuery, metricasQuery } from "@/data/queries";
import { formatarData } from "@/lib/format";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const TITULO = "Painel de compliance — Zon7 BET";
const DESCRICAO = "Indicadores da fila de análise, SLA e casos críticos em aberto.";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const metricas = useQuery(metricasQuery());
  const casos = useQuery(casosQuery());

  const prioritarios = (casos.data ?? [])
    .filter((c) => c.status === "aberto" || c.status === "em_analise")
    .slice(0, 4);

  return (
    <>
      <PageHeader
        titulo="Painel"
        descricao="Situação operacional da esteira de compliance nas últimas 24 horas."
        acoes={
          <Button asChild>
            <Link to="/admin/reviews">Abrir fila</Link>
          </Button>
        }
      />

      {metricas.isError ? (
        <ErrorState onRetry={() => metricas.refetch()} />
      ) : metricas.isLoading ? (
        <CardsSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            rotulo="Fila total"
            valor={String(metricas.data!.filaTotal)}
            apoio="casos aguardando decisão"
            icone={Clock}
          />
          <StatCard
            rotulo="Casos críticos"
            valor={String(metricas.data!.filaCritica)}
            apoio="prioridade máxima"
            icone={AlertTriangle}
            destaque
          />
          <StatCard
            rotulo="SLA em risco"
            valor={String(metricas.data!.slaEmRisco)}
            apoio="menos de 6h restantes"
            icone={Timer}
          />
          <StatCard
            rotulo="Concluídos 24h"
            valor={String(metricas.data!.aprovadas24h)}
            apoio={`tempo médio ${metricas.data!.tempoMedioHoras}h`}
            icone={CheckCircle2}
          />
        </div>
      )}

      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold">Casos abertos x concluídos</h2>
          <p className="mt-1 text-sm text-muted-foreground">Últimos 7 dias</p>
          {metricas.isLoading ? (
            <Skeleton className="mt-6 h-56 w-full" />
          ) : metricas.data ? (
            <ChartContainer
              className="mt-6 h-56 w-full"
              config={{
                abertos: { label: "Abertos", color: "var(--color-chart-1)" },
                concluidos: { label: "Concluídos", color: "var(--color-chart-2)" },
              }}
            >
              <BarChart data={metricas.data.serie}>
                <CartesianGrid vertical={false} strokeOpacity={0.15} />
                <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="abertos" fill="var(--color-abertos)" radius={4} />
                <Bar dataKey="concluidos" fill="var(--color-concluidos)" radius={4} />
              </BarChart>
            </ChartContainer>
          ) : null}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="truncate text-base font-semibold">Prioridades agora</h2>
            <StatCardMini valor={`${prioritarios.length}`} />
          </div>
          {casos.isLoading ? (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {prioritarios.map((caso) => (
                <li key={caso.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <Link
                    to="/admin/reviews/$id"
                    params={{ id: caso.id }}
                    className="block rounded-md transition-colors hover:bg-accent/40"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tabular text-sm font-medium">{caso.id}</span>
                      <StatusBadge valor={caso.risco} />
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{caso.resumo}</p>
                    <p className="tabular mt-1 text-xs text-muted-foreground">
                      {caso.usuarioNome} · aberto em {formatarData(caso.abertoEm, false)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">Novos cadastros</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Contas criadas nos últimos 7 dias aguardando KYC.
            </p>
          </div>
          <UserPlus className="h-5 w-5 shrink-0 text-muted-foreground" />
        </div>
        <p className="tabular mt-4 text-3xl font-semibold">
          {metricas.data?.novosCadastros ?? "—"}
        </p>
        <Button asChild variant="outline" size="sm" className="mt-5">
          <Link to="/admin/users">Ver usuários</Link>
        </Button>
      </section>
    </>
  );
}

function StatCardMini({ valor }: { valor: string }) {
  return (
    <span className="tabular rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-medium text-primary">
      {valor}
    </span>
  );
}
