import { Link } from "@tanstack/react-router";
import { Home, Search, Spade, Trophy, User, Wallet } from "lucide-react";

import { useAuth } from "@/lib/auth";

export function MobileNav() {
  const { user } = useAuth();

  const itens = [
    { to: "/" as const, rotulo: "Início", icone: Home, exato: true },
    { to: "/cassino" as const, rotulo: "Cassino", icone: Spade },
    { to: "/esportes" as const, rotulo: "Esportes", icone: Trophy },
    user
      ? { to: "/carteira" as const, rotulo: "Carteira", icone: Wallet }
      : { to: "/pesquisa" as const, rotulo: "Pesquisa", icone: Search },
    user
      ? {
          to: (user.role === "compliance" ? "/admin" : "/account") as "/admin" | "/account",
          rotulo: "Conta",
          icone: User,
        }
      : { to: "/login" as const, rotulo: "Entrar", icone: User },
  ];

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-sidebar/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {itens.map((i) => (
          <li key={i.rotulo}>
            <Link
              to={i.to}
              activeOptions={{ exact: Boolean((i as { exato?: boolean }).exato) }}
              className="flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[status=active]:text-primary"
            >
              <i.icone className="h-5 w-5" />
              <span className="truncate">{i.rotulo}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}