import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, IdCard, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { CardsSkeleton, ErrorState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { kycQuery, limitesQuery } from "@/data/queries";
import { formatarData, formatarMoeda } from "@/lib/format";

const TITULO = "Minha conta — Zon7 BET";
const DESCRICAO = "Visão geral da sua conta: verificação, limites ativos e próximos passos.";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountDashboard,
});

function AccountDashboard() {
  const kyc = useQuery(kycQuery());
  const limites = useQuery(limitesQuery());

  const concluidas = kyc.data?.filter((e) => e.status === "concluida").length ?? 0;
  const total = kyc.data?.length ?? 0;
  const progresso = total ? Math.round((concluidas / total) * 100) : 0;

  return (
    <>
      <PageHeader
        titulo="Visão geral"
        descricao="Acompanhe o status da sua conta e o que falta para liberar todos os recursos."
        acoes={<StatusBadge valor="em_analise" rotulo="Conta em verificação" />}
      />

      {kyc.isError || limites.isError ? (
        <ErrorState
          onRetry={() => {
            kyc.refetch();
            limites.refetch();
          }}
        />
      ) : kyc.isLoading || limites.isLoading ? (
        <CardsSkeleton />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              rotulo="Verificação"
              valor={`${concluidas}/${total}`}
              apoio="etapas concluídas"
              icone={IdCard}
              destaque
            />
            <StatCard
              rotulo="Depósito diário"
              valor={formatarMoeda(limites.data!.depositoDiario)}
              apoio="limite definido por você"
              icone={SlidersHorizontal}
            />
            <StatCard
              rotulo="Perda semanal"
              valor={formatarMoeda(limites.data!.perdaSemanal)}
              apoio="teto de proteção"
              icone={ShieldCheck}
            />
            <StatCard
              rotulo="Sessão"
              valor={`${limites.data!.sessaoMinutos} min`}
              apoio={`atualizado em ${formatarData(limites.data!.atualizadoEm, false)}`}
              icone={Clock}
            />
          </div>

          <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold">Conclua sua verificação</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sua conta opera em modo limitado até a última etapa ser aprovada.
                  </p>
                </div>
                <span className="tabular shrink-0 text-sm text-muted-foreground">{progresso}%</span>
              </div>
              <Progress value={progresso} className="mt-5" />
              <ul className="mt-6 space-y-3">
                {kyc.data!.map((etapa) => (
                  <li
                    key={etapa.id}
                    className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <span className="min-w-0 truncate text-sm">{etapa.titulo}</span>
                    <StatusBadge valor={etapa.status} />
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6">
                <Link to="/account/verification">
                  Continuar verificação
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold">Próximos passos</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <p className="font-medium">Revisar limites</p>
                  <p className="mt-1 text-muted-foreground">
                    Ajuste depósito, perda e tempo de sessão.
                  </p>
                  <Link
                    to="/account/limits"
                    className="mt-1 inline-block text-primary hover:underline"
                  >
                    Abrir limites
                  </Link>
                </li>
                <li>
                  <p className="font-medium">Reforçar segurança</p>
                  <p className="mt-1 text-muted-foreground">
                    Confira dispositivos e sessões ativas.
                  </p>
                  <Link
                    to="/account/security"
                    className="mt-1 inline-block text-primary hover:underline"
                  >
                    Abrir segurança
                  </Link>
                </li>
                <li>
                  <p className="font-medium">Conferir histórico</p>
                  <p className="mt-1 text-muted-foreground">
                    Todos os eventos registrados na sua conta.
                  </p>
                  <Link
                    to="/account/history"
                    className="mt-1 inline-block text-primary hover:underline"
                  >
                    Abrir histórico
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </>
      )}

      {kyc.isLoading ? <Skeleton className="h-2 w-full" /> : null}
    </>
  );
}
