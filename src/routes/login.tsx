import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layouts/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, type Role } from "@/lib/auth";

const TITULO = "Entrar — Zon7 BET";
const DESCRICAO = "Acesse sua conta Zon7 BET para acompanhar verificação, limites e histórico.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { entrar } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("diego.rosa@exemplo.com.br");
  const [senha, setSenha] = useState("demo1234");
  const [role, setRole] = useState<Role>("apostador");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!email.includes("@") || senha.length < 6) {
      setErro("Informe um e-mail válido e uma senha com pelo menos 6 caracteres.");
      return;
    }
    setEnviando(true);
    setTimeout(() => {
      entrar({ email, role });
      toast.success("Sessão iniciada");
      navigate({ to: role === "compliance" ? "/admin" : "/account" });
    }, 600);
  }

  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold">Entrar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ambiente de demonstração: a autenticação é simulada no navegador.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-2">
            <Label>Entrar como</Label>
            <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
              <TabsList className="w-full">
                <TabsTrigger value="apostador" className="flex-1">
                  Apostador
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex-1">
                  Compliance
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {erro ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
              {erro}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={enviando}>
            {enviando ? "Entrando…" : "Entrar"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </PublicLayout>
  );
}