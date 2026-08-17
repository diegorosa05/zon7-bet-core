import { Link, createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail, MessageCircle, Phone } from "lucide-react";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { meta } from "@/components/shared/page-meta";
import { Button } from "@/components/ui/button";

const canais = [
  { icone: MessageCircle, titulo: "Chat ao vivo", texto: "Atendimento 24 horas, todos os dias.", acao: "Abrir chat" },
  { icone: Mail, titulo: "E-mail", texto: "suporte@zon7.bet — resposta em até 24 h.", acao: "Enviar e-mail" },
  { icone: Phone, titulo: "Ouvidoria", texto: "0800 000 7000 — dias úteis, 9h às 18h.", acao: "Ligar" },
];

export const Route = createFileRoute("/suporte")({
  head: () =>
    meta(
      "Central de ajuda e suporte — Zon7 BET",
      "Fale com o suporte 24/7 por chat, e-mail ou ouvidoria e consulte as dúvidas mais frequentes da Zon7 BET.",
    ),
  component: Suporte,
});

function Suporte() {
  return (
    <BetLayout>
      <div className="space-y-6">
        <CabecalhoSecao
          nivel="h1"
          titulo="Central de ajuda"
          descricao="Estamos disponíveis 24 horas por dia"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {canais.map((c) => (
            <article key={c.titulo} className="rounded-xl border border-border bg-card p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary">
                <c.icone className="h-4 w-4" />
              </span>
              <h2 className="mt-3 text-sm font-semibold">{c.titulo}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.texto}</p>
              <Button size="sm" variant="outline" className="mt-4 rounded-full">
                {c.acao}
              </Button>
            </article>
          ))}
        </div>

        <section className="rounded-xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <LifeBuoy className="h-4 w-4 text-primary" /> Dúvidas frequentes
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Depósitos, saques, verificação de conta, bônus e limites respondidos em um só lugar.
          </p>
          <Button asChild size="sm" className="mt-4 rounded-full px-5">
            <Link to="/faq">Ver perguntas frequentes</Link>
          </Button>
        </section>
      </div>
    </BetLayout>
  );
}
