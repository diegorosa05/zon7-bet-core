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
      {/* Banners */}
      <section className="space-y-3">
        <Link to="/register" className="block overflow-hidden rounded-xl border border-border">
          <img
            src={banners[0]!.src}
            alt={banners[0]!.alt}
            width={1600}
            height={500}
            className="aspect-[16/5] w-full object-cover"
          />
        </Link>
        <div className="grid gap-3 sm:grid-cols-2">
          {banners.slice(1).map((b) => (
            <Link key={b.id} to="/register" className="block overflow-hidden rounded-xl border border-border">
              <img
                src={b.src}
                alt={b.alt}
                width={1600}
                height={640}
                loading="lazy"
                className="aspect-[16/6] w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Slots */}
      <Secao titulo="Slots" jogos={jogos.filter((j) => j.categoria === "Slots")} />

      {/* Originais */}
      <Secao titulo="Originais Zon7" jogos={jogos.filter((j) => j.categoria === "Originais")} />

      {/* Ao vivo */}
      <Secao titulo="Cassino ao vivo" jogos={jogos.filter((j) => j.categoria === "Ao vivo")} />

      {/* Esportes */}
      <section id="esportes" className="mt-10 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Esportes</h2>
          <Tabs value={esporte} onValueChange={setEsporte} className="ml-auto">
            <TabsList className="flex-wrap bg-transparent">
              {esportes.map((e) => (
                <TabsTrigger key={e} value={e} className="text-xs">
                  {e}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
          {lista.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Nenhuma partida disponível em {esporte} agora.
            </p>
          ) : (
            lista.map((ev) => (
              <div
                key={ev.id}
                className="grid gap-3 border-b border-border px-4 py-3 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    {ev.aoVivo ? (
                      <span className="inline-flex items-center gap-1 font-medium text-primary">
                        <Dot className="h-4 w-4 animate-pulse" /> {ev.minuto}
                      </span>
                    ) : (
                      <span>{ev.inicio}</span>
                    )}
                    <span>·</span>
                    <span className="truncate">{ev.competicao}</span>
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{ev.casa}</p>
                      <p className="truncate text-sm">{ev.fora}</p>
                    </div>
                    {ev.placar && (
                      <div className="tabular ml-auto text-sm font-semibold text-primary lg:ml-6">
                        <p>{ev.placar[0]}</p>
                        <p>{ev.placar[1]}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:w-[24rem]">
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
    </BetLayout>
  );
}
