export interface Mercado {
  rotulo: string;
  odd: number;
}

export interface EventoEsportivo {
  id: string;
  esporte: string;
  competicao: string;
  pais: string;
  inicio: string;
  aoVivo: boolean;
  minuto?: string;
  casa: string;
  fora: string;
  placar?: [number, number];
  mercados: Mercado[];
  destaque?: boolean;
}

export const esportes = [
  "Populares",
  "Futebol",
  "Tênis",
  "Basquete",
  "eSports",
  "Beisebol",
  "Tênis de Mesa",
  "Hóquei",
  "Futsal",
] as const;

export const eventos: EventoEsportivo[] = [
  {
    id: "ev-1",
    esporte: "Futebol",
    competicao: "Brasileirão Série A",
    pais: "Brasil",
    inicio: "Hoje 20:00",
    aoVivo: true,
    minuto: "62'",
    casa: "Internacional",
    fora: "Remo",
    placar: [2, 1],
    mercados: [
      { rotulo: "1", odd: 1.53 },
      { rotulo: "X", odd: 4.3 },
      { rotulo: "2", odd: 7.2 },
    ],
    destaque: true,
  },
  {
    id: "ev-2",
    esporte: "Futebol",
    competicao: "Primeira Liga",
    pais: "Portugal",
    inicio: "Hoje 16:15",
    aoVivo: true,
    minuto: "31'",
    casa: "Casa Pia AC",
    fora: "SL Benfica",
    placar: [0, 2],
    mercados: [
      { rotulo: "1", odd: 15.5 },
      { rotulo: "X", odd: 6.6 },
      { rotulo: "2", odd: 1.24 },
    ],
  },
  {
    id: "ev-3",
    esporte: "Futebol",
    competicao: "Copa da Itália",
    pais: "Itália",
    inicio: "Hoje 21:30",
    aoVivo: false,
    casa: "Sassuolo",
    fora: "Cesena",
    mercados: [
      { rotulo: "1", odd: 1.22 },
      { rotulo: "X", odd: 6.0 },
      { rotulo: "2", odd: 14.0 },
    ],
  },
  {
    id: "ev-4",
    esporte: "Basquete",
    competicao: "NBB",
    pais: "Brasil",
    inicio: "Hoje 19:00",
    aoVivo: false,
    casa: "Flamengo",
    fora: "Franca",
    mercados: [
      { rotulo: "1", odd: 2.05 },
      { rotulo: "X", odd: 12.0 },
      { rotulo: "2", odd: 1.78 },
    ],
  },
  {
    id: "ev-5",
    esporte: "Tênis",
    competicao: "ATP Masters",
    pais: "Canadá",
    inicio: "Amanhã 14:40",
    aoVivo: false,
    casa: "J. Fonseca",
    fora: "A. Zverev",
    mercados: [
      { rotulo: "1", odd: 3.1 },
      { rotulo: "X", odd: 9.5 },
      { rotulo: "2", odd: 1.36 },
    ],
  },
  {
    id: "ev-6",
    esporte: "eSports",
    competicao: "CS2 — Major",
    pais: "Mundial",
    inicio: "Hoje 23:10",
    aoVivo: true,
    minuto: "Mapa 2",
    casa: "FURIA",
    fora: "NAVI",
    placar: [1, 0],
    mercados: [
      { rotulo: "1", odd: 1.92 },
      { rotulo: "X", odd: 15.0 },
      { rotulo: "2", odd: 1.88 },
    ],
  },
];

export interface JogoCassino {
  id: string;
  nome: string;
  provedor: string;
  categoria: "Originais" | "Slots" | "Ao vivo" | "Crash";
  rtp: string;
  quente?: boolean;
  capa: string;
}

import capaBlackjack from "@/assets/game-blackjack.jpg";
import capaCrash from "@/assets/game-crash.jpg";
import capaDouble from "@/assets/game-double.jpg";
import capaGates from "@/assets/game-gates.jpg";
import capaMines from "@/assets/game-mines.jpg";
import capaPlinko from "@/assets/game-plinko.jpg";
import capaRoleta from "@/assets/game-roleta.jpg";
import capaTigre from "@/assets/game-tigre.jpg";

export const jogos: JogoCassino[] = [
  { id: "g-1", nome: "Crash", provedor: "Zon7 Originals", categoria: "Originais", rtp: "99%", quente: true, capa: capaCrash },
  { id: "g-2", nome: "Double", provedor: "Zon7 Originals", categoria: "Originais", rtp: "97%", capa: capaDouble },
  { id: "g-3", nome: "Mines", provedor: "Zon7 Originals", categoria: "Originais", rtp: "98%", quente: true, capa: capaMines },
  { id: "g-5", nome: "Plinko", provedor: "Zon7 Originals", categoria: "Originais", rtp: "98%", capa: capaPlinko },
  { id: "g-9", nome: "Gates of Zon", provedor: "Pragmatic", categoria: "Slots", rtp: "96%", quente: true, capa: capaGates },
  { id: "g-10", nome: "Fortune Tiger", provedor: "PG Soft", categoria: "Slots", rtp: "96%", capa: capaTigre },
  { id: "g-13", nome: "Gates Bonanza", provedor: "Pragmatic", categoria: "Slots", rtp: "96%", capa: capaGates },
  { id: "g-14", nome: "Tigre Dourado", provedor: "PG Soft", categoria: "Slots", rtp: "95%", capa: capaTigre },
  { id: "g-11", nome: "Roleta Brasil", provedor: "Evolution", categoria: "Ao vivo", rtp: "97%", capa: capaRoleta },
  { id: "g-12", nome: "Blackjack VIP", provedor: "Evolution", categoria: "Ao vivo", rtp: "99%", capa: capaBlackjack },
  { id: "g-15", nome: "Roleta Relâmpago", provedor: "Evolution", categoria: "Ao vivo", rtp: "97%", capa: capaRoleta },
  { id: "g-16", nome: "Blackjack Zon7", provedor: "Evolution", categoria: "Ao vivo", rtp: "99%", capa: capaBlackjack },
];

export const banners = [
  { id: "b-1", href: "/register", alt: "Bônus de boas-vindas em apostas esportivas" },
  { id: "b-2", href: "/register", alt: "Cassino ao vivo Zon7" },
  { id: "b-3", href: "/register", alt: "Jogos originais Crash" },
] as const;

export const promocoes = [
  {
    id: "p-1",
    tag: "Boas-vindas",
    titulo: "Aumento de 25% na sua primeira aposta múltipla",
    texto: "Válido para múltiplas com 3+ seleções e odd mínima 1.60.",
    cta: "Criar aposta",
  },
  {
    id: "p-2",
    tag: "Torneio",
    titulo: "R$ 250 mil em prêmios no Torneio Zon7",
    texto: "Rodadas diárias nos jogos originais durante todo o mês.",
    cta: "Ver detalhes",
  },
  {
    id: "p-3",
    tag: "Cassino ao vivo",
    titulo: "Cashback de até R$ 20 mil toda segunda",
    texto: "Calculado sobre o resultado líquido semanal nas mesas ao vivo.",
    cta: "Jogar agora",
  },
];

export const atalhos = [
  "Rodadas grátis",
  "Torneio de Esportes",
  "Torneio Crash",
  "Bolão da Copa",
  "Clube Zon7",
  "Super Odds",
  "Cashback",
  "App Android",
];