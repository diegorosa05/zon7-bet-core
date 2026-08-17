import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { STATUS_INFO, useOnboarding } from "@/lib/onboarding";

/** Bloqueia funcionalidades restritas enquanto a conta não estiver aprovada. */
export function RestrictedGate({ children, recurso }: { children: ReactNode; recurso: string }) {
  const { estado, ready } = useOnboarding();

  if (!ready) return <Skeleton className="h-64 w-full rounded-2xl" />;
  if (estado.status === "approved") return <>{children}</>;

  const info = STATUS_INFO[estado.status];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-10">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Lock className="h-5 w-5" />
      </span>
      <div className="mt-4 flex justify-center">
        <StatusBadge valor={info.badge} rotulo={info.rotulo} />
      </div>
      <h2 className="mt-4 text-lg font-semibold">{recurso} indisponível</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{info.mensagem}</p>
      {estado.status !== "blocked" ? (
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/onboarding">{info.acao ?? "Acompanhar verificação"}</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
