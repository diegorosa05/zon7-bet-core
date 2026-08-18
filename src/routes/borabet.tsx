import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";

import logoLime from "@/assets/borabet/logo-lime.png.asset.json";
import markLime from "@/assets/borabet/mark-lime.png.asset.json";
import { GradeEventos } from "@/components/bet/event-card";
import { Carrossel } from "@/components/bet/game-card";
import { CabecalhoSecao } from "@/components/bet/section";
import { ScrollRow } from "@/components/bet/scroll-row";
import { Button } from "@/components/ui/button";
import { eventos, jogos } from "@/data/bet-mock";
import { jogosCrash, provedores } from "@/data/bet-extra";
import { embaralhar, intercalar } from "@/lib/shuffle";

const TITULO = "BoraBet — prévia de identidade visual";
const DESCRICAO =
  "Prévia da identidade BoraBet (verde escuro e lima) aplicada ao lobby de cassino e apostas esportivas.";

/** Tema BoraBet: escopo local, não afeta o restante da Zon7. */
const temaBoraBet = {
  "--background": "oklch(0.24 0.048 173)",
  "--foreground": "oklch(0.97 0.01 160)",
  "--card": "oklch(0.29 0.048 173)",
  "--card-foreground": "oklch(0.97 0.01 160)",
  "--popover": "oklch(0.29 0.048 173)",
  "--primary": "oklch(0.92 0.238 122)",
  "--primary-foreground": "oklch(0.28 0.06 173)",
  "--secondary": "oklch(0.33 0.048 173)",
  "--secondary-foreground": "oklch(0.97 0.01 160)",
  "--muted": "oklch(0.33 0.045 173)",
  "--muted-foreground": "oklch(0.76 0.03 165)",
  "--accent": "oklch(0.36 0.055 173)",
  "--accent-foreground": "oklch(0.97 0.01 160)",
  "--border": "oklch(1 0 0 / 10%)",
  "--input": "oklch(1 0 0 / 14%)",
  "--ring": "oklch(0.92 0.238 122 / 55%)",
} as CSSProperties;

const slots = jogos.filter((j) => j.categoria === "Slots");
const originais = jogos.filter((j) => j.categoria === "Originais");
const aoVivo = jogos.filter((j) => j.categoria === "Ao vivo");
const populares = intercalar(
  embaralhar(slots, 21).slice(0, 10),
  embaralhar(originais, 33).slice(0, 4),
  embaralhar(jogosCrash, 12).slice(0, 3),
).slice(0, 14);

export const Route = createFileRoute("/borabet")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BoraBetPreview,
});

function BoraBetPreview() {
  return (
    <div style={temaBoraBet} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <img src={logoLime.url} alt="BoraBet" width={150} height={34} className="h-7 w-auto object-contain" />
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {["Cassino", "Esportes", "Ao vivo", "Promoções"].map((i) => (
              <span key={i} className="cursor-default transition-colors hover:text-foreground">
                {i}
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="rounded-full text-sm">
              Entrar
            </Button>
            <Button className="rounded-full px-5 text-sm font-semibold">Cadastre-se</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6">
        <section className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <img
            src={markLime.url}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-8 top-1/2 h-[130%] -translate-y-1/2 opacity-15"
          />
          <div className="relative flex flex-col gap-4 p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Prévia de identidade</p>
            <h1 className="max-w-lg text-3xl font-semibold sm:text-4xl">Bora apostar com a BoraBet</h1>
            <p className="max-w-md text-sm opacity-80">
              Mesma estrutura da plataforma, com a paleta verde escuro e lima aplicada aos componentes.
            </p>
            <Button
              variant="secondary"
              className="w-fit rounded-full bg-background px-7 font-semibold text-foreground hover:bg-background/90"
            >
              CADASTRE-SE <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Bônus de boas-vindas", d: "Até R$ 500 no primeiro depósito." },
            { t: "Saque via Pix", d: "Aprovação em minutos, 24/7." },
            { t: "Clube BoraBet", d: "Cashback semanal por nível." },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold">{c.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>

        <Carrossel titulo="Populares agora" lista={populares} />
        <Carrossel titulo="Slots em destaque" lista={embaralhar(slots, 55).slice(0, 14)} />
        <Carrossel titulo="Crash games" lista={embaralhar(jogosCrash, 8)} />

        <section className="space-y-3">
          <CabecalhoSecao titulo="Provedores" descricao="Estúdios disponíveis na plataforma" />
          <ScrollRow gap="gap-2">
            {provedores.map((p) => (
              <span
                key={p}
                className="grid h-16 min-w-[9.5rem] shrink-0 snap-start place-items-center rounded-xl border border-border bg-card px-4 text-xs font-semibold text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </ScrollRow>
        </section>

        <Carrossel titulo="Cassino ao vivo" lista={aoVivo} />

        <section className="space-y-3">
          <CabecalhoSecao titulo="Jogos ao vivo" descricao="Partidas em andamento agora" />
          <GradeEventos
            lista={eventos.filter((e) => e.aoVivo).slice(0, 6)}
            vazio="Nenhuma partida ao vivo no momento."
          />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span>BoraBet — prévia visual, sem apostas reais.</span>
          <Link to="/" className="rounded-sm underline outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
            Voltar para a Zon7
          </Link>
        </footer>
      </main>
    </div>
  );
}
