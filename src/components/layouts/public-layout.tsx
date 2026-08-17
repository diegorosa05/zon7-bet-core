import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";

const navegacao = [
  { to: "/", rotulo: "Plataforma" },
  { to: "/responsible-gambling", rotulo: "Jogo responsável" },
  { to: "/terms", rotulo: "Termos" },
  { to: "/privacy", rotulo: "Privacidade" },
] as const;

export function PublicLayout({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" aria-label="Zon7 BET — início">
            <Logo />
          </Link>

          <nav className="hidden justify-center gap-6 lg:flex">
            {navegacao.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="text-sm transition-colors hover:text-foreground"
              >
                {item.rotulo}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            {ready && user ? (
              <Button asChild size="sm">
                <Link to={user.role === "compliance" ? "/admin" : "/account"}>Minha área</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="hidden sm:inline-flex">
                  <Link to="/register">Criar conta</Link>
                </Button>
              </>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="px-4 pt-4">Navegação</SheetTitle>
                <nav className="mt-4 flex flex-col gap-1 px-2">
                  {navegacao.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: "bg-accent" }}
                      activeOptions={{ exact: item.to === "/" }}
                    >
                      {item.rotulo}
                    </Link>
                  ))}
                  <Link to="/login" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                    Entrar
                  </Link>
                  <Link to="/register" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                    Criar conta
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Plataforma de apostas construída em torno de compliance, verificação de identidade e
              proteção ao apostador. Proibido para menores de 18 anos.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Institucional</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link to="/responsible-gambling" className="hover:text-foreground">
                  Jogo responsável
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Conta</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="hover:text-foreground">
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-foreground">
                  Criar conta
                </Link>
              </li>
              <li>
                <Link to="/account/verification" className="hover:text-foreground">
                  Verificação de identidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          Zon7 BET · Ambiente de demonstração — nenhuma aposta real, jogo ou transação financeira
          está disponível.
        </div>
      </footer>
    </div>
  );
}
