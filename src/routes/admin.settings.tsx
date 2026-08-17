import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatarMoeda } from "@/lib/format";

const TITULO = "Configurações — Zon7 BET Compliance";
const DESCRICAO = "Regras de risco, limites padrão da plataforma e integrações de verificação.";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});

const integracoes = [
  {
    nome: "Provedor de KYC",
    descricao: "Documentoscopia e prova de vida.",
    estado: "Não conectado",
  },
  {
    nome: "FonteData",
    descricao: "Enriquecimento e validação cadastral.",
    estado: "Não conectado",
  },
  {
    nome: "Lovable Cloud",
    descricao: "Banco de dados, autenticação e storage.",
    estado: "Não conectado",
  },
];

function SettingsPage() {
  const [regras, setRegras] = useState({ aml: true, geolocalizacao: true, dispositivos: false });
  const [padroes, setPadroes] = useState({ deposito: 500, perda: 1500, sessao: 120 });

  return (
    <>
      <PageHeader
        titulo="Configurações"
        descricao="Parâmetros que afetam toda a operação — alterações são auditadas."
      />

      <Tabs defaultValue="regras">
        <TabsList>
          <TabsTrigger value="regras">Regras de risco</TabsTrigger>
          <TabsTrigger value="limites">Limites padrão</TabsTrigger>
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="regras" className="mt-6 space-y-3">
          <Regra
            titulo="AML-14 · Divergência cadastral"
            descricao="Abre caso crítico quando documento e base externa divergem."
            ativo={regras.aml}
            onChange={(v) => setRegras((p) => ({ ...p, aml: v }))}
          />
          <Regra
            titulo="RSK-07 · Geolocalização inconsistente"
            descricao="Sinaliza acessos de regiões distantes em curto intervalo."
            ativo={regras.geolocalizacao}
            onChange={(v) => setRegras((p) => ({ ...p, geolocalizacao: v }))}
          />
          <Regra
            titulo="RSK-11 · Múltiplos dispositivos"
            descricao="Abre caso quando a conta acessa de mais de três dispositivos em 24h."
            ativo={regras.dispositivos}
            onChange={(v) => setRegras((p) => ({ ...p, dispositivos: v }))}
          />
        </TabsContent>

        <TabsContent value="limites" className="mt-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Limites aplicados a novas contas</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Valores iniciais até a conclusão da verificação de identidade.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="dep">Depósito diário (R$)</Label>
                <Input
                  id="dep"
                  inputMode="numeric"
                  value={padroes.deposito}
                  onChange={(e) =>
                    setPadroes((p) => ({ ...p, deposito: Number(e.target.value) || 0 }))
                  }
                />
                <p className="text-xs text-muted-foreground">{formatarMoeda(padroes.deposito)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="perda">Perda semanal (R$)</Label>
                <Input
                  id="perda"
                  inputMode="numeric"
                  value={padroes.perda}
                  onChange={(e) =>
                    setPadroes((p) => ({ ...p, perda: Number(e.target.value) || 0 }))
                  }
                />
                <p className="text-xs text-muted-foreground">{formatarMoeda(padroes.perda)}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ses">Sessão (min)</Label>
                <Input
                  id="ses"
                  inputMode="numeric"
                  value={padroes.sessao}
                  onChange={(e) =>
                    setPadroes((p) => ({ ...p, sessao: Number(e.target.value) || 0 }))
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => toast.success("Limites padrão atualizados")}>Salvar</Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="integracoes" className="mt-6 space-y-3">
          {integracoes.map((i) => (
            <div
              key={i.nome}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{i.nome}</p>
                <p className="mt-1 text-sm text-muted-foreground">{i.descricao}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge valor="nao_iniciado" rotulo={i.estado} />
                <Button variant="outline" size="sm" disabled>
                  Conectar
                </Button>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            As integrações ficam disponíveis quando o backend for habilitado nesta plataforma.
          </p>
        </TabsContent>
      </Tabs>
    </>
  );
}

function Regra({
  titulo,
  descricao,
  ativo,
  onChange,
}: {
  titulo: string;
  descricao: string;
  ativo: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-xl border border-border bg-card p-5">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{titulo}</p>
        <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
      </div>
      <Switch checked={ativo} onCheckedChange={onChange} aria-label={titulo} />
    </div>
  );
}
