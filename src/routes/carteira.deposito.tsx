import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CabecalhoSecao } from "@/components/bet/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatarMoeda } from "@/lib/format";

const TITULO = "Depositar — Zon7 BET";
const DESCRICAO = "Simulação de depósito via Pix na Zon7 BET, com valores rápidos e QR Code.";

export const Route = createFileRoute("/carteira/deposito")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Deposito,
});

const atalhos = [20, 50, 100, 250, 500, 1000];
const MINIMO = 20;

function Deposito() {
  const [valor, setValor] = useState(100);
  const [enviando, setEnviando] = useState(false);
  const [codigo, setCodigo] = useState<string | null>(null);
  const erro = valor < MINIMO ? `Depósito mínimo de ${formatarMoeda(MINIMO)}.` : null;

  function gerar(e: React.FormEvent) {
    e.preventDefault();
    if (erro) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setCodigo(`00020126ZON7BET${Date.now().toString().slice(-10)}5204000053039865802BR`);
      toast.success("Pix gerado (demonstração)");
    }, 700);
  }

  return (
    <section className="space-y-4">
      <CabecalhoSecao nivel="h1" titulo="Depositar" descricao="Pix — aprovação imediata" />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={gerar} className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="space-y-2">
            <Label htmlFor="valor">Valor do depósito</Label>
            <Input
              id="valor"
              type="number"
              min={MINIMO}
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="tabular"
            />
            {erro ? <p className="text-sm text-destructive">{erro}</p> : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {atalhos.map((a) => (
              <Button
                key={a}
                type="button"
                size="sm"
                variant={valor === a ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setValor(a)}
              >
                {formatarMoeda(a)}
              </Button>
            ))}
          </div>

          <Button type="submit" className="w-full rounded-full font-semibold" disabled={!!erro || enviando}>
            {enviando ? "Gerando Pix…" : "Gerar Pix"}
          </Button>

          {codigo ? (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm font-medium">Pix copia e cola</p>
              <p className="mt-2 break-all rounded-lg bg-background p-3 text-xs text-muted-foreground">
                {codigo}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 rounded-full"
                onClick={() => {
                  void navigator.clipboard?.writeText(codigo);
                  toast.success("Código copiado");
                }}
              >
                Copiar código
              </Button>
            </div>
          ) : null}
        </form>

        <aside className="space-y-3 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Como funciona</p>
          <ol className="list-decimal space-y-2 pl-4">
            <li>Escolha o valor e gere o código Pix.</li>
            <li>Pague no app do seu banco com a mesma titularidade do cadastro.</li>
            <li>O saldo aparece na carteira em segundos.</li>
          </ol>
          <p className="text-xs">
            Depósitos só são aceitos de contas do próprio titular. Ambiente de demonstração — nenhum
            valor real é movimentado.
          </p>
        </aside>
      </div>
    </section>
  );
}