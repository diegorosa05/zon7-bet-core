import { ClipboardList, Gauge, ScrollText, Settings, Users } from "lucide-react";
import type { ReactNode } from "react";

import { AppShell, type ItemNav } from "@/components/layouts/app-shell";

const itens: ItemNav[] = [
  { to: "/admin", rotulo: "Painel", icone: Gauge, exato: true },
  { to: "/admin/users", rotulo: "Usuários", icone: Users },
  { to: "/admin/reviews", rotulo: "Fila de análise", icone: ClipboardList },
  { to: "/admin/audit", rotulo: "Auditoria", icone: ScrollText },
  { to: "/admin/settings", rotulo: "Configurações", icone: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell area="Compliance & Administração" papelExigido="compliance" itens={itens}>
      {children}
    </AppShell>
  );
}
