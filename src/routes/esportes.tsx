import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Betslip } from "@/components/bet/betslip";
import { NavChips } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";

const abas = [
  { rotulo: "Populares", to: "/esportes" as const, exact: true },
  { rotulo: "Ao vivo", to: "/esportes/ao-vivo" as const },
  { rotulo: "Próximos", to: "/esportes/proximos" as const },
];

export const Route = createFileRoute("/esportes")({
  component: EsportesLayout,
});

function EsportesLayout() {
  return (
    <BetLayout aside={<Betslip />}>
      <div className="space-y-5">
        <NavChips itens={abas} />
        <Outlet />
      </div>
    </BetLayout>
  );
}
