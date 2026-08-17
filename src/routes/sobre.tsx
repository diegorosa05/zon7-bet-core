import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/shared/legal-page";
import { meta } from "@/components/shared/page-meta";

export const Route = createFileRoute("/sobre")({
  head: () =>
    meta(
      "Sobre a Zon7 BET — quem somos",
      "Conheça a Zon7 BET: operação licenciada em ambiente de demonstração, com foco em compliance, KYC e jogo responsável.",
    ),
  component: () => (
    <LegalPage
      titulo="Sobre nós"
      atualizacao="17 de agosto de 2026"
      resumo="A Zon7 BET é uma plataforma de apostas e cassino online construída com compliance, verificação de identidade e proteção ao apostador no centro do produto. Este ambiente é uma demonstração."
      secoes={[
        {
          id: "quem-somos",
          titulo: "Quem somos",
          paragrafos: [
            "A Zon7 BET reúne apostas esportivas, cassino ao vivo, slots e jogos originais em uma experiência única e segura.",
            "Nossa operação é auditada continuamente e segue os requisitos da regulamentação brasileira de apostas de quota fixa.",
          ],
        },
        {
          id: "compromissos",
          titulo: "Nossos compromissos",
          paragrafos: [
            "Verificação de identidade obrigatória, limites configuráveis e ferramentas de autoexclusão disponíveis a qualquer momento.",
            "Transparência total sobre odds, RTP, prazos de pagamento e regras promocionais.",
          ],
        },
        {
          id: "responsabilidade",
          titulo: "Jogo responsável",
          paragrafos: [
            "Apostar é entretenimento, não fonte de renda. Proibido para menores de 18 anos.",
            "Oferecemos limites de depósito, de perda e pausas temporárias em toda a plataforma.",
          ],
        },
      ]}
    />
  ),
});
