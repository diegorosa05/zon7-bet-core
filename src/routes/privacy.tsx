import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/shared/legal-page";

const TITULO = "Política de Privacidade — Zon7 BET";
const DESCRICAO = "Como a Zon7 BET coleta, usa, compartilha e protege dados pessoais durante a verificação e o uso da plataforma.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      titulo="Política de Privacidade"
      atualizacao="17 de agosto de 2026 (versão 2.4)"
      resumo="Descrevemos quais dados pessoais tratamos, com que finalidade, por quanto tempo e quais direitos você pode exercer a qualquer momento."
      secoes={[
        {
          id: "dados",
          titulo: "1. Dados tratados",
          paragrafos: [
            "Dados cadastrais (nome, CPF, data de nascimento, contato e endereço), documentos de identificação, dados biométricos de prova de vida e metadados técnicos de sessão.",
            "Registros de uso da plataforma, incluindo alterações de limites e eventos de segurança.",
          ],
        },
        {
          id: "finalidades",
          titulo: "2. Finalidades",
          paragrafos: [
            "Cumprimento de obrigações regulatórias de KYC e prevenção à lavagem de dinheiro.",
            "Prevenção a fraude, proteção ao apostador e execução de medidas de jogo responsável.",
          ],
        },
        {
          id: "compartilhamento",
          titulo: "3. Compartilhamento",
          paragrafos: [
            "Compartilhamos dados com provedores de verificação de identidade e bases cadastrais autorizadas, exclusivamente na medida necessária à checagem.",
            "Autoridades competentes podem receber informações mediante requisição legal.",
          ],
        },
        {
          id: "retencao",
          titulo: "4. Retenção",
          paragrafos: [
            "Documentos de verificação e trilhas de auditoria são retidos pelo prazo legal aplicável, ainda que a conta seja encerrada.",
          ],
        },
        {
          id: "direitos",
          titulo: "5. Seus direitos",
          paragrafos: [
            "Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade e informações sobre compartilhamento.",
            "Pedidos de exclusão são avaliados frente às obrigações legais de retenção.",
          ],
        },
      ]}
    />
  );
}