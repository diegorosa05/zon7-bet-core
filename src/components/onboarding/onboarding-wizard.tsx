import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Ban,
  Check,
  CircleAlert,
  CloudUpload,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CONSENT_VERSIONS,
  STATUS_INFO,
  useOnboarding,
  type AccountStatus,
  type ConsentKey,
} from "@/lib/onboarding";
import {
  enderecoSchema,
  erros as coletarErros,
  formatarCep,
  formatarCpf,
  formatarTelefone,
  idadeEm,
  pessoaisSchema,
  UFS,
  type ErrosCampo,
} from "@/lib/onboarding-validation";
import { cn } from "@/lib/utils";

const PASSOS = [
  { n: 1, titulo: "Maioridade", icone: ShieldCheck },
  { n: 2, titulo: "Dados pessoais", icone: UserRound },
  { n: 3, titulo: "Endereço", icone: MapPin },
  { n: 4, titulo: "Consentimentos", icone: Check },
  { n: 5, titulo: "Verificação", icone: CloudUpload },
  { n: 6, titulo: "Resultado", icone: Lock },
] as const;

const CONSENTIMENTOS: { chave: ConsentKey; rotulo: string; to: string; descricao: string }[] = [
  {
    chave: "termos",
    rotulo: "Termos de Uso",
    to: "/terms",
    descricao: "Regras de uso da plataforma, elegibilidade e encerramento de conta.",
  },
  {
    chave: "privacidade",
    rotulo: "Política de Privacidade",
    to: "/privacy",
    descricao: "Tratamento de dados pessoais, base legal e retenção conforme a LGPD.",
  },
  {
    chave: "jogoResponsavel",
    rotulo: "Política de Jogo Responsável",
    to: "/responsible-gambling",
    descricao: "Limites, autoexclusão e canais de apoio para jogo problemático.",
  },
];

const DOCUMENTOS = [
  { id: "identidade", titulo: "Documento de identidade", detalhe: "RG ou CNH — frente e verso" },
  { id: "selfie", titulo: "Prova de vida", detalhe: "Selfie segurando o documento" },
  { id: "endereco", titulo: "Comprovante de endereço", detalhe: "Emitido nos últimos 90 dias" },
];

function CampoErro({ mensagem }: { mensagem?: string | undefined }) {
  if (!mensagem) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-destructive">
      <CircleAlert className="h-3.5 w-3.5 shrink-0" />
      {mensagem}
    </p>
  );
}

export function OnboardingWizard() {
  const { estado, ready, atualizar, registrarConsentimento, reiniciar } = useOnboarding();
  const navigate = useNavigate();

  const [pessoais, setPessoais] = useState(estado.pessoais);
  const [endereco, setEndereco] = useState(estado.endereco);
  const [errosCampos, setErrosCampos] = useState<ErrosCampo>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [docs, setDocs] = useState<string[]>([]);
  const [sincronizado, setSincronizado] = useState(false);

  // hidrata os formulários quando a sessão salva é lida
  if (ready && !sincronizado) {
    setSincronizado(true);
    setPessoais(estado.pessoais);
    setEndereco(estado.endereco);
  }

  const passo = estado.passo;
  const progresso = useMemo(() => Math.round(((passo - 1) / (PASSOS.length - 1)) * 100), [passo]);

  if (!ready) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-[26rem] w-full rounded-2xl" />
      </div>
    );
  }

  function irPara(n: number) {
    setErrosCampos({});
    setErroGeral(null);
    atualizar({ passo: n });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function voltar() {
    if (passo > 1) irPara(passo - 1);
  }

  function confirmarMaioridade(valor: boolean) {
    if (!valor) {
      atualizar({ maioridade: false, status: "blocked", motivo: "Idade mínima de 18 anos não confirmada." });
      toast.error("Acesso bloqueado", { description: "Apostas são proibidas para menores de 18 anos." });
      return;
    }
    atualizar({ maioridade: true, status: "pending", motivo: null, passo: 2 });
  }

  function salvarPessoais() {
    const r = pessoaisSchema.safeParse(pessoais);
    const e = coletarErros(r);
    setErrosCampos(e);
    if (!r.success) {
      setErroGeral("Corrija os campos destacados para continuar.");
      return;
    }
    setErroGeral(null);
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      atualizar({ pessoais, passo: 3 });
      toast.success("Dados pessoais salvos");
    }, 600);
  }

  function salvarEndereco() {
    const r = enderecoSchema.safeParse(endereco);
    const e = coletarErros(r);
    setErrosCampos(e);
    if (!r.success) {
      setErroGeral("Corrija os campos destacados para continuar.");
      return;
    }
    setErroGeral(null);
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      atualizar({ endereco, passo: 4 });
      toast.success("Endereço salvo");
    }, 600);
  }

  const todosConsentidos = CONSENTIMENTOS.every((c) => estado.consentimentos[c.chave]?.aceito);

  function salvarConsentimentos() {
    if (!todosConsentidos) {
      setErroGeral("Todos os consentimentos são obrigatórios para abrir a conta.");
      return;
    }
    setErroGeral(null);
    irPara(5);
  }

  function alternarDoc(id: string) {
    setDocs((atual) => (atual.includes(id) ? atual.filter((d) => d !== id) : [...atual, id]));
  }

  function enviarKyc() {
    if (docs.length < DOCUMENTOS.length) {
      setErroGeral("Envie os três documentos para iniciar a análise.");
      return;
    }
    setErroGeral(null);
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      atualizar({ kycEnviado: true, status: "under_review", motivo: null, passo: 6 });
      toast.success("Documentos enviados", { description: "Sua conta está em análise." });
    }, 1200);
  }

  function simularDecisao(status: AccountStatus, motivo: string | null) {
    atualizar({ status, motivo });
    toast.message(STATUS_INFO[status].titulo, { description: STATUS_INFO[status].mensagem });
  }

  const bloqueadoPorIdade = estado.maioridade === false;
  const info = STATUS_INFO[estado.status];

  return (
    <div className="space-y-6">
      {/* Barra de progresso */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="font-medium">
            Etapa {passo} de {PASSOS.length}
            <span className="hidden text-muted-foreground sm:inline"> · {PASSOS[passo - 1]?.titulo}</span>
          </p>
          <span className="tabular text-muted-foreground">{progresso}%</span>
        </div>
        <Progress value={progresso} className="h-1.5" />
        <ol className="hidden grid-cols-6 gap-2 md:grid">
          {PASSOS.map((p) => {
            const concluida = p.n < passo;
            const atual = p.n === passo;
            return (
              <li key={p.n} className="min-w-0">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-2.5 py-2",
                    atual
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : concluida
                        ? "border-success/40 bg-success/8 text-foreground"
                        : "border-border bg-card text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "tabular grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold",
                      atual
                        ? "bg-primary text-primary-foreground"
                        : concluida
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {concluida ? <Check className="h-3.5 w-3.5" /> : p.n}
                  </span>
                  <span className="truncate text-xs font-medium">{p.titulo}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
        {/* ETAPA 1 */}
        {passo === 1 ? (
          bloqueadoPorIdade ? (
            <div className="space-y-5 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/15 text-destructive">
                <Ban className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">Cadastro não permitido</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Apostas são proibidas para menores de 18 anos. Não é possível continuar o cadastro nem
                  acessar as funcionalidades da plataforma.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-2 sm:flex-row">
                <Button variant="outline" asChild>
                  <Link to="/responsible-gambling">Jogo responsável</Link>
                </Button>
                <Button variant="ghost" onClick={reiniciar}>
                  Refazer confirmação
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Você confirma que possui 18 anos ou mais?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A legislação brasileira proíbe apostas por menores de 18 anos. A informação é registrada e
                  conferida na verificação de identidade.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => confirmarMaioridade(true)}
                  className="rounded-xl border border-primary/50 bg-primary/10 p-5 text-left transition-colors hover:bg-primary/15"
                >
                  <p className="font-semibold">Sim, tenho 18 anos ou mais</p>
                  <p className="mt-1 text-sm text-muted-foreground">Continuar o cadastro.</p>
                </button>
                <button
                  type="button"
                  onClick={() => confirmarMaioridade(false)}
                  className="rounded-xl border border-border bg-background/40 p-5 text-left transition-colors hover:border-destructive/50"
                >
                  <p className="font-semibold">Não, sou menor de 18 anos</p>
                  <p className="mt-1 text-sm text-muted-foreground">O acesso será bloqueado.</p>
                </button>
              </div>
            </div>
          )
        ) : null}

        {/* ETAPA 2 */}
        {passo === 2 ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              salvarPessoais();
            }}
          >
            <div>
              <h2 className="text-lg font-semibold">Dados pessoais</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Use exatamente os dados do seu documento oficial — divergências reprovam o KYC.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ob-nome">Nome completo</Label>
                <Input
                  id="ob-nome"
                  value={pessoais.nome}
                  aria-invalid={!!errosCampos["nome"]}
                  onChange={(e) => setPessoais((p) => ({ ...p, nome: e.target.value }))}
                />
                <CampoErro mensagem={errosCampos["nome"]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-cpf">CPF</Label>
                <Input
                  id="ob-cpf"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  value={pessoais.cpf}
                  aria-invalid={!!errosCampos["cpf"]}
                  onChange={(e) => setPessoais((p) => ({ ...p, cpf: formatarCpf(e.target.value) }))}
                />
                <CampoErro mensagem={errosCampos["cpf"]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-nasc">Data de nascimento</Label>
                <Input
                  id="ob-nasc"
                  type="date"
                  value={pessoais.nascimento}
                  aria-invalid={!!errosCampos["nascimento"]}
                  onChange={(e) => setPessoais((p) => ({ ...p, nascimento: e.target.value }))}
                />
                {pessoais.nascimento && idadeEm(pessoais.nascimento) >= 0 && !errosCampos["nascimento"] ? (
                  <p className="text-xs text-muted-foreground">{idadeEm(pessoais.nascimento)} anos</p>
                ) : null}
                <CampoErro mensagem={errosCampos["nascimento"]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-email">E-mail</Label>
                <Input
                  id="ob-email"
                  type="email"
                  value={pessoais.email}
                  aria-invalid={!!errosCampos["email"]}
                  onChange={(e) => setPessoais((p) => ({ ...p, email: e.target.value }))}
                />
                <CampoErro mensagem={errosCampos["email"]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-tel">Telefone</Label>
                <Input
                  id="ob-tel"
                  inputMode="tel"
                  placeholder="(11) 90000-0000"
                  value={pessoais.telefone}
                  aria-invalid={!!errosCampos["telefone"]}
                  onChange={(e) => setPessoais((p) => ({ ...p, telefone: formatarTelefone(e.target.value) }))}
                />
                <CampoErro mensagem={errosCampos["telefone"]} />
              </div>
            </div>
            <Navegacao
              onVoltar={voltar}
              carregando={carregando}
              erroGeral={erroGeral}
              rotulo="Continuar para endereço"
            />
          </form>
        ) : null}

        {/* ETAPA 3 */}
        {passo === 3 ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              salvarEndereco();
            }}
          >
            <div>
              <h2 className="text-lg font-semibold">Endereço e localização</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                O endereço é usado para verificação regulatória e checagem de geolocalização.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-6">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ob-cep">CEP</Label>
                <Input
                  id="ob-cep"
                  inputMode="numeric"
                  placeholder="00000-000"
                  value={endereco.cep}
                  aria-invalid={!!errosCampos["cep"]}
                  onChange={(e) => setEndereco((p) => ({ ...p, cep: formatarCep(e.target.value) }))}
                />
                <CampoErro mensagem={errosCampos["cep"]} />
              </div>
              <div className="space-y-2 sm:col-span-4">
                <Label htmlFor="ob-log">Logradouro</Label>
                <Input
                  id="ob-log"
                  value={endereco.logradouro}
                  aria-invalid={!!errosCampos["logradouro"]}
                  onChange={(e) => setEndereco((p) => ({ ...p, logradouro: e.target.value }))}
                />
                <CampoErro mensagem={errosCampos["logradouro"]} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ob-num">Número</Label>
                <Input
                  id="ob-num"
                  value={endereco.numero}
                  aria-invalid={!!errosCampos["numero"]}
                  onChange={(e) => setEndereco((p) => ({ ...p, numero: e.target.value }))}
                />
                <CampoErro mensagem={errosCampos["numero"]} />
              </div>
              <div className="space-y-2 sm:col-span-4">
                <Label htmlFor="ob-comp">Complemento (opcional)</Label>
                <Input
                  id="ob-comp"
                  value={endereco.complemento}
                  onChange={(e) => setEndereco((p) => ({ ...p, complemento: e.target.value }))}
                />
              </div>
              <div className="space-y-2 sm:col-span-3">
                <Label htmlFor="ob-bairro">Bairro</Label>
                <Input
                  id="ob-bairro"
                  value={endereco.bairro}
                  aria-invalid={!!errosCampos["bairro"]}
                  onChange={(e) => setEndereco((p) => ({ ...p, bairro: e.target.value }))}
                />
                <CampoErro mensagem={errosCampos["bairro"]} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="ob-cidade">Cidade</Label>
                <Input
                  id="ob-cidade"
                  value={endereco.cidade}
                  aria-invalid={!!errosCampos["cidade"]}
                  onChange={(e) => setEndereco((p) => ({ ...p, cidade: e.target.value }))}
                />
                <CampoErro mensagem={errosCampos["cidade"]} />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="ob-uf">UF</Label>
                <Select value={endereco.uf} onValueChange={(v) => setEndereco((p) => ({ ...p, uf: v }))}>
                  <SelectTrigger id="ob-uf" aria-invalid={!!errosCampos["uf"]}>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {UFS.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <CampoErro mensagem={errosCampos["uf"]} />
              </div>
            </div>
            <Navegacao
              onVoltar={voltar}
              carregando={carregando}
              erroGeral={erroGeral}
              rotulo="Continuar para consentimentos"
            />
          </form>
        ) : null}

        {/* ETAPA 4 */}
        {passo === 4 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Consentimentos obrigatórios</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Registramos a versão de cada política aceita, com data e hora, para fins de auditoria.
              </p>
            </div>
            <div className="space-y-3">
              {CONSENTIMENTOS.map((c) => {
                const registro = estado.consentimentos[c.chave];
                return (
                  <label
                    key={c.chave}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                      registro?.aceito ? "border-primary/45 bg-primary/8" : "border-border bg-background/40",
                    )}
                  >
                    <Checkbox
                      className="mt-0.5"
                      checked={!!registro?.aceito}
                      onCheckedChange={(v) => registrarConsentimento(c.chave, v === true)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">Li e aceito a {c.rotulo}</span>
                        <Link
                          to={c.to}
                          className="text-xs text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          abrir documento
                        </Link>
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{c.descricao}</span>
                      <span className="mt-2 block font-mono text-[11px] text-muted-foreground">
                        versão {CONSENT_VERSIONS[c.chave]}
                        {registro?.aceitoEm
                          ? ` · aceito em ${new Date(registro.aceitoEm).toLocaleString("pt-BR")}`
                          : ""}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            <Navegacao
              onVoltar={voltar}
              onAvancar={salvarConsentimentos}
              desabilitado={!todosConsentidos}
              erroGeral={erroGeral}
              rotulo="Continuar para verificação"
            />
          </div>
        ) : null}

        {/* ETAPA 5 */}
        {passo === 5 ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Verificação de identidade (KYC)</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Envie os três documentos abaixo. Uploads simulados neste ambiente.
              </p>
            </div>
            <div className="space-y-3">
              {DOCUMENTOS.map((doc) => {
                const enviado = docs.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-xl border border-border bg-background/40 p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full",
                        enviado ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {enviado ? <Check className="h-4 w-4" /> : <CloudUpload className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{doc.titulo}</p>
                      <p className="text-xs text-muted-foreground">{doc.detalhe}</p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Button
                        variant={enviado ? "outline" : "default"}
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => alternarDoc(doc.id)}
                      >
                        {enviado ? "Remover" : "Enviar arquivo"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {docs.length} de {DOCUMENTOS.length} documentos enviados
            </p>
            <Navegacao
              onVoltar={voltar}
              onAvancar={enviarKyc}
              carregando={carregando}
              desabilitado={docs.length < DOCUMENTOS.length}
              erroGeral={erroGeral}
              rotulo={carregando ? "Enviando para análise…" : "Enviar para análise"}
            />
          </div>
        ) : null}

        {/* ETAPA 6 */}
        {passo === 6 ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge valor={info.badge} rotulo={info.rotulo} />
              <span className="text-xs text-muted-foreground">
                Atualizado em{" "}
                {estado.atualizadoEm ? new Date(estado.atualizadoEm).toLocaleString("pt-BR") : "—"}
              </span>
            </div>
            <div
              className={cn(
                "rounded-xl border p-5",
                estado.status === "approved"
                  ? "border-success/40 bg-success/8"
                  : estado.status === "under_review"
                    ? "border-info/40 bg-info/8"
                    : estado.status === "pending"
                      ? "border-warning/40 bg-warning/8"
                      : "border-destructive/40 bg-destructive/8",
              )}
            >
              <h2 className="text-lg font-semibold">{info.titulo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{info.mensagem}</p>
              {estado.motivo ? (
                <p className="mt-3 flex items-start gap-2 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <span>Motivo registrado: {estado.motivo}</span>
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {estado.status === "approved" ? (
                <Button onClick={() => navigate({ to: "/" })}>Ir para a plataforma</Button>
              ) : null}
              {estado.status === "rejected" ? (
                <Button
                  onClick={() => {
                    setDocs([]);
                    atualizar({ status: "pending", kycEnviado: false, motivo: null, passo: 2 });
                  }}
                >
                  Corrigir dados e reenviar
                </Button>
              ) : null}
              {estado.status === "pending" ? (
                <Button onClick={() => irPara(5)}>Continuar cadastro</Button>
              ) : null}
              <Button variant="outline" asChild>
                <Link to="/account">Ir para minha conta</Link>
              </Button>
            </div>

            <div className="rounded-xl border border-dashed border-border p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Simulação de decisão de compliance (ambiente de demonstração)
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => simularDecisao("under_review", null)}>
                  Em análise
                </Button>
                <Button size="sm" variant="outline" onClick={() => simularDecisao("approved", null)}>
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => simularDecisao("rejected", "Documento ilegível na prova de vida.")}
                >
                  Recusar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => simularDecisao("blocked", "Bloqueio preventivo por alerta de AML.")}
                >
                  Bloquear
                </Button>
                <Button size="sm" variant="ghost" onClick={reiniciar}>
                  Reiniciar onboarding
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Navegacao({
  onVoltar,
  onAvancar,
  carregando,
  desabilitado,
  erroGeral,
  rotulo,
}: {
  onVoltar: () => void;
  onAvancar?: () => void;
  carregando?: boolean;
  desabilitado?: boolean;
  erroGeral?: string | null;
  rotulo: string;
}) {
  return (
    <div className="space-y-3">
      {erroGeral ? (
        <p className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
          <CircleAlert className="h-4 w-4 shrink-0" />
          {erroGeral}
        </p>
      ) : null}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="ghost" onClick={onVoltar} disabled={carregando}>
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <Button
          type={onAvancar ? "button" : "submit"}
          onClick={onAvancar}
          disabled={carregando || desabilitado}
          className="sm:min-w-56"
        >
          {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {rotulo}
          {!carregando ? <ArrowRight className="h-4 w-4" /> : null}
        </Button>
      </div>
    </div>
  );
}
