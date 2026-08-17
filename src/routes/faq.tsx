import { createFileRoute } from "@tanstack/react-router";

import { CabecalhoSecao } from "@/components/bet/section";
import { BetLayout } from "@/components/layouts/bet-layout";
import { meta } from "@/components/shared/page-meta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { perguntasFrequentes } from "@/data/bet-extra";

export const Route = createFileRoute("/faq")({
  head: () =>
    meta(
      "Perguntas frequentes — depósitos, saques e verificação | Zon7 BET",
      "Respostas rápidas sobre depósitos via Pix, prazos de saque, verificação de conta, limites e cashback na Zon7 BET.",
    ),
  component: Faq,
});

function Faq() {
  return (
    <BetLayout>
      <div className="space-y-5">
        <CabecalhoSecao nivel="h1" titulo="Perguntas frequentes" descricao="As dúvidas mais comuns" />
        <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-4">
          {perguntasFrequentes.map((f) => (
            <AccordionItem key={f.p} value={f.p}>
              <AccordionTrigger className="text-left text-sm">{f.p}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.r}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </BetLayout>
  );
}
