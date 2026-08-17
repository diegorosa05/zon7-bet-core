import { queryOptions } from "@tanstack/react-query";

import {
  auditoriaMock,
  casosMock,
  etapasKycMock,
  historicoMock,
  limitesMock,
  metricasMock,
  perfilMock,
  sessoesMock,
  usuariosMock,
} from "./mock";

/**
 * Camada de acesso a dados.
 * Hoje resolve mocks locais; a troca por Lovable Cloud / Supabase acontece
 * apenas aqui — telas e hooks continuam iguais.
 */
const LATENCIA_MS = 450;

function simular<T>(dados: T, ms = LATENCIA_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(dados), ms));
}

export const chaves = {
  perfil: ["conta", "perfil"] as const,
  limites: ["conta", "limites"] as const,
  kyc: ["conta", "kyc"] as const,
  sessoes: ["conta", "sessoes"] as const,
  historico: ["conta", "historico"] as const,
  usuarios: ["admin", "usuarios"] as const,
  casos: ["admin", "casos"] as const,
  caso: (id: string) => ["admin", "casos", id] as const,
  auditoria: ["admin", "auditoria"] as const,
  metricas: ["admin", "metricas"] as const,
};

export const perfilQuery = () => queryOptions({ queryKey: chaves.perfil, queryFn: () => simular(perfilMock) });
export const limitesQuery = () => queryOptions({ queryKey: chaves.limites, queryFn: () => simular(limitesMock) });
export const kycQuery = () => queryOptions({ queryKey: chaves.kyc, queryFn: () => simular(etapasKycMock) });
export const sessoesQuery = () => queryOptions({ queryKey: chaves.sessoes, queryFn: () => simular(sessoesMock) });
export const historicoQuery = () => queryOptions({ queryKey: chaves.historico, queryFn: () => simular(historicoMock) });
export const usuariosQuery = () => queryOptions({ queryKey: chaves.usuarios, queryFn: () => simular(usuariosMock) });
export const casosQuery = () => queryOptions({ queryKey: chaves.casos, queryFn: () => simular(casosMock) });
export const auditoriaQuery = () => queryOptions({ queryKey: chaves.auditoria, queryFn: () => simular(auditoriaMock) });
export const metricasQuery = () => queryOptions({ queryKey: chaves.metricas, queryFn: () => simular(metricasMock, 300) });
export const casoQuery = (id: string) =>
  queryOptions({
    queryKey: chaves.caso(id),
    queryFn: () => simular(casosMock.find((c) => c.id === id) ?? null),
  });