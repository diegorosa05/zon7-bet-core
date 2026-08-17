export type KycStatus = "nao_iniciado" | "pendente" | "em_analise" | "aprovado" | "recusado";
export type ContaStatus = "ativa" | "limitada" | "suspensa" | "autoexcluida";
export type RiskLevel = "baixo" | "medio" | "alto" | "critico";
export type CaseStatus = "aberto" | "em_analise" | "aguardando_usuario" | "aprovado" | "recusado";
export type CaseTipo = "kyc" | "aml" | "risco" | "jogo_responsavel";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  documento: string;
  telefone: string;
  cidade: string;
  uf: string;
  criadoEm: string;
  contaStatus: ContaStatus;
  kycStatus: KycStatus;
  risco: RiskLevel;
}

export interface CasoCompliance {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  tipo: CaseTipo;
  status: CaseStatus;
  risco: RiskLevel;
  abertoEm: string;
  slaHoras: number;
  responsavel: string | null;
  resumo: string;
  evidencias: { rotulo: string; valor: string; fonte: string }[];
  linhaDoTempo: { em: string; ator: string; acao: string; detalhe?: string }[];
}

export interface AuditEvent {
  id: string;
  em: string;
  ator: string;
  papel: "sistema" | "compliance" | "apostador";
  acao: string;
  entidade: string;
  ip: string;
  hash: string;
}

export interface EventoConta {
  id: string;
  em: string;
  categoria: "sessao" | "kyc" | "limite" | "seguranca" | "conta";
  titulo: string;
  detalhe: string;
  origem: string;
}

export interface LimitesConta {
  depositoDiario: number;
  perdaSemanal: number;
  sessaoMinutos: number;
  autoexclusao: "nenhuma" | "7d" | "30d" | "180d" | "indeterminada";
  atualizadoEm: string;
}

export interface PerfilConta {
  nome: string;
  email: string;
  documento: string;
  nascimento: string;
  telefone: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
}

export interface EtapaKyc {
  id: string;
  titulo: string;
  descricao: string;
  status: "concluida" | "pendente" | "recusada" | "bloqueada";
}

export interface Sessao {
  id: string;
  dispositivo: string;
  local: string;
  ip: string;
  ultimoAcesso: string;
  atual: boolean;
}

export interface AdminMetricas {
  filaTotal: number;
  filaCritica: number;
  slaEmRisco: number;
  aprovadas24h: number;
  novosCadastros: number;
  tempoMedioHoras: number;
  serie: { dia: string; abertos: number; concluidos: number }[];
}