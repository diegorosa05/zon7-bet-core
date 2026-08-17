import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileSearch, Fingerprint, HeartPulse, Lock, ScrollText, ShieldCheck } from "lucide-react";

import { PublicLayout } from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";

const TITULO = "Zon7 BET — plataforma de apostas com compliance no centro";
const DESCRICAO =
  "Infraestrutura de apostas com KYC, jogo responsável, trilha de auditoria e governança de risco desde o primeiro cadastro.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
    ],
  }),
  component: Index,
});

const pilares = [
  {
    icone: Fingerprint,
    titulo: "KYC em camadas",
    texto: "Verificação progressiva de identidade, prova de vida e origem de recursos antes de qualquer operação.",
  },
  {
    icone: HeartPulse,
    titulo: "Jogo responsável",
    texto: "Limites de depósito, perda e tempo de sessão, pausa e autoexclusão sob controle do apostador.",
  },
  {
    icone: FileSearch,
    titulo: "Fila de análise",
    texto: "Casos de KYC, AML e risco priorizados por SLA, com decisão registrada e justificada.",
  },
  {
    icone: ScrollText,
    titulo: "Trilha de auditoria",
    texto: "Registro imutável de cada acesso, decisão e alteração de configuração da plataforma.",
  },
];

const numeros = [
  { valor: "100%", rotulo: "das decisões auditadas" },
  { valor: "< 12h", rotulo: "SLA médio de análise" },
  { valor: "4", rotulo: "camadas de verificação" },
  { valor: "24/7", rotulo: "monitoramento de risco" },
];

function Index() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="surface-grid absolute inset-0 opacity-60" aria-hidden />
        <div
          className="absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Regulação, KYC e proteção ao apostador
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            A plataforma de apostas que trata <span className="text-primary">compliance</span> como produto.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Zon7 BET reúne verificação de identidade, controles de jogo responsável e auditoria contínua em uma
            experiência única — para o apostador e para o time de compliance.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="glow-primary">
              <Link to="/register">
                Criar conta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/responsible-gambling">Como protegemos o apostador</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.rotulo} className="min-w-0">
              <p className="tabular text-2xl font-semibold text-primary sm:text-3xl">{n.valor}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.rotulo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pilares */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">Quatro pilares operacionais</h2>
          <p className="mt-3 text-muted-foreground">
            Cada área da plataforma nasce de um requisito regulatório concreto — nada de camada de conformidade
            adicionada depois.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {pilares.map((p) => (
            <article
              key={p.titulo}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icone className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold sm:text-3xl">Pronto para conhecer a plataforma?</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Crie uma conta de demonstração e navegue pela área do apostador e pelo painel de compliance. Nenhum jogo,
              aposta ou meio de pagamento está habilitado nesta etapa.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg">
              <Link to="/register">Criar conta</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">
                <Lock className="h-4 w-4" />
                Entrar
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
