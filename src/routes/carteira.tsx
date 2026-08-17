import { Outlet, createFileRoute } from "@tanstack/react-router";

import { NavChips } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";

const abas = [
  { rotulo: "Resumo", to: "/carteira" as const, exact: true },
  { rotulo: "Depositar", to: "/carteira/deposito" as const },
  { rotulo: "Sacar", to: "/carteira/saque" as const },
  { rotulo: "Transações", to: "/carteira/transacoes" as const },
];

export const Route = createFileRoute("/carteira")({
  component: CarteiraLayout,
});

function CarteiraLayout() {
  return (
    <BetLayout>
      <div className="space-y-5">
        <NavChips itens={abas} />
        <LoginGate recurso="Carteira">
          <Outlet />
        </LoginGate>
      </div>
    </BetLayout>
  );
}