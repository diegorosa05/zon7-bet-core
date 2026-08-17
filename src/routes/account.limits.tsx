import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { ErrorState } from "@/components/shared/states";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { limitesQuery } from "@/data/queries";
import type { LimitesConta } from "@/data/types";
import { formatarMoeda } from "@/lib/format";

const TITULO = "Limites e autoexclusão — Zon7 BET";
const DESCRICAO = "Defina limites de depósito, perda e tempo de sessão, ou solicite pausa e autoexclusão.";

export const Route = createFileRoute("/account/limits")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LimitsPage,
});

const opcoesAutoexclusao: { valor: LimitesConta["autoexclusao"]; rotulo: string }[] = [
  { valor: "nenhuma", rotulo: "Sem autoexclusão" },
  { valor: "7d", rotulo: "Pausa de 7 dias" },
  { valor: "30d", rotulo: "Pausa de 30 dias" },
  { valor: "180d", rotulo: "Pausa de 180 dias" },
  { valor: "indeterminada", rotulo: "Autoexclusão por prazo indeterminado" },
];

function LimitsPage() {
  const { data, isLoading, isError, refetch } = useQuery(limitesQuery());
  const [form, setForm] = useState<LimitesConta | null>(null);
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  function salvar() {
    toast.success("Limites atualizados", {
      description: "Reduções valem imediatamente; aumentos entram em vigor após 24h.",
    });
  }

  function confirmarAutoexclusao() {
    setConfirmando(false);
    toast.success("Solicitação registrada", { description: "Um caso foi aberto para o time de compliance." });
  }

  return (
    <>
      <PageHeader
        titulo="Limites"
        descricao="Controles de jogo responsável aplicados automaticamente à sua conta."
      />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading || !form ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : (
        <>
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Limites financeiros e de tempo</h2>
            <div className="mt-8 space-y-8">
              <ControleSlider
                rotulo="Limite de depósito diário"
                valor={form.depositoDiario}
                min={50}
                max={5000}
                passo={50}
                formatar={formatarMoeda}
                onChange={(v) => setForm({ ...form, depositoDiario: v })}
              />
              <ControleSlider
                rotulo="Limite de perda semanal"
                valor={form.perdaSemanal}
                min={100}
                max={10000}
                passo={100}
                formatar={formatarMoeda}
                onChange={(v) => setForm({ ...form, perdaSemanal: v })}
              />
              <ControleSlider
                rotulo="Tempo máximo de sessão"
                valor={form.sessaoMinutos}
                min={15}
                max={360}
                passo={15}
                formatar={(v) => `${v} min`}
                onChange={(v) => setForm({ ...form, sessaoMinutos: v })}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={salvar}>Salvar limites</Button>
            </div>
          </section>

          <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <h2 className="text-base font-semibold">Pausa e autoexclusão</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Durante o período escolhido a conta fica bloqueada para novas operações. A decisão é irreversível dentro do
              prazo.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div className="space-y-2">
                <Label>Período</Label>
                <Select
                  value={form.autoexclusao}
                  onValueChange={(v) => setForm({ ...form, autoexclusao: v as LimitesConta["autoexclusao"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {opcoesAutoexclusao.map((op) => (
                      <SelectItem key={op.valor} value={op.valor}>
                        {op.rotulo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="destructive"
                disabled={form.autoexclusao === "nenhuma"}
                onClick={() => setConfirmando(true)}
              >
                Solicitar
              </Button>
            </div>
          </section>
        </>
      )}

      <AlertDialog open={confirmando} onOpenChange={setConfirmando}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar solicitação?</AlertDialogTitle>
            <AlertDialogDescription>
              A conta será bloqueada para novas operações durante todo o período escolhido e não será possível reverter
              antes do prazo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarAutoexclusao}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ControleSlider({
  rotulo,
  valor,
  min,
  max,
  passo,
  formatar,
  onChange,
}: {
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  formatar: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Label className="min-w-0 truncate">{rotulo}</Label>
        <span className="tabular shrink-0 text-sm font-medium text-primary">{formatar(valor)}</span>
      </div>
      <Slider className="mt-4" value={[valor]} min={min} max={max} step={passo} onValueChange={([v]) => onChange(v)} />
      <div className="tabular mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{formatar(min)}</span>
        <span>{formatar(max)}</span>
      </div>
    </div>
  );
}