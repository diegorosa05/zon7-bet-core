import type { JogoCassino } from "@/data/bet-mock";
import { capaPorSlug, jogosCatalogo } from "@/data/game-catalog";

/** Crash games (categoria dedicada do lobby). */
export const jogosCrash: JogoCassino[] = [
  { id: "cr-1", nome: "Aviator", provedor: "Spribe", categoria: "Crash", rtp: "97%", quente: true, capa: capaPorSlug("aviator-spribe") },
  { id: "cr-2", nome: "JetX", provedor: "SmartSoft", categoria: "Crash", rtp: "97%", capa: capaPorSlug("jetx") },
  { id: "cr-3", nome: "Spaceman", provedor: "Pragmatic", categoria: "Crash", rtp: "96%", quente: true, capa: capaPorSlug("spaceman") },
  { id: "cr-4", nome: "Mines Turbo", provedor: "Zon7 Originals", categoria: "Crash", rtp: "98%", capa: capaPorSlug("mines") },
  { id: "cr-5", nome: "Rocket Zon", provedor: "Zon7 Originals", categoria: "Crash", rtp: "99%", capa: capaPorSlug("sweet-bonanza") },
  { id: "cr-6", nome: "Balloon", provedor: "SmartSoft", categoria: "Crash", rtp: "96%", capa: capaPorSlug("gems-bonanza") },
];

export const provedores = [
  "Pragmatic Play",
  "Evolution",
  "PG Soft",
  "Spribe",
  "SmartSoft",
  "Zon7 Originals",
  "Playtech",
  "Hacksaw",
] as const;

export interface MesaAoVivo {
  id: string;
  nome: string;
  dealer: string;
  limites: string;
  jogadores: number;
  capa: string;
}

export const mesasAoVivo: MesaAoVivo[] = [
  { id: "mv-1", nome: "Mega Roleta Brasil", dealer: "Camila", limites: "R$ 5 — R$ 10.000", jogadores: 1284, capa: capaPorSlug("sweet-magic") },
  { id: "mv-2", nome: "Blackjack VIP", dealer: "Rafael", limites: "R$ 25 — R$ 25.000", jogadores: 312, capa: capaPorSlug("bonanza-billion") },
  { id: "mv-3", nome: "Roleta Relâmpago", dealer: "Bruna", limites: "R$ 2 — R$ 5.000", jogadores: 897, capa: capaPorSlug("sweet-magic") },
  { id: "mv-4", nome: "Baccarat Speed", dealer: "Diego", limites: "R$ 10 — R$ 50.000", jogadores: 458, capa: capaPorSlug("bonanza-billion") },
];

/** Mercados extras exibidos na página de evento. */
export const mercadosExtras = [
  { grupo: "Total de gols", opcoes: [{ rotulo: "Mais de 2.5", odd: 1.82 }, { rotulo: "Menos de 2.5", odd: 1.95 }] },
  { grupo: "Ambas marcam", opcoes: [{ rotulo: "Sim", odd: 1.7 }, { rotulo: "Não", odd: 2.05 }] },
  { grupo: "Handicap asiático", opcoes: [{ rotulo: "Casa -0.5", odd: 2.1 }, { rotulo: "Fora +0.5", odd: 1.74 }] },
  { grupo: "Escanteios", opcoes: [{ rotulo: "Mais de 9.5", odd: 1.88 }, { rotulo: "Menos de 9.5", odd: 1.9 }] },
  { grupo: "Cartões", opcoes: [{ rotulo: "Mais de 4.5", odd: 1.65 }, { rotulo: "Menos de 4.5", odd: 2.15 }] },
  { grupo: "Próximo gol", opcoes: [{ rotulo: "Casa", odd: 1.75 }, { rotulo: "Sem gol", odd: 5.2 }, { rotulo: "Fora", odd: 2.9 }] },
  { grupo: "Artilheiro da partida", opcoes: [{ rotulo: "Pedro", odd: 3.4 }, { rotulo: "Estêvão", odd: 4.1 }, { rotulo: "Flaco López", odd: 4.6 }] },
];

export interface ApostaMock {
  id: string;
  evento: string;
  selecao: string;
  odd: number;
  valor: number;
  status: "Aberta" | "Ganha" | "Perdida" | "Cash out";
  data: string;
}

export const apostas: ApostaMock[] = [
  { id: "ap-9001", evento: "Palmeiras x Flamengo", selecao: "Palmeiras vence", odd: 1.85, valor: 100, status: "Aberta", data: "2026-08-17T20:00:00Z" },
  { id: "ap-9002", evento: "Real Madrid x Barcelona", selecao: "Ambas marcam — Sim", odd: 1.62, valor: 50, status: "Aberta", data: "2026-08-17T18:30:00Z" },
  { id: "ap-9003", evento: "Corinthians x Santos", selecao: "Mais de 2.5 gols", odd: 1.9, valor: 80, status: "Ganha", data: "2026-08-15T22:10:00Z" },
  { id: "ap-9004", evento: "Lakers x Celtics", selecao: "Lakers -4.5", odd: 1.95, valor: 60, status: "Perdida", data: "2026-08-14T01:00:00Z" },
  { id: "ap-9005", evento: "Fluminense x Grêmio", selecao: "Empate", odd: 3.2, valor: 40, status: "Cash out", data: "2026-08-13T23:30:00Z" },
];

export interface NivelVip {
  nome: string;
  requisito: string;
  beneficio: string;
}

export const niveisVip: NivelVip[] = [
  { nome: "Bronze", requisito: "R$ 0", beneficio: "Suporte padrão e promoções semanais" },
  { nome: "Silver", requisito: "R$ 2.500", beneficio: "Cashback 3% e saques prioritários" },
  { nome: "Gold", requisito: "R$ 10.000", beneficio: "Cashback 5% e gerente de conta" },
  { nome: "Platinum", requisito: "R$ 30.000", beneficio: "Cashback 7% e limites ampliados" },
  { nome: "Diamond", requisito: "R$ 80.000", beneficio: "Cashback 10% e convites exclusivos" },
  { nome: "Black", requisito: "Convite", beneficio: "Condições personalizadas e concierge" },
];

export const nivelAtual = { nome: "Gold", progresso: 72, faltam: 1_420, proximo: "Platinum" };

export const notificacoes = [
  { id: "nt-1", titulo: "Depósito confirmado", texto: "Seu Pix de R$ 500,00 foi creditado.", quando: "há 12 min", lida: false },
  { id: "nt-2", titulo: "Aposta liquidada", texto: "Corinthians x Santos — aposta ganha (R$ 152,00).", quando: "há 2 h", lida: false },
  { id: "nt-3", titulo: "Verificação aprovada", texto: "Seus documentos foram aprovados pela equipe de compliance.", quando: "ontem", lida: true },
  { id: "nt-4", titulo: "Nova promoção", texto: "Super odds no Brasileirão neste fim de semana.", quando: "há 3 dias", lida: true },
];

export const perguntasFrequentes = [
  { p: "Como faço um depósito?", r: "Acesse Carteira > Depositar, escolha o valor e pague via Pix. O crédito é instantâneo neste mockup." },
  { p: "Qual o prazo de saque?", r: "Saques por Pix são processados em até 2 horas após a aprovação da análise de risco." },
  { p: "Preciso verificar minha conta?", r: "Sim. A verificação (KYC) é obrigatória antes do primeiro saque e libera limites maiores." },
  { p: "Posso definir limites de aposta?", r: "Sim, em Conta > Limites você define limites diários, semanais e mensais, além de autoexclusão." },
  { p: "Como funciona o cashback?", r: "O cashback é calculado sobre a perda líquida semanal e creditado às segundas-feiras em saldo bônus." },
  { p: "Como falo com o suporte?", r: "Pelo chat 24/7 na Central de Ajuda ou pelo e-mail suporte@zon7.bet." },
];

/** Mesas ao vivo expostas também como cards de jogo no lobby. */
export const jogosAoVivo: JogoCassino[] = mesasAoVivo.map((m, i) => ({
  id: `lv-${m.id}`,
  nome: m.nome,
  provedor: "Evolution",
  categoria: "Ao vivo",
  rtp: `${96 + (i % 3)}%`,
  quente: i === 0,
  capa: m.capa,
}));

void jogosCatalogo;
