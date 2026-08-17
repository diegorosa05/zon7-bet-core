import { useRouterState } from "@tanstack/react-router";
import {
  History,
  IdCard,
  LayoutDashboard,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

import { AppShell, type ItemNav } from "@/components/layouts/app-shell";
import { RestrictedGate } from "@/components/shared/restricted-gate";

const itens: ItemNav[] = [
  { to: "/account", rotulo: "Visão geral", icone: LayoutDashboard, exato: true },
  { to: "/account/profile", rotulo: "Perfil", icone: UserRound },
  { to: "/account/verification", rotulo: "Verificação", icone: IdCard },
  { to: "/account/limits", rotulo: "Limites", icone: SlidersHorizontal },
  { to: "/account/security", rotulo: "Segurança", icone: ShieldCheck },
  { to: "/account/history", rotulo: "Histórico", icone: History },
];

/** Rotas liberadas antes da aprovação da conta. */
const LIVRES = ["/account", "/account/profile", "/account/verification"];

const RECURSOS: Record<string, string> = {
  "/account/limits": "Limites e jogo responsável",
  "/account/security": "Configurações de segurança",
  "/account/history": "Histórico da conta",
};

export function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const restrito = !LIVRES.includes(pathname);

  return (
    <AppShell area="Área do apostador" papelExigido="apostador" itens={itens}>
      {restrito ? (
        <RestrictedGate recurso={RECURSOS[pathname] ?? "Este recurso"}>{children}</RestrictedGate>
      ) : (
        children
      )}
    </AppShell>
  );
}
