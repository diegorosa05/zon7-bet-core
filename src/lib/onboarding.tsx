import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AccountStatus = "pending" | "under_review" | "approved" | "rejected" | "blocked";

/** Versões das políticas — registradas junto do aceite para auditoria futura no backend. */
export const CONSENT_VERSIONS = {
  termos: "termos-de-uso@2026-01",
  privacidade: "politica-privacidade@2026-01",
  jogoResponsavel: "politica-jogo-responsavel@2026-01",
} as const;

export type ConsentKey = keyof typeof CONSENT_VERSIONS;

export interface ConsentRecord {
  chave: ConsentKey;
  versao: string;
  aceito: boolean;
  aceitoEm: string | null;
}

export interface DadosPessoais {
  nome: string;
  cpf: string;
  nascimento: string;
  email: string;
  telefone: string;
}

export interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface OnboardingState {
  passo: number;
  maioridade: boolean | null;
  pessoais: DadosPessoais;
  endereco: Endereco;
  consentimentos: Record<ConsentKey, ConsentRecord>;
  kycEnviado: boolean;
  status: AccountStatus;
  motivo: string | null;
  atualizadoEm: string | null;
}

const STORAGE_KEY = "zon7.onboarding";

function consentimentosIniciais(): Record<ConsentKey, ConsentRecord> {
  return (Object.keys(CONSENT_VERSIONS) as ConsentKey[]).reduce(
    (acc, chave) => {
      acc[chave] = { chave, versao: CONSENT_VERSIONS[chave], aceito: false, aceitoEm: null };
      return acc;
    },
    {} as Record<ConsentKey, ConsentRecord>,
  );
}

export const ESTADO_INICIAL: OnboardingState = {
  passo: 1,
  maioridade: null,
  pessoais: { nome: "", cpf: "", nascimento: "", email: "", telefone: "" },
  endereco: {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  },
  consentimentos: consentimentosIniciais(),
  kycEnviado: false,
  status: "pending",
  motivo: null,
  atualizadoEm: null,
};

interface OnboardingContextValue {
  estado: OnboardingState;
  ready: boolean;
  atualizar: (patch: Partial<OnboardingState>) => void;
  registrarConsentimento: (chave: ConsentKey, aceito: boolean) => void;
  reiniciar: () => void;
  concluido: boolean;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

function ler(): OnboardingState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return ESTADO_INICIAL;
    const parsed = JSON.parse(raw) as Partial<OnboardingState>;
    return {
      ...ESTADO_INICIAL,
      ...parsed,
      pessoais: { ...ESTADO_INICIAL.pessoais, ...parsed.pessoais },
      endereco: { ...ESTADO_INICIAL.endereco, ...parsed.endereco },
      consentimentos: { ...consentimentosIniciais(), ...parsed.consentimentos },
    };
  } catch {
    return ESTADO_INICIAL;
  }
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<OnboardingState>(ESTADO_INICIAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEstado(ler());
    setReady(true);
  }, []);

  const persistir = useCallback((next: OnboardingState) => {
    setEstado(next);
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const atualizar = useCallback<OnboardingContextValue["atualizar"]>((patch) => {
    setEstado((atual) => {
      const next = { ...atual, ...patch, atualizadoEm: new Date().toISOString() };
      if (typeof window !== "undefined")
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const registrarConsentimento = useCallback<OnboardingContextValue["registrarConsentimento"]>(
    (chave, aceito) => {
      setEstado((atual) => {
        const next: OnboardingState = {
          ...atual,
          consentimentos: {
            ...atual.consentimentos,
            [chave]: {
              chave,
              versao: CONSENT_VERSIONS[chave],
              aceito,
              aceitoEm: aceito ? new Date().toISOString() : null,
            },
          },
          atualizadoEm: new Date().toISOString(),
        };
        if (typeof window !== "undefined")
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const reiniciar = useCallback(() => persistir(ESTADO_INICIAL), [persistir]);

  const value = useMemo(
    () => ({
      estado,
      ready,
      atualizar,
      registrarConsentimento,
      reiniciar,
      concluido: estado.status === "approved",
    }),
    [estado, ready, atualizar, registrarConsentimento, reiniciar],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding precisa estar dentro de <OnboardingProvider>");
  return ctx;
}

export const STATUS_INFO: Record<
  AccountStatus,
  { rotulo: string; badge: string; titulo: string; mensagem: string; acao: string | null }
> = {
  pending: {
    rotulo: "Pendente",
    badge: "pendente",
    titulo: "Cadastro pendente",
    mensagem:
      "Faltam informações para concluir sua abertura de conta. Retome o onboarding e envie os documentos solicitados.",
    acao: "Continuar cadastro",
  },
  under_review: {
    rotulo: "Em análise",
    badge: "em_analise",
    titulo: "Conta em análise",
    mensagem:
      "Recebemos seus dados e documentos. A verificação de identidade costuma levar até 24 horas úteis. Você será avisado por e-mail assim que houver decisão.",
    acao: null,
  },
  approved: {
    rotulo: "Aprovada",
    badge: "aprovado",
    titulo: "Conta aprovada",
    mensagem: "Sua identidade foi verificada. Todas as funcionalidades da conta estão liberadas.",
    acao: "Ir para a plataforma",
  },
  rejected: {
    rotulo: "Recusada",
    badge: "recusado",
    titulo: "Cadastro recusado",
    mensagem:
      "Não foi possível confirmar sua identidade com os documentos enviados. Você pode corrigir os dados e reenviar a documentação.",
    acao: "Reenviar documentos",
  },
  blocked: {
    rotulo: "Bloqueada",
    badge: "suspensa",
    titulo: "Conta bloqueada",
    mensagem:
      "Sua conta está bloqueada por decisão de compliance (autoexclusão, suspeita de fraude ou exigência regulatória). Fale com o suporte para entender os próximos passos.",
    acao: null,
  },
};
