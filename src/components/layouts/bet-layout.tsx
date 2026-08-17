import { Link } from "@tanstack/react-router";
import {
  Bomb,
  Dice5,
  Flame,
  Gift,
  Menu,
  Radio,
  Rocket,
  Search,
  Spade,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";

const topo = [
  { rotulo: "Cassino", href: "#cassino" },
  { rotulo: "Esportes", href: "#esportes" },
  { rotulo: "Ao vivo", href: "#esportes" },
];

const grupos = [
  {
    titulo: "Originais",
    itens: [
      { rotulo: "Crash", icone: Rocket },
      { rotulo: "Double", icone: Dice5 },
      { rotulo: "Mines", icone: Bomb },
      { rotulo: "Plinko", icone: Star },
      { rotulo: "Limbo", icone: Flame },
    ],
  },
  {
    titulo: "Cassino",
    itens: [
      { rotulo: "Todos os jogos", icone: Spade },
      { rotulo: "Slots", icone: Gift },
      { rotulo: "Ao vivo", icone: Radio },
    ],
  },
  {
    titulo: "Esportes",
    itens: [
      { rotulo: "Próximos jogos", icone: Trophy },
      { rotulo: "Apostas ao vivo", icone: Radio },
      { rotulo: "Bolão", icone: Users },
    ],
  },
];

function NavLateral() {
  return (
    <ScrollArea className="h-full">
      <nav className="space-y-6 px-3 py-4">
        {grupos.map((g) => (
          <div key={g.titulo}>
            <p className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              {g.titulo}
            </p>
            <ul className="space-y-0.5">
              {g.itens.map((i) => (
                <li key={i.rotulo}>
                  <a
                    href={
                      g.titulo === "Esportes" ? "#esportes" : g.titulo === "Originais" ? "#originais" : "#cassino"
                    }
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <i.icone className="h-4 w-4 text-primary/80" />
                    {i.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
          Ambiente de demonstração. 18+. Jogue com responsabilidade —{" "}
          <Link to="/responsible-gambling" className="text-primary hover:underline">
            saiba mais
          </Link>
          .
        </div>
      </nav>
    </ScrollArea>
  );
}

export function BetLayout({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  const { user, ready } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-3 sm:px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="px-6 pt-5">Navegação</SheetTitle>
              <NavLateral />
            </SheetContent>
          </Sheet>

          <Link to="/" aria-label="Zon7 BET — início" className="shrink-0">
            <Logo />
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">
            {topo.map((t) => (
              <a
                key={t.rotulo}
                href={t.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {t.rotulo}
              </a>
            ))}
          </nav>

          <div className="relative ml-auto hidden w-64 xl:block">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar jogos e partidas" className="h-9 pl-9" />
          </div>

          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            {ready && user ? (
              <>
                <span className="tabular hidden rounded-lg border border-border bg-card px-3 py-1.5 text-sm sm:inline">
                  R$ 0,00
                </span>
                <Button asChild size="sm">
                  <Link to={user.role === "compliance" ? "/admin" : "/account"}>Minha conta</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="glow-primary">
                  <Link to="/register">Registrar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r border-border bg-sidebar lg:block">
          <NavLateral />
        </aside>

        <main className="min-w-0 flex-1 px-3 py-4 sm:px-5">{children}</main>

        {aside ? (
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-80 shrink-0 border-l border-border bg-sidebar xl:block">
            <ScrollArea className="h-full">
              <div className="p-4">{aside}</div>
            </ScrollArea>
          </aside>
        ) : null}
      </div>

      <footer className="border-t border-border bg-card/40 px-4 py-6 text-center text-xs text-muted-foreground">
        Zon7 BET · Demonstração sem apostas reais · 18+ ·{" "}
        <Link to="/responsible-gambling" className="hover:text-foreground">
          Jogo responsável
        </Link>{" "}
        ·{" "}
        <Link to="/terms" className="hover:text-foreground">
          Termos
        </Link>{" "}
        ·{" "}
        <Link to="/privacy" className="hover:text-foreground">
          Privacidade
        </Link>
      </footer>
    </div>
  );
}