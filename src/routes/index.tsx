import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Play, Radio, Ticket, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import bannerCassino from "@/assets/banner-cassino.jpg";
import bannerCrash from "@/assets/banner-crash.jpg";
import bannerEsportes from "@/assets/banner-esportes.jpg";
import { BetLayout } from "@/components/layouts/bet-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { esportes, eventos, jogos, type EventoEsportivo, type JogoCassino } from "@/data/bet-mock";
import { cn } from "@/lib/utils";

const categorias = [
  "Salão",
  "Todos os jogos",
  "Slots em destaque",
  "Cassino ao vivo",
  "Casual",
  "Jogos ao vivo",
  "Originais da Zon7",
];

function CardJogo({ jogo }: { jogo: JogoCassino }) {
  return (
    <Link
      to="/login"
      aria-label={`Jogar ${jogo.nome}`}
      className="group relative block w-[8.5rem] shrink-0 overflow-hidden rounded-lg bg-card transition-transform hover:-translate-y-1 sm:w-[9.5rem]"
    >
      <img
        src={jogo.capa}
        alt={jogo.nome}
        width={640}
        height={860}
        loading="lazy"
        className="aspect-[3/4] w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play className="h-4 w-4" />
        </span>
      </span>
      <span className="block truncate px-2 pt-2 text-xs font-semibold">{jogo.nome}</span>
      <span className="block truncate px-2 pb-2 text-[11px] text-muted-foreground">{jogo.provedor}</span>
    </Link>
  );
}

function Carrossel({ id, titulo, lista }: { id?: string; titulo: string; lista: JogoCassino[] }) {
  return (
    <section id={id} className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{titulo}</h2>
        <button type="button" className="flex items-center text-xs text-muted-foreground hover:text-foreground">
          Ver todos <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="-mx-1 mt-3 flex gap-3 overflow-x-auto px-1 pb-2">
        {lista.map((j) => (
          <CardJogo key={`${titulo}-${j.id}`} jogo={j} />
        ))}
      </div>
    </section>
  );
}

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

interface Selecao {
  chave: string;
  evento: string;
  mercado: string;
  odd: number;
}

function Index() {
  const [esporte, setEsporte] = useState<string>("Populares");
  const [categoria, setCategoria] = useState<string>("Salão");
  const [selecoes, setSelecoes] = useState<Selecao[]>([]);
  const [valor, setValor] = useState("30");

  const lista = useMemo(
    () => (esporte === "Populares" ? eventos : eventos.filter((e) => e.esporte === esporte)),
    [esporte],
  );

  const oddTotal = selecoes.reduce((acc, s) => acc * s.odd, 1);
  const retorno = (Number(valor.replace(",", ".")) || 0) * (selecoes.length ? oddTotal : 0);

  function alternar(ev: EventoEsportivo, mercado: string, odd: number) {
    const chave = `${ev.id}:${mercado}`;
    setSelecoes((atual) => {
      if (atual.some((s) => s.chave === chave)) return atual.filter((s) => s.chave !== chave);
      const semMesmoEvento = atual.filter((s) => !s.chave.startsWith(`${ev.id}:`));
      return [...semMesmoEvento, { chave, evento: `${ev.casa} x ${ev.fora}`, mercado, odd }];
    });
  }

  const boletim = (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Ticket className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold">Cupom</h2>
        <span className="tabular ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
          {selecoes.length}
        </span>
      </div>

      {selecoes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          Toque em uma odd para montar sua aposta.
        </p>
      ) : (
        <>
          <ul className="space-y-2">
            {selecoes.map((s) => (
              <li key={s.chave} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-start gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{s.evento}</p>
                    <p className="text-xs text-muted-foreground">Resultado final · {s.mercado}</p>
                  </div>
                  <span className="tabular ml-auto text-sm font-semibold text-primary">{s.odd.toFixed(2)}</span>
                  <button
                    type="button"
                    aria-label="Remover seleção"
                    onClick={() => setSelecoes((a) => a.filter((x) => x.chave !== s.chave))}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-2 rounded-xl border border-border bg-card p-3">
            <label className="text-xs text-muted-foreground" htmlFor="valor-aposta">
              Valor da aposta (R$)
            </label>
            <Input
              id="valor-aposta"
              inputMode="decimal"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="tabular h-9"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Odd total</span>
              <span className="tabular font-semibold">{oddTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Retorno estimado</span>
              <span className="tabular font-semibold text-primary">R$ {retorno.toFixed(2).replace(".", ",")}</span>
            </div>
            <Button asChild className="w-full rounded-full font-semibold">
              <Link to="/login">Apostar</Link>
            </Button>
            <p className="text-[11px] text-muted-foreground">Demonstração: nenhuma aposta real é registrada.</p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <BetLayout aside={boletim}>
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
      <div id="cassino" className="-mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategoria(c)}
            className={cn(
              "shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              categoria === c
                ? "bg-[var(--brand-blue)] text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <Carrossel titulo="Populares agora" lista={jogos.slice(0, 8)} />
      <Carrossel id="originais" titulo="Originais da Zon7" lista={jogos.filter((j) => j.categoria === "Originais")} />
      <Carrossel titulo="Slots em destaque" lista={jogos.filter((j) => j.categoria === "Slots")} />
      <Carrossel titulo="Cassino ao vivo" lista={jogos.filter((j) => j.categoria === "Ao vivo")} />

      {/* Esportes */}
      <section id="esportes" className="mt-10 mb-6">
        <h2 className="text-base font-semibold">Esportes</h2>

        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {esportes.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEsporte(e)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                esporte === e ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {e}
            </button>
          ))}
        </div>

        {lista.length === 0 ? (
          <p className="mt-4 rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Nenhuma partida disponível em {esporte} agora.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {lista.map((ev) => (
              <article key={ev.id} className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="truncate">
                    {ev.pais} · {ev.competicao}
                  </span>
                  {ev.aoVivo && (
                    <span className="ml-auto flex shrink-0 items-center gap-1 text-primary">
                      <Radio className="h-3.5 w-3.5 animate-pulse" />
                      {ev.minuto}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{ev.aoVivo ? "Ao vivo" : ev.inicio}</p>

                <div className="mt-3 space-y-1.5">
                  {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="truncate text-sm">{i === 0 ? ev.casa : ev.fora}</span>
                      {ev.placar && (
                        <span className="tabular ml-auto grid h-6 w-6 place-items-center rounded bg-secondary text-xs font-semibold">
                          {ev.placar[i]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[11px] text-muted-foreground">1x2</p>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {ev.mercados.map((m) => {
                    const ativo = selecoes.some((s) => s.chave === `${ev.id}:${m.rotulo}`);
                    return (
                      <button
                        key={m.rotulo}
                        type="button"
                        onClick={() => alternar(ev, m.rotulo, m.odd)}
                        aria-pressed={ativo}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
                          ativo
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary hover:bg-accent",
                        )}
                      >
                        <span className={cn("text-xs", ativo ? "" : "text-muted-foreground")}>
                          {m.rotulo === "X" ? "empate" : m.rotulo}
                        </span>
                        <span className="tabular font-semibold">{m.odd.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </BetLayout>
  );
}
