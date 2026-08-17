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

import { jogosAoVivo, jogosCrash } from "./bet-extra";
import { jogosCatalogo } from "./game-catalog";

export const jogos: JogoCassino[] = [...jogosCatalogo, ...jogosAoVivo, ...jogosCrash];
