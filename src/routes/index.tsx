import { Link, createFileRoute } from "@tanstack/react-router";
import { Dot, Play, Ticket, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import bannerCassino from "@/assets/banner-cassino.jpg";
import bannerCrash from "@/assets/banner-crash.jpg";
import bannerEsportes from "@/assets/banner-esportes.jpg";
import { BetLayout } from "@/components/layouts/bet-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { esportes, eventos, jogos, type EventoEsportivo, type JogoCassino } from "@/data/bet-mock";
import { cn } from "@/lib/utils";

const banners = [
  { id: "b1", src: bannerEsportes, alt: "Apostas esportivas ao vivo na Zon7 BET" },
  { id: "b2", src: bannerCassino, alt: "Cassino e mesas ao vivo na Zon7 BET" },
  { id: "b3", src: bannerCrash, alt: "Jogos originais Crash na Zon7 BET" },
];

function CardJogo({ jogo, prioridade }: { jogo: JogoCassino; prioridade?: boolean }) {
  return (
    <Link
      to="/login"
      aria-label={`Jogar ${jogo.nome}`}
      className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-transform hover:-translate-y-1 hover:border-primary/50"
    >
      <img
        src={jogo.capa}
        alt={jogo.nome}
        width={640}
        height={860}
        loading={prioridade ? "eager" : "lazy"}
        className="aspect-[3/4] w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play className="h-5 w-5" />
        </span>
      </span>
      <span className="block truncate px-2.5 py-2 text-xs font-medium">{jogo.nome}</span>
    </Link>
  );
}

function Secao({ titulo, jogos: lista }: { titulo: string; jogos: JogoCassino[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold tracking-wide uppercase">{titulo}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {lista.map((j) => (
          <CardJogo key={j.id} jogo={j} />
        ))}
      </div>
    </section>
  );
}

const TITULO = "Zon7 BET — apostas esportivas, cassino ao vivo e jogos originais";
const DESCRICAO =
  "Aposte em futebol, basquete e eSports ao vivo, jogue Crash, Mines e slots, e acompanhe suas seleções no boletim em tempo real.";

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

interface Selecao {
  chave: string;
  evento: string;
  mercado: string;
  odd: number;
}

function Index() {
  const [esporte, setEsporte] = useState<string>("Populares");
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
        <h2 className="text-sm font-semibold">Boletim de apostas</h2>
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
              <span className="tabular font-semibold text-primary">
                R$ {retorno.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <Button asChild className="w-full glow-primary">
              <Link to="/login">Apostar</Link>
            </Button>
            <p className="text-[11px] text-muted-foreground">
              Demonstração: nenhuma aposta real é registrada.
            </p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <BetLayout aside={boletim}>
      {/* Promoções */}
      <section id="promocoes" className="grid gap-3 md:grid-cols-3">
        {promocoes.map((p, i) => (
          <article
            key={p.id}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border bg-card p-5",
              i === 0 && "md:col-span-2",
            )}
          >
            <div
              className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="surface-grid absolute inset-0 opacity-40" aria-hidden />
            <div className="relative">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                {p.tag}
              </span>
              <h2 className={cn("mt-4 font-semibold", i === 0 ? "text-2xl sm:text-3xl" : "text-lg")}>{p.titulo}</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{p.texto}</p>
              <Button asChild size="sm" className="mt-4">
                <Link to="/register">{p.cta}</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>

      {/* Atalhos */}
      <section className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {atalhos.map((a) => (
          <button
            key={a}
            type="button"
            className="shrink-0 rounded-xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {a}
          </button>
        ))}
      </section>

      {/* Esportes */}
      <section id="esportes" className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold">Junte-se à ação</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-xs text-destructive">
            <Radio className="h-3 w-3" /> ao vivo
          </span>
          <Tabs value={esporte} onValueChange={setEsporte} className="ml-auto">
            <TabsList className="flex-wrap">
              {esportes.map((e) => (
                <TabsTrigger key={e} value={e} className="text-xs">
                  {e}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          {lista.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Nenhuma partida disponível em {esporte} agora.
            </p>
          ) : (
            lista.map((ev) => (
              <div
                key={ev.id}
                className="grid gap-3 border-b border-border px-4 py-4 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    {ev.aoVivo ? (
                      <span className="inline-flex items-center gap-1 font-medium text-destructive">
                        <Dot className="h-4 w-4 animate-pulse" /> {ev.minuto}
                      </span>
                    ) : (
                      <span>{ev.inicio}</span>
                    )}
                    <span>·</span>
                    <span className="truncate">
                      {ev.pais} — {ev.competicao}
                    </span>
                    {ev.destaque && <Flame className="h-3.5 w-3.5 text-primary" />}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{ev.casa}</p>
                      <p className="truncate text-sm font-medium">{ev.fora}</p>
                    </div>
                    {ev.placar && (
                      <div className="tabular ml-auto text-sm font-semibold text-primary lg:ml-6">
                        <p>{ev.placar[0]}</p>
                        <p>{ev.placar[1]}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:w-[26rem]">
                  {ev.mercados.map((m) => {
                    const ativo = selecoes.some((s) => s.chave === `${ev.id}:${m.rotulo}`);
                    return (
                      <button
                        key={m.rotulo}
                        type="button"
                        onClick={() => alternar(ev, m.rotulo, m.odd)}
                        aria-pressed={ativo}
                        className={cn(
                          "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors",
                          ativo
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-secondary hover:border-primary/50",
                        )}
                      >
                        <span className={cn("text-xs", ativo ? "" : "text-muted-foreground")}>{m.rotulo}</span>
                        <span className="tabular font-semibold">{m.odd.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Originais */}
      <section id="originais" className="mt-10">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Originais Zon7</h2>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
          {jogos
            .filter((j) => j.categoria === "Originais")
            .map((j) => (
              <article
                key={j.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div
                  className="absolute -top-10 -right-8 h-28 w-28 rounded-full bg-primary/15 blur-2xl transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{j.provedor}</span>
                    {j.quente && <Flame className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <p className="mt-6 text-base font-semibold">{j.nome}</p>
                  <p className="tabular mt-1 text-xs text-muted-foreground">RTP {j.rtp}</p>
                  <Button asChild size="sm" variant="outline" className="mt-4 w-full">
                    <Link to="/login">Jogar</Link>
                  </Button>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* Cassino */}
      <section id="cassino" className="mt-10 mb-6">
        <h2 className="text-lg font-semibold">Cassino e ao vivo</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {jogos
            .filter((j) => j.categoria !== "Originais")
            .map((j) => (
              <article
                key={j.id}
                className="rounded-2xl border border-border bg-secondary/60 p-4 transition-colors hover:border-primary/50"
              >
                <span className="rounded-full bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {j.categoria}
                </span>
                <p className="mt-6 text-base font-semibold">{j.nome}</p>
                <p className="text-xs text-muted-foreground">{j.provedor}</p>
                <Button asChild size="sm" className="mt-4 w-full">
                  <Link to="/login">Jogar agora</Link>
                </Button>
              </article>
            ))}
        </div>
      </section>
    </BetLayout>
  );
}
