import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { casoQuery } from "@/data/queries";
import { formatarData } from "@/lib/format";

export const Route = createFileRoute("/admin/reviews/$id")({
  head: ({ params }) => {
    const titulo = `Caso ${params.id} — Zon7 BET Compliance`;
    return {
      meta: [
        { title: titulo },
        {
          name: "description",
          content: "Análise de caso de compliance com evidências, histórico e decisão.",
        },
        { property: "og:title", content: titulo },
        {
          property: "og:description",
          content: "Análise de caso de compliance com evidências, histórico e decisão.",
        },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: CasePage,
});

type Decisao = "aprovar" | "recusar" | "solicitar";

const rotuloDecisao: Record<Decisao, string> = {
  aprovar: "Aprovar caso",
  recusar: "Recusar caso",
  solicitar: "Solicitar informação",
};

function CasePage() {
  const { id } = Route.useParams();
  const { data, isLoading, isError, refetch } = useQuery(casoQuery(id));
  const [nota, setNota] = useState("");
  const [decisao, setDecisao] = useState<Decisao | null>(null);

  function confirmar() {
    if (!decisao) return;
    toast.success(`${rotuloDecisao[decisao]} registrada`, {
      description: "Evento gravado na trilha de auditoria.",
    });
    setDecisao(null);
    setNota("");
  }

  return (
    <>
      <PageHeader
        titulo={`Caso ${id}`}
        descricao="Todas as ações desta tela são registradas com autor, horário e justificativa."
        acoes={
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/reviews">
              <ArrowLeft className="h-4 w-4" />
              Voltar à fila
            </Link>
          </Button>
        }
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      ) : !data ? (
        <EmptyState
          titulo="Caso não encontrado"
          descricao="O identificador informado não existe ou o caso foi arquivado."
          acao={
            <Button asChild variant="outline">
              <Link to="/admin/reviews">Voltar à fila</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="min-w-0 space-y-4">
            <section className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap gap-2">
                <StatusBadge valor={data.tipo} />
                <StatusBadge valor={data.status} />
                <StatusBadge valor={data.risco} />
              </div>
              <h2 className="mt-5 text-base font-semibold">{data.resumo}</h2>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <Linha rotulo="Usuário" valor={data.usuarioNome} />
                <Linha rotulo="Identificador" valor={data.usuarioId} />
                <Linha rotulo="Aberto em" valor={formatarData(data.abertoEm)} />
                <Linha rotulo="Responsável" valor={data.responsavel ?? "Não atribuído"} />
              </dl>
            </section>

            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold">Evidências</h2>
              <ul className="mt-5 space-y-4">
                {data.evidencias.map((ev) => (
                  <li
                    key={ev.rotulo}
                    className="border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium">{ev.rotulo}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{ev.valor}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Fonte: {ev.fonte}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold">Histórico do caso</h2>
              <div className="mt-6">
                <Timeline itens={data.linhaDoTempo} />
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="text-base font-semibold">Decisão</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              SLA restante: {data.slaHoras > 0 ? `${data.slaHoras} horas` : "encerrado"}.
            </p>
            <div className="mt-5 space-y-2">
              <Label htmlFor="nota">Justificativa</Label>
              <Textarea
                id="nota"
                rows={5}
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Descreva a análise realizada e a base da decisão."
              />
            </div>
            <div className="mt-5 space-y-2">
              <Button
                className="w-full"
                disabled={!nota.trim()}
                onClick={() => setDecisao("aprovar")}
              >
                Aprovar
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                disabled={!nota.trim()}
                onClick={() => setDecisao("recusar")}
              >
                Recusar
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={!nota.trim()}
                onClick={() => setDecisao("solicitar")}
              >
                Solicitar informação
              </Button>
            </div>
            {!nota.trim() ? (
              <p className="mt-3 text-xs text-muted-foreground">
                A justificativa é obrigatória para registrar a decisão.
              </p>
            ) : null}
          </section>
        </div>
      )}

      <AlertDialog open={!!decisao} onOpenChange={(aberto) => !aberto && setDecisao(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{decisao ? rotuloDecisao[decisao] : ""}</AlertDialogTitle>
            <AlertDialogDescription>
              A decisão é definitiva e ficará registrada na trilha de auditoria com seu usuário e
              horário.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmar}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{rotulo}</dt>
      <dd className="truncate">{valor}</dd>
    </div>
  );
}
