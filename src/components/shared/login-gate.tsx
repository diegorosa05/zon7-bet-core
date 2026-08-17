import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";

/** Mostra o conteúdo apenas para sessão iniciada (mockup). */
export function LoginGate({ children, recurso }: { children: ReactNode; recurso: string }) {
  const { user, ready, entrar } = useAuth();

  if (!ready) return <Skeleton className="h-64 w-full rounded-2xl" />;
  if (user) return <>{children}</>;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-10">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Lock className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold">{recurso} disponível após entrar</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Esta área existe apenas na versão logada da plataforma. Entre com sua conta ou pule o login
        para navegar no mockup.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
        <Button asChild>
          <Link to="/login">Entrar</Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => entrar({ email: "diego.rosa@exemplo.com.br", role: "apostador" })}
        >
          Pular login (mockup)
        </Button>
      </div>
    </div>
  );
}