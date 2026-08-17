import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Laptop, ShieldCheck } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { sessoesQuery } from "@/data/queries";
import { formatarData } from "@/lib/format";

const TITULO = "Segurança da conta — Zon7 BET";
const DESCRICAO = "Senha, autenticação em dois fatores e gerenciamento de sessões e dispositivos.";

export const Route = createFileRoute("/account/security")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  const { data, isLoading, isError, refetch } = useQuery(sessoesQuery());
  const [doisFatores, setDoisFatores] = useState(true);
  const [alertas, setAlertas] = useState(true);
  const [trocandoSenha, setTrocandoSenha] = useState(false);

  return (
    <>
      <PageHeader
        titulo="Segurança"
        descricao="Proteja o acesso à sua conta e revise dispositivos conectados."
        acoes={
          <Button variant="outline" onClick={() => setTrocandoSenha(true)}>
            <KeyRound className="h-4 w-4" />
            Alterar senha
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                Autenticação em dois fatores
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Exige um código do aplicativo autenticador a cada novo acesso.
              </p>
            </div>
            <Switch
              checked={doisFatores}
              onCheckedChange={(v) => {
                setDoisFatores(v);
                toast.success(v ? "2FA ativado" : "2FA desativado");
              }}
              aria-label="Autenticação em dois fatores"
            />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium">Alertas de novo dispositivo</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Notificação por e-mail sempre que um acesso vier de um dispositivo desconhecido.
              </p>
            </div>
            <Switch checked={alertas} onCheckedChange={setAlertas} aria-label="Alertas de novo dispositivo" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">Sessões ativas</h2>
        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {data!.map((sessao) => (
              <li
                key={sessao.id}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                  <Laptop className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium">{sessao.dispositivo}</p>
                    {sessao.atual ? <StatusBadge valor="ativa" rotulo="Sessão atual" /> : null}
                  </div>
                  <p className="tabular mt-1 text-sm text-muted-foreground">
                    {sessao.local} · {sessao.ip} · {formatarData(sessao.ultimoAcesso)}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 sm:shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={sessao.atual}
                    className="w-full sm:w-auto"
                    onClick={() => toast.success("Sessão encerrada")}
                  >
                    Encerrar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Dialog open={trocandoSenha} onOpenChange={setTrocandoSenha}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar senha</DialogTitle>
            <DialogDescription>Você será desconectado das demais sessões após a alteração.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="atual">Senha atual</Label>
              <Input id="atual" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nova">Nova senha</Label>
              <Input id="nova" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTrocandoSenha(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setTrocandoSenha(false);
                toast.success("Senha alterada");
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}