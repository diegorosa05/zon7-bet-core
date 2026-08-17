import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { ErrorState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { perfilQuery } from "@/data/queries";
import type { PerfilConta } from "@/data/types";

const TITULO = "Perfil — Zon7 BET";
const DESCRICAO = "Dados cadastrais, contato e endereço vinculados à sua conta Zon7 BET.";

export const Route = createFileRoute("/account/profile")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { data, isLoading, isError, refetch } = useQuery(perfilQuery());
  const [form, setForm] = useState<PerfilConta | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      toast.success("Dados atualizados", { description: "As alterações entram na trilha de auditoria." });
    }, 600);
  }

  return (
    <>
      <PageHeader titulo="Perfil" descricao="Dados usados na verificação de identidade e nas comunicações oficiais." />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : isLoading || !form ? (
        <div className="space-y-4 rounded-xl border border-border p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={salvar} className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Dados pessoais</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Nome, CPF e data de nascimento só podem ser alterados via análise de compliance.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Campo id="nome" rotulo="Nome completo" valor={form.nome} bloqueado />
              <Campo id="documento" rotulo="CPF" valor={form.documento} bloqueado />
              <Campo id="nascimento" rotulo="Data de nascimento" valor={form.nascimento} bloqueado />
              <Campo
                id="email"
                rotulo="E-mail"
                valor={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Contato e endereço</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Campo id="telefone" rotulo="Telefone" valor={form.telefone} onChange={(v) => setForm({ ...form, telefone: v })} />
              <Campo id="cep" rotulo="CEP" valor={form.cep} onChange={(v) => setForm({ ...form, cep: v })} />
              <Campo id="endereco" rotulo="Endereço" valor={form.endereco} onChange={(v) => setForm({ ...form, endereco: v })} />
              <Campo id="cidade" rotulo="Cidade" valor={form.cidade} onChange={(v) => setForm({ ...form, cidade: v })} />
              <Campo id="uf" rotulo="UF" valor={form.uf} onChange={(v) => setForm({ ...form, uf: v })} />
            </div>
          </section>

          <div className="flex justify-end">
            <Button type="submit" disabled={salvando}>
              {salvando ? "Salvando…" : "Salvar alterações"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

function Campo({
  id,
  rotulo,
  valor,
  onChange,
  bloqueado,
}: {
  id: string;
  rotulo: string;
  valor: string;
  onChange?: (v: string) => void;
  bloqueado?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{rotulo}</Label>
      <Input id={id} value={valor} onChange={(e) => onChange?.(e.target.value)} disabled={bloqueado} readOnly={!onChange} />
    </div>
  );
}