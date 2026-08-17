import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Check, CloudUpload, Lock, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { ErrorState } from "@/components/shared/states";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { kycQuery } from "@/data/queries";
import type { EtapaKyc } from "@/data/types";
import { cn } from "@/lib/utils";

const TITULO = "Verificação de identidade — Zon7 BET";
const DESCRICAO = "Acompanhe as etapas de KYC: documento, prova de vida, endereço e origem de recursos.";

export const Route = createFileRoute("/account/verification")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VerificationPage,
});

function VerificationPage() {
  const { data, isLoading, isError, refetch } = useQuery(kycQuery());
  const [etapaAtiva, setEtapaAtiva] = useState<EtapaKyc | null>(null);
  const [enviando, setEnviando] = useState(false);

  function enviar() {
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setEtapaAtiva(null);
      toast.success("Documento recebido", { description: "A análise costuma levar até 24 horas." });
    }, 900);
  }

  return (
    <>
      <PageHeader
        titulo="Verificação de identidade"
        descricao="Cada etapa aprovada libera novos recursos da conta."
        acoes={<StatusBadge valor="em_analise" />}
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <ol className="space-y-3">
          {data!.map((etapa, i) => (
            <li
              key={etapa.id}
              className={cn(
                "grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center",
                etapa.status === "bloqueada" && "opacity-70",
              )}
            >
              <span
                className={cn(
                  "tabular grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold",
                  etapa.status === "concluida" && "bg-success/15 text-success",
                  etapa.status === "pendente" && "bg-primary/15 text-primary",
                  etapa.status === "recusada" && "bg-destructive/15 text-destructive",
                  etapa.status === "bloqueada" && "bg-muted text-muted-foreground",
                )}
              >
                {etapa.status === "concluida" ? (
                  <Check className="h-4 w-4" />
                ) : etapa.status === "recusada" ? (
                  <X className="h-4 w-4" />
                ) : etapa.status === "bloqueada" ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-medium">{etapa.titulo}</p>
                  <StatusBadge valor={etapa.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{etapa.descricao}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 sm:shrink-0">
                <Button
                  variant={etapa.status === "pendente" ? "default" : "outline"}
                  size="sm"
                  disabled={etapa.status !== "pendente"}
                  onClick={() => setEtapaAtiva(etapa)}
                  className="w-full sm:w-auto"
                >
                  {etapa.status === "concluida" ? "Enviado" : etapa.status === "bloqueada" ? "Bloqueada" : "Enviar documento"}
                </Button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <Dialog open={!!etapaAtiva} onOpenChange={(aberto) => !aberto && setEtapaAtiva(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{etapaAtiva?.titulo}</DialogTitle>
            <DialogDescription>{etapaAtiva?.descricao}</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <CloudUpload className="mx-auto h-6 w-6 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">Arraste o arquivo ou selecione do dispositivo</p>
            <p className="mt-1 text-xs text-muted-foreground">PNG, JPG ou PDF até 10 MB · upload simulado</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEtapaAtiva(null)}>
              Cancelar
            </Button>
            <Button onClick={enviar} disabled={enviando}>
              {enviando ? "Enviando…" : "Enviar para análise"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}