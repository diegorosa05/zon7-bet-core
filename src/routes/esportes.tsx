import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import { Betslip } from "@/components/bet/betslip";
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
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {abas.map((a) => (
          <Link
            key={a.rotulo}
            to={a.to}
            activeOptions={{ exact: a.exact ?? false }}
            className="shrink-0 rounded-full bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
          >
            {a.rotulo}
          </Link>
        ))}
      </div>
      <Outlet />
    </BetLayout>
  );
}