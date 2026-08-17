import { createFileRoute } from "@tanstack/react-router";

import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { PublicLayout } from "@/components/layouts/public-layout";

const TITULO = "Abertura de conta — Zon7 BET";
const DESCRICAO =
  "Onboarding do apostador: confirmação de maioridade, dados pessoais, endereço, consentimentos e verificação de identidade.";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-2xl font-semibold">Abertura de conta</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Seis etapas rápidas. Seu progresso é salvo automaticamente neste dispositivo.
        </p>
        <div className="mt-8">
          <OnboardingWizard />
        </div>
      </div>
    </PublicLayout>
  );
}
