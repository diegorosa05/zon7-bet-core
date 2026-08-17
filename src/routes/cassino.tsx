import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

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
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {abas.map((a) => (
          <Link
            key={a.to + a.rotulo}
            to={a.to}
            activeOptions={{ exact: a.exact ?? false }}
            className="shrink-0 rounded-lg bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-[var(--brand-blue)] data-[status=active]:text-primary-foreground"
          >
            {a.rotulo}
          </Link>
        ))}
      </div>
      <Outlet />
    </BetLayout>
  );
}