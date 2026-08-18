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
  {
    id: "ev-7",
    esporte: "Futebol",
    competicao: "Brasileirão Série A",
    pais: "Brasil",
    inicio: "Hoje 19:30",
    aoVivo: true,
    minuto: "74'",
    casa: "Palmeiras",
    fora: "Corinthians",
    placar: [1, 1],
    mercados: [
      { rotulo: "1", odd: 2.1 },
      { rotulo: "X", odd: 3.2 },
      { rotulo: "2", odd: 3.9 },
    ],
    destaque: true,
  },
  {
    id: "ev-8",
    esporte: "Futebol",
    competicao: "Brasileirão Série A",
    pais: "Brasil",
    inicio: "Hoje 18:00",
    aoVivo: true,
    minuto: "38'",
    casa: "Flamengo",
    fora: "São Paulo",
    placar: [2, 0],
    mercados: [
      { rotulo: "1", odd: 1.35 },
      { rotulo: "X", odd: 4.8 },
      { rotulo: "2", odd: 8.5 },
    ],
  },
  {
    id: "ev-9",
    esporte: "Futebol",
    competicao: "Brasileirão Série A",
    pais: "Brasil",
    inicio: "Hoje 20:15",
    aoVivo: true,
    minuto: "12'",
    casa: "Grêmio",
    fora: "Cruzeiro",
    placar: [0, 0],
    mercados: [
      { rotulo: "1", odd: 2.45 },
      { rotulo: "X", odd: 3.1 },
      { rotulo: "2", odd: 2.9 },
    ],
  },
  {
    id: "ev-10",
    esporte: "Futebol",
    competicao: "Brasileirão Série A",
    pais: "Brasil",
    inicio: "Hoje 21:00",
    aoVivo: true,
    minuto: "56'",
    casa: "Atlético MG",
    fora: "Vasco da Gama",
    placar: [1, 2],
    mercados: [
      { rotulo: "1", odd: 2.8 },
      { rotulo: "X", odd: 3.5 },
      { rotulo: "2", odd: 2.4 },
    ],
  },
  {
    id: "ev-11",
    esporte: "Futebol",
    competicao: "LaLiga",
    pais: "Espanha",
    inicio: "Hoje 17:00",
    aoVivo: true,
    minuto: "67'",
    casa: "Real Madrid",
    fora: "Barcelona",
    placar: [2, 2],
    mercados: [
      { rotulo: "1", odd: 2.15 },
      { rotulo: "X", odd: 3.6 },
      { rotulo: "2", odd: 3.05 },
    ],
    destaque: true,
  },
  {
    id: "ev-12",
    esporte: "Futebol",
    competicao: "Premier League",
    pais: "Inglaterra",
    inicio: "Hoje 16:30",
    aoVivo: true,
    minuto: "22'",
    casa: "Liverpool",
    fora: "Arsenal",
    placar: [1, 0],
    mercados: [
      { rotulo: "1", odd: 1.95 },
      { rotulo: "X", odd: 3.7 },
      { rotulo: "2", odd: 3.4 },
    ],
  },
  {
    id: "ev-13",
    esporte: "Futebol",
    competicao: "Premier League",
    pais: "Inglaterra",
    inicio: "Hoje 15:00",
    aoVivo: true,
    minuto: "81'",
    casa: "Man City",
    fora: "Chelsea",
    placar: [3, 1],
    mercados: [
      { rotulo: "1", odd: 1.18 },
      { rotulo: "X", odd: 7.5 },
      { rotulo: "2", odd: 12.0 },
    ],
  },
  {
    id: "ev-14",
    esporte: "Futebol",
    competicao: "Serie A",
    pais: "Itália",
    inicio: "Hoje 16:45",
    aoVivo: true,
    minuto: "45+2'",
    casa: "Juventus",
    fora: "Napoli",
    placar: [0, 1],
    mercados: [
      { rotulo: "1", odd: 3.2 },
      { rotulo: "X", odd: 3.0 },
      { rotulo: "2", odd: 2.35 },
    ],
  },
  {
    id: "ev-15",
    esporte: "Futebol",
    competicao: "Bundesliga",
    pais: "Alemanha",
    inicio: "Hoje 15:30",
    aoVivo: true,
    minuto: "70'",
    casa: "Bayern Munique",
    fora: "Dortmund",
    placar: [2, 1],
    mercados: [
      { rotulo: "1", odd: 1.42 },
      { rotulo: "X", odd: 5.0 },
      { rotulo: "2", odd: 6.8 },
    ],
  },
  {
    id: "ev-16",
    esporte: "Futebol",
    competicao: "Ligue 1",
    pais: "França",
    inicio: "Hoje 17:45",
    aoVivo: true,
    minuto: "29'",
    casa: "PSG",
    fora: "Marselha",
    placar: [1, 1],
    mercados: [
      { rotulo: "1", odd: 1.55 },
      { rotulo: "X", odd: 4.2 },
      { rotulo: "2", odd: 5.6 },
    ],
  },
  {
    id: "ev-17",
    esporte: "Futebol",
    competicao: "Primeira Liga",
    pais: "Portugal",
    inicio: "Hoje 18:30",
    aoVivo: true,
    minuto: "52'",
    casa: "Benfica",
    fora: "Braga",
    placar: [2, 0],
    mercados: [
      { rotulo: "1", odd: 1.3 },
      { rotulo: "X", odd: 5.4 },
      { rotulo: "2", odd: 9.0 },
    ],
  },
  {
    id: "ev-18",
    esporte: "Futebol",
    competicao: "Libertadores",
    pais: "América do Sul",
    inicio: "Hoje 21:30",
    aoVivo: true,
    minuto: "8'",
    casa: "River Plate",
    fora: "Boca Juniors",
    placar: [0, 0],
    mercados: [
      { rotulo: "1", odd: 2.05 },
      { rotulo: "X", odd: 3.1 },
      { rotulo: "2", odd: 3.8 },
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
