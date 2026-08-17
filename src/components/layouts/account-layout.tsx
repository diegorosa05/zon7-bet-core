import { History, IdCard, LayoutDashboard, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { AppShell, type ItemNav } from "@/components/layouts/app-shell";

const itens: ItemNav[] = [
  { to: "/account", rotulo: "Visão geral", icone: LayoutDashboard, exato: true },
  { to: "/account/profile", rotulo: "Perfil", icone: UserRound },
  { to: "/account/verification", rotulo: "Verificação", icone: IdCard },
  { to: "/account/limits", rotulo: "Limites", icone: SlidersHorizontal },
  { to: "/account/security", rotulo: "Segurança", icone: ShieldCheck },
  { to: "/account/history", rotulo: "Histórico", icone: History },
];

export function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell area="Área do apostador" papelExigido="apostador" itens={itens}>
      {children}
    </AppShell>
  );
}