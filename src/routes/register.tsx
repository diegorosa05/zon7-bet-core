import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

const TITULO = "Criar conta — Zon7 BET";
const DESCRICAO = "Abra sua conta Zon7 BET e conclua a verificação de identidade em poucos passos.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", documento: "", senha: "" });
  const [aceites, setAceites] = useState({ termos: false, idade: false });
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  function atualizar(campo: keyof typeof form, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!form.nome.trim() || !form.email.includes("@") || form.documento.length < 11 || form.senha.length < 8) {
      setErro("Preencha nome, e-mail válido, CPF com 11 dígitos e senha com no mínimo 8 caracteres.");
      return;
    }
    if (!aceites.termos || !aceites.idade) {
      setErro("É necessário confirmar a maioridade e aceitar os termos.");
      return;
    }
    setEnviando(true);
    setTimeout(() => {
      entrar({ email: form.email, nome: form.nome, role: "apostador" });
      toast.success("Conta criada. Conclua a verificação de identidade.");
      navigate({ to: "/account/verification" });
    }, 700);
  }

  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold">Criar conta</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Após o cadastro você passa pela verificação de identidade antes de qualquer operação.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" value={form.nome} onChange={(e) => atualizar("nome", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-cad">E-mail</Label>
            <Input id="email-cad" type="email" value={form.email} onChange={(e) => atualizar("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              inputMode="numeric"
              placeholder="Somente números"
              value={form.documento}
              onChange={(e) => atualizar("documento", e.target.value.replace(/\D/g, "").slice(0, 11))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha-cad">Senha</Label>
            <Input
              id="senha-cad"
              type="password"
              value={form.senha}
              onChange={(e) => atualizar("senha", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-background/40 p-4">
            <label className="flex items-start gap-3 text-sm">
              <Checkbox
                checked={aceites.idade}
                onCheckedChange={(v) => setAceites((p) => ({ ...p, idade: v === true }))}
              />
              <span>Declaro ter 18 anos ou mais.</span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <Checkbox
                checked={aceites.termos}
                onCheckedChange={(v) => setAceites((p) => ({ ...p, termos: v === true }))}
              />
              <span>
                Li e aceito os{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Termos de uso
                </Link>{" "}
                e a{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Política de privacidade
                </Link>
                .
              </span>
            </label>
          </div>

          {erro ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
              {erro}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={enviando}>
            {enviando ? "Criando conta…" : "Criar conta"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </PublicLayout>
  );
}