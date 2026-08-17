import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { LoginGate } from "@/components/shared/login-gate";
import { meta } from "@/components/shared/page-meta";
import { notificacoes } from "@/data/bet-extra";

export const Route = createFileRoute("/notificacoes")({
  head: () =>
    meta(
      "Notificações — Zon7 BET",
      "Depósitos confirmados, apostas liquidadas, avisos de verificação e novidades de promoções da sua conta Zon7 BET.",
    ),
  component: Notificacoes,
});

function Notificacoes() {
  return (
    <BetLayout>
      <div className="space-y-5">
        <CabecalhoSecao nivel="h1" titulo="Notificações" descricao="Avisos da sua conta" />
        <LoginGate recurso="Notificações">
          <ul className="space-y-2">
            {notificacoes.map((n) => (
              <li
                key={n.id}
                className={`flex gap-3 rounded-xl border p-4 ${
                  n.lida ? "border-border bg-card" : "border-primary/40 bg-card"
                }`}
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground">
                  <Bell className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{n.titulo}</p>
                  <p className="text-sm text-muted-foreground">{n.texto}</p>
                </div>
                <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{n.quando}</span>
              </li>
            ))}
          </ul>
        </LoginGate>
      </div>
    </BetLayout>
  );
}
