import { Link } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
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
  Receipt,
  Rocket,
  Search,
  Spade,
  Star,
  Ticket,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { SiteFooter } from "@/components/layouts/site-footer";
import { MobileNav } from "@/components/layouts/mobile-nav";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const topo = [
  { rotulo: "Cassino", to: "/cassino" as const, icone: Spade },
  { rotulo: "Esportes", to: "/esportes" as const, icone: Trophy },
  { rotulo: "Pesquisa", to: "/pesquisa" as const, icone: Search },
];

const atalhosRapidos = [
  { rotulo: "Recompensas", icone: Gift, to: "/recompensas" as const },
  { rotulo: "Clube VIP", icone: Star, to: "/vip" as const },
  { rotulo: "Roleta Grátis", icone: CircleDot, to: "/roleta" as const },
];

const grupos = [
  {
    titulo: "Minha conta",
    itens: [
      { rotulo: "Carteira", icone: Wallet, to: "/carteira" as const },
      { rotulo: "Depositar", icone: ArrowDownToLine, to: "/carteira/deposito" as const },
      { rotulo: "Sacar", icone: ArrowUpFromLine, to: "/carteira/saque" as const },
      { rotulo: "Transações", icone: Receipt, to: "/carteira/transacoes" as const },
      { rotulo: "Minhas apostas", icone: Ticket, to: "/apostas" as const },
      { rotulo: "Meus bônus", icone: Gift, to: "/bonus" as const },
      { rotulo: "Favoritos", icone: Star, to: "/favoritos" as const },
      { rotulo: "Notificações", icone: Radio, to: "/notificacoes" as const },
      { rotulo: "Promoções", icone: Gift, to: "/promocoes" as const },
      { rotulo: "Desafios", icone: Trophy, to: "/desafios" as const },
    ],
  },
  {
    titulo: "Originais da Zon7",
    itens: [
      { rotulo: "Jogado recentemente", icone: Clock3, to: "/cassino" as const },
      { rotulo: "Crash", icone: Rocket, to: "/cassino/originais" as const },
      { rotulo: "Double", icone: Dice5, to: "/cassino/originais" as const },
      { rotulo: "Mines", icone: Bomb, to: "/cassino/originais" as const },
      { rotulo: "Plinko", icone: Star, to: "/cassino/originais" as const },
      { rotulo: "Limbo", icone: Flame, to: "/cassino/originais" as const },
    ],
  },
  {
    titulo: "Cassino",
    itens: [
      { rotulo: "Todos os jogos", icone: Spade, to: "/cassino" as const },
      { rotulo: "Slots em destaque", icone: Gift, to: "/cassino/slots" as const },
      { rotulo: "Crash games", icone: Rocket, to: "/cassino/crash" as const },
      { rotulo: "Cassino ao vivo", icone: Radio, to: "/cassino/ao-vivo" as const },
    ],
  },
  {
    titulo: "Esportes",
    itens: [
      { rotulo: "As minhas apostas", icone: Ticket, to: "/apostas" as const },
      { rotulo: "Jogos ao vivo", icone: Radio, to: "/esportes/ao-vivo" as const },
      { rotulo: "Brevemente", icone: CalendarClock, to: "/esportes/proximos" as const },
    ],
  },
  {
    titulo: "Ajuda",
    itens: [
      { rotulo: "Central de ajuda", icone: Users, to: "/suporte" as const },
      { rotulo: "Perguntas frequentes", icone: Clock3, to: "/faq" as const },
    ],
  },
  {
    titulo: "Popular",
    itens: [
      { rotulo: "Brasileirão Série A", icone: Trophy, to: "/esportes" as const },
      { rotulo: "Premier League", icone: Trophy, to: "/esportes" as const },
      { rotulo: "Liga dos Campeões", icone: Trophy, to: "/esportes" as const },
      { rotulo: "Itália Serie A", icone: Trophy, to: "/esportes" as const },
      { rotulo: "Futebol", icone: Users, to: "/esportes" as const },
    ],
  },
];

function NavLateral() {
  return (
    <ScrollArea className="h-full">
      <div className="grid grid-cols-3 border-b border-sidebar-border py-3">
        {atalhosRapidos.map((a) => (
          <Link
            key={a.rotulo}
            to={a.to}
            className="flex flex-col items-center gap-1.5 px-1 text-[11px] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[status=active]:text-primary"
          >
            <a.icone className="h-5 w-5 text-primary" />
            {a.rotulo}
          </Link>
        ))}
      </div>

      <nav className="pb-6">
        {grupos.map((g) => (
          <Collapsible key={g.titulo} defaultOpen className="border-b border-sidebar-border">
            <CollapsibleTrigger className="group flex w-full items-center justify-between px-3 py-3 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {g.titulo}
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="space-y-0.5 px-2 pb-3">
                {g.itens.map((i) => (
                  <li key={`${g.titulo}-${i.rotulo}`}>
                    <Link
                      to={i.to}
                      activeOptions={{ exact: true }}
                      className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] text-foreground/80 outline-none transition-colors hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[status=active]:bg-sidebar-accent data-[status=active]:text-primary"
                    >
                      <i.icone className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{i.rotulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}

        <p className="px-3 py-4 text-[11px] leading-relaxed text-muted-foreground">
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
              <Link
                key={t.rotulo}
                to={t.to}
                className={cn(
                  "flex items-center gap-2 border-b-2 border-transparent py-[1.35rem] text-[13px] font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground",
                  "data-[status=active]:border-primary data-[status=active]:text-foreground",
                )}
              >
                <t.icone className="h-4 w-4 text-primary" />
                {t.rotulo}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {ready && user ? (
              <>
                <Link
                  to="/carteira"
                  className="tabular hidden rounded-full border border-border bg-card px-3 py-1.5 text-sm outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring sm:inline"
                >
                  R$ 1.284,50
                </Link>
                <Button asChild size="sm" className="rounded-full px-5 font-semibold">
                  <Link to="/carteira/deposito">Depositar</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full px-4">
                  <Link to={user.role === "compliance" ? "/admin" : "/account"}>Minha conta</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/promocoes">Promoções</Link>
                </Button>
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

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="mx-auto w-full max-w-[105rem] min-w-0 flex-1 px-3 py-5 pb-24 sm:px-6 lg:pb-5">
            {children}
          </main>
          <SiteFooter />
          <div className="h-16 lg:hidden" aria-hidden />
        </div>

        {aside ? (
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 border-l border-border bg-sidebar xl:block">
            <ScrollArea className="h-full">
              <div className="p-4">{aside}</div>
            </ScrollArea>
          </aside>
        ) : null}
      </div>
      <MobileNav />
    </div>
  );
}
