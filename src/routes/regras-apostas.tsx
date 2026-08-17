import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/shared/legal-page";
import { meta } from "@/components/shared/page-meta";

export const Route = createFileRoute("/regras-apostas")({
  head: () =>
    meta(
      "Regras de apostas esportivas — Zon7 BET",
      "Liquidação de mercados, partidas adiadas, cash out, limites de pagamento e anulação de apostas na Zon7 BET.",
    ),
  component: () => (
    <LegalPage
      titulo="Regras de Apostas"
      atualizacao="17 de agosto de 2026"
      resumo="Regras gerais aplicáveis a todas as apostas esportivas realizadas na plataforma."
      secoes={[
        {
          id: "aceitacao",
          titulo: "1. Aceitação e confirmação",
          paragrafos: [
            "A aposta só é válida após confirmação no bilhete. Odds podem variar até o aceite final.",
            "Apostas registradas com erro evidente de cotação podem ser anuladas.",
          ],
        },
        {
          id: "liquidacao",
          titulo: "2. Liquidação de mercados",
          paragrafos: [
            "Mercados de resultado final consideram o tempo regulamentar, salvo indicação em contrário.",
            "Escanteios, cartões e gols seguem a estatística oficial do provedor de dados.",
          ],
        },
        {
          id: "adiamentos",
          titulo: "3. Adiamentos e cancelamentos",
          paragrafos: [
            "Partidas adiadas por mais de 48 horas têm apostas anuladas e valores devolvidos.",
            "Mudança de sede ou de mando de campo pode anular mercados específicos.",
          ],
        },
        {
          id: "cashout",
          titulo: "4. Cash out",
          paragrafos: [
            "O cash out é oferecido conforme disponibilidade e pode ser suspenso durante lances decisivos.",
            "O valor apresentado é indicativo e pode mudar até a confirmação.",
          ],
        },
        {
          id: "limites",
          titulo: "5. Limites de pagamento",
          paragrafos: [
            "Existem limites máximos de ganho por bilhete e por competição, informados no momento da aposta.",
          ],
        },
      ]}
    />
  ),
});
