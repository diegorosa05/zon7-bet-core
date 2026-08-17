import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { CabecalhoSecao } from "@/components/bet/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carteira } from "@/data/wallet-mock";
import { formatarMoeda } from "@/lib/format";

const TITULO = "Sacar — Zon7 BET";
const DESCRICAO = "Simulação de saque via Pix na Zon7 BET, com limites e verificação de conta.";

export const Route = createFileRoute("/carteira/saque")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Saque,
});

const MINIMO = 30;

function Saque() {
  const [valor, setValor] = useState(200);
  const [chave, setChave] = useState("cpf");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const erro =
    valor < MINIMO
      ? `Saque mínimo de ${formatarMoeda(MINIMO)}.`
      : valor > carteira.saldoReal
        ? "Valor maior que o saldo disponível."
        : valor > carteira.limiteDiarioSaque
          ? `Limite diário de ${formatarMoeda(carteira.limiteDiarioSaque)}.`
          : null;

  function solicitar(e: React.FormEvent) {
    e.preventDefault();
    if (erro) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setSucesso(true);
      toast.success("Saque solicitado — em análise (demonstração)");
    }, 800);
  }

  return (
    <section className="space-y-4">
      <CabecalhoSecao nivel="h1" titulo="Sacar" descricao="Pix para conta do mesmo titular" />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={solicitar} className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Disponível para saque</p>
              <p className="tabular mt-1 text-lg font-semibold">
                {formatarMoeda(carteira.saldoReal)}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Limite diário</p>
              <p className="tabular mt-1 text-lg font-semibold">
                {formatarMoeda(carteira.limiteDiarioSaque)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor-saque">Valor</Label>
            <Input
              id="valor-saque"
              type="number"
              min={MINIMO}
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="tabular"
            />
            {erro ? <p className="text-sm text-destructive">{erro}</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Chave Pix</Label>
            <Select value={chave} onValueChange={setChave}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpf">CPF ***.456.789-**</SelectItem>
                <SelectItem value="email">E-mail diego.rosa@exemplo.com.br</SelectItem>
                <SelectItem value="telefone">Telefone (11) *****-4321</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full rounded-full font-semibold" disabled={!!erro || enviando}>
            {enviando ? "Enviando solicitação…" : "Solicitar saque"}
          </Button>

          {sucesso ? (
            <p className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm">
              Saque de {formatarMoeda(valor)} solicitado. Prazo de análise de até 2 horas.
            </p>
          ) : null}
        </form>

        <aside className="space-y-3 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Regras do saque</p>
          <ul className="list-disc space-y-2 pl-4">
            <li>Conta verificada (KYC aprovado) é obrigatória.</li>
            <li>Chave Pix precisa pertencer ao titular da conta.</li>
            <li>Bônus não convertidos não são sacáveis.</li>
            <li>Saques passam por checagem antifraude e AML.</li>
          </ul>
          <p className="text-xs">Ambiente de demonstração — nenhum valor real é movimentado.</p>
        </aside>
      </div>
    </section>
  );
}