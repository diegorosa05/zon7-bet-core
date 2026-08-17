import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Repeat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth, type Role } from "@/lib/auth";
import { iniciais } from "@/lib/format";

export interface ItemNav {
  to: string;
  rotulo: string;
  icone: LucideIcon;
  exato?: boolean;
}

export function AppShell({
  area,
  papelExigido,
  itens,
  children,
}: {
  area: string;
  papelExigido: Role;
  itens: ItemNav[];
  children: ReactNode;
}) {
  const { user, ready, sair, trocarPapel } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!ready) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="mt-6 h-64 w-full" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== papelExigido) {
    return <Navigate to={user.role === "compliance" ? "/admin" : "/account"} replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader className="px-3 py-4">
            <Link to="/" aria-label="Zon7 BET — início">
              <Logo />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{area}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itens.map((item) => {
                    const ativo = item.exato ? pathname === item.to : pathname.startsWith(item.to);
                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={ativo} tooltip={item.rotulo}>
                          <Link to={item.to}>
                            <item.icone className="h-4 w-4" />
                            <span>{item.rotulo}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-3 py-4 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
            Ambiente de demonstração — sem apostas reais.
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="min-w-0">
          <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
            <SidebarTrigger />
            <p className="truncate text-sm text-muted-foreground">{area}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {iniciais(user.nome)}
                  </span>
                  <span className="hidden max-w-[10rem] truncate sm:inline">{user.nome}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    trocarPapel(user.role === "compliance" ? "apostador" : "compliance")
                  }
                >
                  <Repeat className="h-4 w-4" />
                  Alternar para {user.role === "compliance" ? "apostador" : "compliance"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={sair}>
                  <LogOut className="h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8 sm:px-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
