import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PublicLayout } from "@/components/layouts/public-layout";
import { meta } from "@/components/shared/page-meta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contato")({
  head: () =>
    meta(
      "Contato — fale com a Zon7 BET",
      "Envie sua mensagem para o time da Zon7 BET ou fale com suporte, ouvidoria e imprensa pelos canais oficiais.",
    ),
  component: Contato,
});

function Contato() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold">Fale conosco</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Suporte 24/7: suporte@zon7.bet · Ouvidoria: ouvidoria@zon7.bet · Imprensa:
          imprensa@zon7.bet
        </p>

        <form
          className="mt-8 space-y-4 rounded-xl border border-border bg-card p-5"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Mensagem enviada", {
              description: "Retornaremos em até 24 horas (demonstração).",
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" required placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" required placeholder="voce@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assunto">Assunto</Label>
            <Input id="assunto" required placeholder="Como podemos ajudar?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea id="mensagem" required rows={5} placeholder="Descreva sua solicitação" />
          </div>
          <Button type="submit" className="rounded-full px-6">
            Enviar mensagem
          </Button>
        </form>
      </div>
    </PublicLayout>
  );
}
