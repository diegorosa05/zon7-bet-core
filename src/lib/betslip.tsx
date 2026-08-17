import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { EventoEsportivo } from "@/data/bet-mock";

export interface Selecao {
  chave: string;
  evento: string;
  mercado: string;
  odd: number;
}

interface BetslipCtx {
  selecoes: Selecao[];
  valor: string;
  setValor: (v: string) => void;
  alternar: (ev: EventoEsportivo, mercado: string, odd: number) => void;
  remover: (chave: string) => void;
  limpar: () => void;
  ativo: (chave: string) => boolean;
  oddTotal: number;
  retorno: number;
}

const Ctx = createContext<BetslipCtx | null>(null);

export function BetslipProvider({ children }: { children: ReactNode }) {
  const [selecoes, setSelecoes] = useState<Selecao[]>([]);
  const [valor, setValor] = useState("30");

  const value = useMemo<BetslipCtx>(() => {
    const oddTotal = selecoes.reduce((acc, s) => acc * s.odd, 1);
    const retorno = (Number(valor.replace(",", ".")) || 0) * (selecoes.length ? oddTotal : 0);
    return {
      selecoes,
      valor,
      setValor,
      oddTotal,
      retorno,
      ativo: (chave) => selecoes.some((s) => s.chave === chave),
      remover: (chave) => setSelecoes((a) => a.filter((s) => s.chave !== chave)),
      limpar: () => setSelecoes([]),
      alternar: (ev, mercado, odd) => {
        const chave = `${ev.id}:${mercado}`;
        setSelecoes((atual) => {
          if (atual.some((s) => s.chave === chave)) return atual.filter((s) => s.chave !== chave);
          const semMesmoEvento = atual.filter((s) => !s.chave.startsWith(`${ev.id}:`));
          return [...semMesmoEvento, { chave, evento: `${ev.casa} x ${ev.fora}`, mercado, odd }];
        });
      },
    };
  }, [selecoes, valor]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBetslip() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBetslip precisa estar dentro de BetslipProvider");
  return ctx;
}