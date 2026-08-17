import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, HandCoins, PauseCircle, ShieldOff } from "lucide-react";

import { PublicLayout } from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";

const TITULO = "Jogo Responsável — Zon7 BET";
const DESCRICAO = "Ferramentas de limite, pausa e autoexclusão, sinais de alerta e canais de apoio ao apostador.";

export const Route = createFileRoute("/responsible-gambling")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
    ],
  }),
  component: ResponsibleGamblingPage,
});

const ferramentas = [
  { icone: HandCoins, titulo: "Limite de depósito", texto: "Teto diário, semanal ou mensal definido por você. Reduções valem na hora." },
  { icone: ShieldOff, titulo: "Limite de perda", texto: "Interrompe automaticamente a atividade ao atingir o valor configurado." },
  { icone: Clock, titulo: "Tempo de sessão", texto: "Alertas periódicos e encerramento automático após o tempo escolhido." },
  { icone: PauseCircle, titulo: "Pausa e autoexclusão", texto: "Pausas de 7 a 180 dias ou autoexclusão por prazo indeterminado." },
];

const sinais = [
  "Apostar valores acima do que você pode perder.",
  "Tentar recuperar perdas aumentando apostas.",
  "Perder compromissos pessoais ou profissionais por causa do jogo.",
  "Esconder de pessoas próximas o tempo e o dinheiro dedicados ao jogo.",
];

function ResponsibleGamblingPage() {
  return (
    <PublicLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">Proteção ao apostador</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">Jogo responsável</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Apostar deve ser entretenimento, nunca fonte de renda. A Zon7 BET disponibiliza controles diretos na conta e
            monitora sinais de comportamento de risco de forma contínua.
          </p>
          <Button asChild className="mt-8">
            <Link to="/account/limits">Configurar meus limites</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold">Ferramentas disponíveis</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ferramentas.map((f) => (
            <article key={f.titulo} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icone className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{f.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold">Sinais de alerta</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {sinais.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Onde buscar apoio</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Se o jogo deixou de ser diversão, procure ajuda especializada. No Brasil, o CVV atende 24 horas pelo
              telefone 188, e grupos de Jogadores Anônimos oferecem suporte gratuito e sigiloso.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Você também pode solicitar autoexclusão imediata pela sua conta, sem contato com atendimento.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/account/limits">Solicitar autoexclusão</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}