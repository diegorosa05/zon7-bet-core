import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/shared/legal-page";
import { meta } from "@/components/shared/page-meta";

export const Route = createFileRoute("/aml")({
  head: () =>
    meta(
      "Política AML / PLD-FTP — Zon7 BET",
      "Programa de prevenção à lavagem de dinheiro e ao financiamento do terrorismo da Zon7 BET: KYC, monitoramento e comunicação de operações.",
    ),
  component: () => (
    <LegalPage
      titulo="Política AML / PLD-FTP"
      atualizacao="17 de agosto de 2026"
      resumo="Descreve os controles de prevenção à lavagem de dinheiro e ao financiamento do terrorismo aplicados na plataforma."
      secoes={[
        {
          id: "kyc",
          titulo: "1. Conheça seu cliente (KYC)",
          paragrafos: [
            "Identificação obrigatória com documento oficial, prova de vida e validação de CPF antes do primeiro saque.",
            "Clientes de maior risco passam por diligência reforçada e comprovação de origem de recursos.",
          ],
        },
        {
          id: "monitoramento",
          titulo: "2. Monitoramento de transações",
          paragrafos: [
            "Regras automatizadas monitoram depósitos e saques atípicos, fracionamento e uso de contas de terceiros.",
            "Alertas geram casos analisados pela equipe de compliance com prazo de SLA definido.",
          ],
        },
        {
          id: "comunicacao",
          titulo: "3. Comunicação às autoridades",
          paragrafos: [
            "Operações suspeitas são comunicadas aos órgãos competentes, sem cientificação do usuário.",
          ],
        },
        {
          id: "registros",
          titulo: "4. Registros e auditoria",
          paragrafos: [
            "Todos os eventos relevantes são registrados em trilha imutável de auditoria pelo prazo legal.",
          ],
        },
      ]}
    />
  ),
});
