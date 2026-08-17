export interface Transacao {
  id: string;
  tipo: "Depósito" | "Saque" | "Bônus" | "Aposta" | "Prêmio";
  metodo: string;
  valor: number;
  status: "Concluído" | "Pendente" | "Recusado";
  data: string;
}

export const carteira = {
  saldoReal: 1_284.5,
  saldoBonus: 150,
  emAnalise: 200,
  limiteDiarioSaque: 5_000,
};

export const transacoes: Transacao[] = [
  { id: "tx-1041", tipo: "Depósito", metodo: "Pix", valor: 500, status: "Concluído", data: "2026-08-16T20:12:00Z" },
  { id: "tx-1040", tipo: "Aposta", metodo: "Esportes — Brasileirão", valor: -75, status: "Concluído", data: "2026-08-16T18:03:00Z" },
  { id: "tx-1039", tipo: "Prêmio", metodo: "Esportes — Brasileirão", valor: 189.5, status: "Concluído", data: "2026-08-16T20:55:00Z" },
  { id: "tx-1038", tipo: "Saque", metodo: "Pix — CPF ***.456.789-**", valor: -200, status: "Pendente", data: "2026-08-15T14:22:00Z" },
  { id: "tx-1037", tipo: "Bônus", metodo: "Boas-vindas 100%", valor: 150, status: "Concluído", data: "2026-08-14T09:40:00Z" },
  { id: "tx-1036", tipo: "Depósito", metodo: "Pix", valor: 300, status: "Concluído", data: "2026-08-13T21:18:00Z" },
  { id: "tx-1035", tipo: "Saque", metodo: "Pix — CPF ***.456.789-**", valor: -120, status: "Recusado", data: "2026-08-12T11:05:00Z" },
];

export interface Recompensa {
  id: string;
  titulo: string;
  descricao: string;
  valor: string;
  progresso: number;
  resgatavel: boolean;
}

export const recompensas: Recompensa[] = [
  { id: "rc-1", titulo: "Cashback semanal", descricao: "5% das perdas líquidas da semana devolvidas em saldo bônus.", valor: "R$ 42,80", progresso: 68, resgatavel: true },
  { id: "rc-2", titulo: "Rodadas grátis", descricao: "20 rodadas em slots selecionados após depositar R$ 50.", valor: "20 rodadas", progresso: 100, resgatavel: true },
  { id: "rc-3", titulo: "Aposta grátis esportes", descricao: "Faça 3 apostas de R$ 20 em odds 1.80+ para liberar.", valor: "R$ 25,00", progresso: 33, resgatavel: false },
  { id: "rc-4", titulo: "Bônus de recarga", descricao: "50% até R$ 200 no primeiro depósito da segunda-feira.", valor: "Até R$ 200", progresso: 0, resgatavel: false },
];

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  premio: string;
  atual: number;
  meta: number;
  prazo: string;
}

export const desafios: Desafio[] = [
  { id: "df-1", titulo: "Maratona de slots", descricao: "Jogue 200 rodadas em slots em destaque.", premio: "R$ 30 em bônus", atual: 128, meta: 200, prazo: "Termina em 2 dias" },
  { id: "df-2", titulo: "Múltipla da rodada", descricao: "Monte uma múltipla com 4 seleções em odds 1.50+.", premio: "Aposta grátis R$ 20", atual: 2, meta: 4, prazo: "Termina em 5 dias" },
  { id: "df-3", titulo: "Explorador de originais", descricao: "Jogue Crash, Mines e Double no mesmo dia.", premio: "10 rodadas grátis", atual: 3, meta: 3, prazo: "Concluído" },
  { id: "df-4", titulo: "Fim de semana ao vivo", descricao: "Aposte em 5 partidas ao vivo.", premio: "R$ 15 em bônus", atual: 1, meta: 5, prazo: "Termina domingo" },
];

export interface Promocao {
  id: string;
  titulo: string;
  chamada: string;
  categoria: "Cassino" | "Esportes" | "Geral";
  regra: string;
}

export const promocoes: Promocao[] = [
  { id: "pr-1", titulo: "Bônus de boas-vindas 100%", chamada: "Dobre seu primeiro depósito até R$ 500.", categoria: "Geral", regra: "Rollover de 8x em odds 1.60+. Válido por 30 dias." },
  { id: "pr-2", titulo: "Sexta de rodadas grátis", chamada: "100 rodadas em slots selecionados.", categoria: "Cassino", regra: "Depósito mínimo de R$ 50 às sextas-feiras." },
  { id: "pr-3", titulo: "Super odds Brasileirão", chamada: "Odds turbinadas na rodada do fim de semana.", categoria: "Esportes", regra: "Uma aposta por usuário, máximo de R$ 100." },
  { id: "pr-4", titulo: "Cashback do azar", chamada: "10% de volta se perder 5 apostas seguidas.", categoria: "Esportes", regra: "Crédito em saldo bônus até R$ 100 por semana." },
];

export const premiosRoleta = [
  "R$ 5 em bônus",
  "10 rodadas grátis",
  "R$ 20 em bônus",
  "Aposta grátis R$ 10",
  "Tente amanhã",
  "R$ 50 em bônus",
  "5 rodadas grátis",
  "Cashback 5%",
];