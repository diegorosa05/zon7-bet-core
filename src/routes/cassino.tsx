import { Outlet, createFileRoute } from "@tanstack/react-router";

import { NavChips } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";

const abas = [
  { rotulo: "Todos os jogos", to: "/cassino" as const, exact: true },
  { rotulo: "Originais da Zon7", to: "/cassino/originais" as const },
  { rotulo: "Slots em destaque", to: "/cassino/slots" as const },
  { rotulo: "Cassino ao vivo", to: "/cassino/ao-vivo" as const },
];

export const Route = createFileRoute("/cassino")({
  component: CassinoLayout,
});

function CassinoLayout() {
  return (
    <BetLayout>
      <div className="space-y-5">
        <NavChips itens={abas} />
        <Outlet />
      </div>
    </BetLayout>
  );
}
