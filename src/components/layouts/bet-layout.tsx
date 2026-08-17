import { Link } from "@tanstack/react-router";
import {
  Bomb,
  CalendarClock,
  ChevronDown,
  CircleDot,
  Clock3,
  Dice5,
  Flame,
  Gift,
  Menu,
  Radio,
  Rocket,
  Search,
  Spade,
  Star,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const topo = [
  { rotulo: "Cassino", href: "#cassino", icone: Spade, ativo: true },
  { rotulo: "Esportes", href: "#esportes", icone: Trophy },
  { rotulo: "Pesquisa", href: "#cassino", icone: Search },
];

const atalhosRapidos = [
  { rotulo: "Recompensas", icone: Gift },
  { rotulo: "Desafios", icone: Trophy },
  { rotulo: "Roleta Grátis", icone: CircleDot },
];

const grupos = [
  {
    titulo: "Originais da Zon7",
    ancora: "#originais",
    itens: [
      { rotulo: "Jogado recentemente", icone: Clock3 },
      { rotulo: "Crash", icone: Rocket },
      { rotulo: "Double", icone: Dice5 },
      { rotulo: "Mines", icone: Bomb },
      { rotulo: "Plinko", icone: Star },
      { rotulo: "Limbo", icone: Flame },
    ],
  },
  {
    titulo: "Cassino",
    ancora: "#cassino",
    itens: [
      { rotulo: "Todos os jogos", icone: Spade },
      { rotulo: "Slots em destaque", icone: Gift },
      { rotulo: "Cassino ao vivo", icone: Radio },
    ],
  },
  {
    titulo: "Esportes",
    ancora: "#esportes",
    itens: [
      { rotulo: "As minhas apostas", icone: Ticket },
      { rotulo: "Jogos ao vivo", icone: Radio },
      { rotulo: "Brevemente", icone: CalendarClock },
    ],
  },
  {
    titulo: "Popular",
    ancora: "#esportes",
    itens: [
      { rotulo: "Brasileirão Série A", icone: Trophy },
      { rotulo: "Premier League", icone: Trophy },
      { rotulo: "Liga dos Campeões", icone: Trophy },
      { rotulo: "Itália Serie A", icone: Trophy },
      { rotulo: "Futebol", icone: Users },
    ],
  },
];

function NavLateral() {
  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-3 border-b border-sidebar-border py-3">
        {atalhosRapidos.map((a) => (
          <button
            key={a.rotulo}
            type="button"
            className="flex flex-col items-center gap-1.5 px-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <a.icone className="h-5 w-5 text-primary" />
            {a.rotulo}
          </button>
        ))}
      </div>

      <nav className="pb-6">
        {grupos.map((g) => (
          <Collapsible key={g.titulo} defaultOpen className="border-b border-sidebar-border">
            <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-3.5 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
              {g.titulo}
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="pb-3">
                {g.itens.map((i) => (
                  <li key={i.rotulo}>
                    <a
                      href={g.ancora}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-foreground"
                    >
                      <i.icone className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{i.rotulo}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}

        <p className="px-4 py-4 text-[11px] leading-relaxed text-muted-foreground">
          Ambiente de demonstração. 18+. Jogue com responsabilidade —{" "}
          <Link to="/responsible-gambling" className="text-primary hover:underline">
            saiba mais
          </Link>
          .
        </p>
      </nav>
    </ScrollArea>
  );
}

export function BetLayout({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  const { user, ready } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-sidebar">
        <div className="relative flex h-16 items-center gap-3 px-3 sm:px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="px-4 pt-5">Navegação</SheetTitle>
              <NavLateral />
            </SheetContent>
          </Sheet>

          <Link to="/" aria-label="Zon7 BET — início" className="shrink-0">
            <Logo />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {topo.map((t) => (
              <a
                key={t.rotulo}
                href={t.href}
                className={cn(
                  "flex items-center gap-2 border-b-2 py-[1.35rem] text-[13px] font-medium tracking-wide uppercase transition-colors",
                  t.ativo
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <t.icone className="h-4 w-4 text-primary" />
                {t.rotulo}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {ready && user ? (
              <>
                <span className="tabular hidden rounded-full border border-border bg-card px-3 py-1.5 text-sm sm:inline">
                  R$ 0,00
                </span>
                <Button asChild size="sm" className="rounded-full px-5 font-semibold">
                  <Link to={user.role === "compliance" ? "/admin" : "/account"}>Minha conta</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full px-5 font-semibold">
                  <Link to="/register">Cadastre-se</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 border-r border-border bg-sidebar lg:block">
          <NavLateral />
        </aside>

        <main className="min-w-0 flex-1 px-3 py-6 sm:px-8">{children}</main>

        {aside ? (
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 border-l border-border bg-sidebar xl:block">
            <ScrollArea className="h-full">
              <div className="p-4">{aside}</div>
            </ScrollArea>
          </aside>
        ) : null}
      </div>

      <footer className="border-t border-border bg-sidebar px-4 py-6 text-center text-xs text-muted-foreground">
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
