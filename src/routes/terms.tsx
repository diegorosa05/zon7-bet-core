import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/shared/legal-page";

const TITULO = "Termos de Uso — Zon7 BET";
const DESCRICAO = "Condições de uso da plataforma Zon7 BET, incluindo elegibilidade, verificação e encerramento de conta.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      titulo="Termos de Uso"
      atualizacao="17 de agosto de 2026 (versão 3.2)"
      resumo="Estes termos descrevem as condições de acesso e uso da plataforma Zon7 BET. Este é um ambiente de demonstração: não há jogos, apostas reais ou movimentação financeira."
      secoes={[
        {
          id: "elegibilidade",
          titulo: "1. Elegibilidade",
          paragrafos: [
            "O acesso é restrito a pessoas com 18 anos completos ou mais, residentes em jurisdições onde a atividade é permitida.",
            "A criação de conta exige dados verdadeiros e verificáveis. Informações inconsistentes levam à suspensão preventiva até a conclusão da análise.",
          ],
        },
        {
          id: "verificacao",
          titulo: "2. Verificação de identidade",
          paragrafos: [
            "A conta permanece em modo limitado até a conclusão das etapas de verificação: documento oficial, prova de vida, comprovante de endereço e declaração de origem de recursos.",
            "A plataforma pode solicitar documentos adicionais a qualquer momento por exigência regulatória ou por acionamento de regras internas de risco.",
          ],
        },
        {
          id: "conduta",
          titulo: "3. Conduta do usuário",
          paragrafos: [
            "É vedado o uso de contas de terceiros, automações não autorizadas e qualquer tentativa de burlar controles de limites ou autoexclusão.",
            "O descumprimento pode resultar em limitação, suspensão ou encerramento definitivo da conta.",
          ],
        },
        {
          id: "limites",
          titulo: "4. Limites e proteção ao apostador",
          paragrafos: [
            "Reduções de limite entram em vigor imediatamente; aumentos passam por período de carência de 24 horas.",
            "Pedidos de autoexclusão são irreversíveis dentro do prazo escolhido.",
          ],
        },
        {
          id: "encerramento",
          titulo: "5. Encerramento de conta",
          paragrafos: [
            "O usuário pode solicitar o encerramento a qualquer momento pela área da conta.",
            "Registros de auditoria são preservados pelo prazo legal aplicável, mesmo após o encerramento.",
          ],
        },
      ]}
    />
  );
}