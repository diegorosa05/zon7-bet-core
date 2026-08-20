import type { ReactNode } from "react";

/** Mockup 100% liberado: sessão sempre ativa, nada é bloqueado. */
export function LoginGate({ children }: { children: ReactNode; recurso?: string }) {
  return <>{children}</>;
}