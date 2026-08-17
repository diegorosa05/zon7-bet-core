import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import bannerCassino from "@/assets/banner-cassino.jpg";
import bannerCrash from "@/assets/banner-crash.jpg";
import bannerEsportes from "@/assets/banner-esportes.jpg";
import { Betslip } from "@/components/bet/betslip";
import { GradeEventos } from "@/components/bet/event-card";
import { Carrossel } from "@/components/bet/game-card";
import { BetLayout } from "@/components/layouts/bet-layout";
import { Button } from "@/components/ui/button";
import { eventos, jogos } from "@/data/bet-mock";

const categorias = [
  { rotulo: "Salão", to: "/" as const },
  { rotulo: "Todos os jogos", to: "/cassino" as const },
  { rotulo: "Slots em destaque", to: "/cassino/slots" as const },
  { rotulo: "Cassino ao vivo", to: "/cassino/ao-vivo" as const },
  { rotulo: "Originais da Zon7", to: "/cassino/originais" as const },
  { rotulo: "Jogos ao vivo", to: "/esportes/ao-vivo" as const },
  { rotulo: "Pesquisa", to: "/pesquisa" as const },
];

const TITULO = "Zon7 BET — cassino online, jogos originais e apostas esportivas";
const DESCRICAO =
  "Jogue Crash, Mines, Double e slots em destaque, aposte em futebol, basquete e eSports ao vivo e acompanhe seu cupom em tempo real na Zon7 BET.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <BetLayout aside={<Betslip />}>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl">
        <img
          src={bannerEsportes}
          alt="Boas-vindas à Zon7 BET"
          width={1600}
          height={500}
          className="h-[19rem] w-full object-cover sm:h-[21rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center gap-5 p-6 sm:p-10">
          <div>
            <h1 className="max-w-md text-3xl font-semibold sm:text-4xl">Bem-vindo à Zon7 BET!</h1>
            <p className="mt-3 max-w-xs text-base text-muted-foreground">
              Cadastre-se e desbloqueie sua experiência exclusiva
            </p>
          </div>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {["Cadastre-se", "Verifique", "Jogue", "Desbloqueie sua recompensa"].map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                <span>{p}</span>
              </li>
            ))}
          </ol>
          <Button asChild className="w-fit rounded-full px-7 font-semibold">
            <Link to="/register">CADASTRE-SE</Link>
          </Button>
        </div>
      </section>

      {/* Promos */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          {
            titulo: "Recompensas únicas",
            texto: "Ganhe recompensas exclusivas através de desafios especiais.",
            img: bannerCassino,
          },
          {
            titulo: "Indique um amigo",
            texto: "Convide amigos e ganhe recompensa por cada indicação bem-sucedida.",
            img: bannerCrash,
          },
        ].map((p) => (
          <Link
            key={p.titulo}
            to="/register"
            className="group relative overflow-hidden rounded-xl border border-border"
          >
            <img src={p.img} alt="" width={1200} height={600} loading="lazy" className="h-56 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div>
                <h2 className="text-xl font-semibold">{p.titulo}</h2>
                <p className="mt-2 max-w-[16rem] text-sm text-muted-foreground">{p.texto}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ChevronRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Categorias */}
      <div className="-mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1">
        {categorias.map((c) => (
          <Link
            key={c.rotulo}
            to={c.to}
            activeOptions={{ exact: true }}
            className="shrink-0 rounded-lg bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-[var(--brand-blue)] data-[status=active]:text-primary-foreground"
          >
            {c.rotulo}
          </Link>
        ))}
      </div>

      <Carrossel titulo="Populares agora" lista={jogos.slice(0, 8)} verTodos="/cassino" />
      <Carrossel
        titulo="Originais da Zon7"
        lista={jogos.filter((j) => j.categoria === "Originais")}
        verTodos="/cassino/originais"
      />
      <Carrossel titulo="Slots em destaque" lista={jogos.filter((j) => j.categoria === "Slots")} verTodos="/cassino/slots" />
      <Carrossel titulo="Cassino ao vivo" lista={jogos.filter((j) => j.categoria === "Ao vivo")} verTodos="/cassino/ao-vivo" />

      {/* Esportes */}
      <section className="mt-10 mb-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Jogos ao vivo</h2>
          <Link to="/esportes" className="flex items-center text-xs text-muted-foreground hover:text-foreground">
            Ver todos <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <GradeEventos lista={eventos.slice(0, 6)} vazio="Nenhuma partida disponível agora." />
      </section>
    </BetLayout>
  );
}
