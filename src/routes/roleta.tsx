import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { Wheel, type SetorRoleta } from "@/components/roleta/wheel";
import { LoginGate } from "@/components/shared/login-gate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TITULO = "Roleta Grátis — Zon7 BET";
const DESCRICAO = "Gire a roleta diária da Zon7 BET e concorra a bônus e rodadas grátis.";

export const Route = createFileRoute("/roleta")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Roleta,
});

const SETORES: SetorRoleta[] = [
  { id: "s1", rotulo: "R$ 5", detalhe: "bônus", tipo: "premio" },
  { id: "s2", rotulo: "100", detalhe: "rodadas grátis", tipo: "jackpot" },
  { id: "s3", rotulo: "10", detalhe: "rodadas grátis", tipo: "premio" },
  { id: "s4", rotulo: "Ø", detalhe: "tente amanhã", tipo: "vazio" },
  { id: "s5", rotulo: "R$ 20", detalhe: "bônus", tipo: "premio" },
  { id: "s6", rotulo: "5%", detalhe: "cashback", tipo: "premio" },
  { id: "s7", rotulo: "Ø", detalhe: "tente amanhã", tipo: "vazio" },
  { id: "s8", rotulo: "R$ 10", detalhe: "aposta grátis", tipo: "premio" },
];

const PESOS = [18, 2, 16, 20, 8, 14, 18, 12];
const DURACAO = 5200;
const PASSO = 360 / SETORES.length;
const CHAVE = "zon7:roleta:ultimo-giro";

function sortear() {
  const total = PESOS.reduce((a, b) => a + b, 0);
  let n = Math.random() * total;
  for (let i = 0; i < PESOS.length; i += 1) {
    n -= PESOS[i]!;
    if (n <= 0) return i;
  }
  return PESOS.length - 1;
}

function textoPremio(setor: SetorRoleta) {
  return setor.tipo === "vazio" ? "Não foi dessa vez" : `${setor.rotulo} ${setor.detalhe}`;
}

function restanteAte(alvo: number) {
  const ms = Math.max(0, alvo - Date.now());
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Roleta() {
  const [girando, setGirando] = useState(false);
  const [angulo, setAngulo] = useState(0);
  const [vencedor, setVencedor] = useState<number | null>(null);
  const [aberto, setAberto] = useState(false);
  const [historico, setHistorico] = useState<string[]>([]);
  const [proximoGiro, setProximoGiro] = useState<number | null>(null);
  const [contagem, setContagem] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const salvo = Number(window.localStorage.getItem(CHAVE) ?? 0);
    if (salvo && Date.now() - salvo < 86_400_000) setProximoGiro(salvo + 86_400_000);
  }, []);

  useEffect(() => {
    if (!proximoGiro) return;
    const id = window.setInterval(() => {
      if (Date.now() >= proximoGiro) {
        setProximoGiro(null);
        setContagem("");
      } else {
        setContagem(restanteAte(proximoGiro));
      }
    }, 1000);
    setContagem(restanteAte(proximoGiro));
    return () => window.clearInterval(id);
  }, [proximoGiro]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const girar = useCallback(() => {
    if (girando || proximoGiro) return;
    setGirando(true);
    setVencedor(null);

    const indice = sortear();
    const alvo = 360 - (indice * PASSO + PASSO / 2);
    const jitter = (Math.random() - 0.5) * (PASSO * 0.5);
    const voltas = 6 + Math.floor(Math.random() * 3);

    setAngulo((atual) => {
      const base = atual - (atual % 360);
      return base + voltas * 360 + alvo + jitter;
    });

    timer.current = setTimeout(() => {
      const setor = SETORES[indice]!;
      setGirando(false);
      setVencedor(indice);
      setAberto(true);
      setHistorico((h) => [textoPremio(setor), ...h].slice(0, 5));
      const agora = Date.now();
      window.localStorage.setItem(CHAVE, String(agora));
      setProximoGiro(agora + 86_400_000);
      if (setor.tipo === "vazio") toast("Não foi dessa vez — volte amanhã!");
      else toast.success(`Você ganhou ${textoPremio(setor)} (demonstração)`);
    }, DURACAO + 120);
  }, [girando, proximoGiro]);

  const bloqueado = Boolean(proximoGiro) || girando;

  return (
    <BetLayout>
      <section className="space-y-4">
        <CabecalhoSecao
          nivel="h1"
          titulo="Roleta grátis"
          descricao="Rode grátis todos os dias — um giro a cada 24 horas"
        />

        <LoginGate recurso="Roleta grátis">
          <div className="grid gap-8 rounded-2xl border border-border bg-card p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="relative">
              <Wheel
                setores={SETORES}
                angulo={angulo}
                girando={girando}
                duracaoMs={DURACAO}
                vencedor={vencedor}
              />
              <button
                type="button"
                onClick={girar}
                disabled={bloqueado}
                aria-label={girando ? "Girando a roleta" : "Girar a roleta"}
                className="absolute top-1/2 left-1/2 z-20 grid h-[19%] max-h-24 min-h-16 w-[19%] max-w-24 min-w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-primary text-[0.7rem] font-bold tracking-wide text-primary-foreground uppercase transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {girando ? "…" : proximoGiro ? "Amanhã" : "Rodar"}
              </button>
            </div>

            <div className="min-w-0 space-y-5">
              <div>
                <h2 className="text-xl font-semibold">
                  {girando
                    ? "Boa sorte…"
                    : vencedor !== null
                      ? textoPremio(SETORES[vencedor]!)
                      : "Gire e descubra seu prêmio"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Bônus, rodadas grátis, cashback e aposta grátis. O prêmio cai direto na sua
                  carteira de bônus.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background/60 p-4">
                {proximoGiro ? (
                  <>
                    <p className="text-xs text-muted-foreground uppercase">Próximo giro em</p>
                    <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-primary">
                      {contagem || "24:00:00"}
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-medium text-primary">
                    Você tem 1 giro grátis disponível
                  </p>
                )}
              </div>

              <Button
                className="w-full rounded-full px-8 font-semibold sm:w-auto"
                onClick={girar}
                disabled={bloqueado}
              >
                {girando ? "Girando…" : proximoGiro ? "Giro já utilizado hoje" : "Girar roleta"}
              </Button>

              {historico.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Últimos giros
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {historico.map((item, i) => (
                      <li
                        key={`${item}-${i}`}
                        className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2"
                      >
                        <span>{item}</span>
                        <span className="text-xs text-muted-foreground">
                          {i === 0 ? "agora" : "anterior"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Ambiente de demonstração — nenhum prêmio real é creditado. Jogue com
                responsabilidade, +18.
              </p>
            </div>
          </div>
        </LoginGate>
      </section>

      <Dialog open={aberto} onOpenChange={setAberto}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {vencedor !== null && SETORES[vencedor]!.tipo === "vazio"
                ? "Não foi dessa vez"
                : "Parabéns!"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {vencedor !== null && SETORES[vencedor]!.tipo === "vazio"
                ? "Volte amanhã para um novo giro grátis."
                : `Seu prêmio: ${vencedor !== null ? textoPremio(SETORES[vencedor]!) : ""}.`}
            </DialogDescription>
          </DialogHeader>
          <Button className="w-full rounded-full font-semibold" onClick={() => setAberto(false)}>
            Continuar
          </Button>
        </DialogContent>
      </Dialog>
    </BetLayout>
  );
}
