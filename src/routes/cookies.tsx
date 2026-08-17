import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/shared/legal-page";
import { meta } from "@/components/shared/page-meta";

export const Route = createFileRoute("/cookies")({
  head: () =>
    meta(
      "Política de Cookies — Zon7 BET",
      "Como a Zon7 BET usa cookies essenciais, de desempenho e de marketing, e como você gerencia suas preferências.",
    ),
  component: () => (
    <LegalPage
      titulo="Política de Cookies"
      atualizacao="17 de agosto de 2026"
      resumo="Explicamos quais cookies utilizamos, com quais finalidades e como você pode gerenciá-los a qualquer momento."
      secoes={[
        {
          id: "essenciais",
          titulo: "1. Cookies essenciais",
          paragrafos: [
            "Necessários para autenticação, segurança da sessão e prevenção a fraudes. Não podem ser desativados.",
          ],
        },
        {
          id: "desempenho",
          titulo: "2. Cookies de desempenho",
          paragrafos: [
            "Medem uso e estabilidade das páginas de forma agregada, sem identificar pessoalmente o usuário.",
          ],
        },
        {
          id: "marketing",
          titulo: "3. Cookies de marketing",
          paragrafos: [
            "Personalizam ofertas e medem campanhas. Podem ser recusados sem prejuízo às funções principais.",
          ],
        },
        {
          id: "gerenciar",
          titulo: "4. Como gerenciar",
          paragrafos: [
            "Você pode limpar ou bloquear cookies nas configurações do navegador. Alguns recursos podem deixar de funcionar.",
          ],
        },
      ]}
    />
  ),
});
