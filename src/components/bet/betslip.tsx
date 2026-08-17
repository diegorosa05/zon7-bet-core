import { Link } from "@tanstack/react-router";
import { Ticket, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBetslip } from "@/lib/betslip";

export function Betslip() {
  const { selecoes, valor, setValor, oddTotal, retorno, remover, limpar } = useBetslip();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Ticket className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold">Cupom</h2>
        <span className="tabular ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
          {selecoes.length}
        </span>
        {selecoes.length > 0 && (
          <button type="button" onClick={limpar} className="text-xs text-muted-foreground hover:text-destructive">
            Limpar
          </button>
        )}
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
                    onClick={() => remover(s.chave)}
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
}