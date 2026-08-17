import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import conar from "@/assets/conar.png.asset.json";
import consumidor from "@/assets/consumidor.png.asset.json";
import govbr from "@/assets/govbr.png.asset.json";
import pix from "@/assets/pix.png.asset.json";
import { Logo } from "@/components/brand/logo";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const linksUteis = [
  { rotulo: "Crash games", to: "/cassino/crash" },
  { rotulo: "Slots", to: "/cassino/slots" },
  { rotulo: "Cassino ao vivo", to: "/cassino/ao-vivo" },
  { rotulo: "Esportes ao vivo", to: "/esportes/ao-vivo" },
  { rotulo: "Promoções", to: "/promocoes" },
  { rotulo: "Clube VIP", to: "/vip" },
  { rotulo: "Pesquisa", to: "/pesquisa" },
] as const;

const sobreNos = [
  { rotulo: "Sobre nós", to: "/sobre" },
  { rotulo: "Contato", to: "/contato" },
  { rotulo: "Central de Ajuda", to: "/suporte" },
  { rotulo: "Perguntas frequentes", to: "/faq" },
  { rotulo: "Termos de Serviço", to: "/terms" },
  { rotulo: "Política de Privacidade", to: "/privacy" },
  { rotulo: "Política de Cookies", to: "/cookies" },
  { rotulo: "Jogo Responsável", to: "/responsible-gambling" },
  { rotulo: "Regras de Apostas", to: "/regras-apostas" },
  { rotulo: "Política AML/PLD", to: "/aml" },
  { rotulo: "Verificação e KYC", to: "/account/verification" },
  { rotulo: "Limites e autoexclusão", to: "/account/limits" },
  { rotulo: "Central de compliance", to: "/admin" },
] as const;

const contatos = [
  { titulo: "Suporte", linhas: ["0800-870-0186", "24 horas"] },
  { titulo: "Ouvidoria", linhas: ["0800-870-0187", "Seg a sex, 9h às 18h"] },
  { titulo: "Atendimento", linhas: ["suporte@zon7.bet.br", "ouvidoria@zon7.bet.br"] },
  { titulo: "Parceiros", linhas: ["partners@zon7.bet.br"] },
  { titulo: "Jurídico", linhas: ["juridico@zon7.bet.br"] },
  { titulo: "Imprensa", linhas: ["press@zon7.bet.br"] },
  { titulo: "Proteção de Dados", linhas: ["dpo@zon7.bet.br"] },
];

const selos = [
  {
    src: govbr.url,
    alt: "gov.br — portal do Governo Federal",
    href: "https://www.gov.br",
    h: "h-6",
  },
  {
    src: consumidor.url,
    alt: "consumidor.gov.br — plataforma de defesa do consumidor",
    href: "https://www.consumidor.gov.br",
    h: "h-5",
  },
  {
    src: conar.url,
    alt: "CONAR — Conselho Nacional de Autorregulamentação Publicitária",
    href: "https://www.conar.org.br",
    h: "h-6",
  },
];

const anelFoco =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar";

function Secao({
  titulo,
  children,
  rotuloNav,
}: {
  titulo: string;
  children: ReactNode;
  rotuloNav?: string;
}) {
  const isMobile = useIsMobile();
  const cabecalho = (
    <h2 className="text-[11px] font-semibold tracking-widest text-foreground/90 uppercase">
      {titulo}
    </h2>
  );

  if (!isMobile) {
    return (
      <nav aria-label={rotuloNav ?? titulo} className="min-w-0">
        {cabecalho}
        <div className="mt-4">{children}</div>
      </nav>
    );
  }

  return (
    <nav aria-label={rotuloNav ?? titulo} className="min-w-0 border-b border-border">
      <Collapsible>
        <CollapsibleTrigger
          className={`group flex min-h-11 w-full items-center justify-between gap-3 py-3 text-left ${anelFoco}`}
        >
          {cabecalho}
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-3">{children}</CollapsibleContent>
      </Collapsible>
    </nav>
  );
}

function ListaLinks({ itens }: { itens: readonly { rotulo: string; to: string }[] }) {
  return (
    <ul className="space-y-1">
      {itens.map((l) => (
        <li key={l.rotulo}>
          <Link
            to={l.to}
            className={`flex min-h-11 items-center text-foreground/90 transition-colors hover:text-primary sm:min-h-0 sm:py-1 ${anelFoco}`}
          >
            {l.rotulo}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="min-w-0 border-t border-border bg-sidebar px-4 pt-10 pb-8 text-sm sm:px-8 sm:pt-12">
      <div className="mx-auto grid max-w-6xl gap-6 sm:gap-10 lg:grid-cols-[1fr_0.6fr_0.9fr_1.8fr]">
        <div className="min-w-0">
          <Logo />
          <p className="mt-5 max-w-[18rem] text-[13px] leading-relaxed text-muted-foreground">
            Zon7 BET — jogo 100% comprovadamente justo e transparente.
          </p>
        </div>

        <Secao titulo="Links úteis">
          <ListaLinks itens={linksUteis} />
        </Secao>

        <Secao titulo="Sobre nós">
          <ListaLinks itens={sobreNos} />
        </Secao>

        <div className="min-w-0">
          <h2 className="sr-only">Certificações e informações legais</h2>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {selos.map((s) => (
              <li key={s.alt}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`inline-flex min-h-11 items-center ${anelFoco}`}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className={`${s.h} w-auto brightness-0 invert`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
            <img
              src={pix.url}
              alt="Pix — pagamento instantâneo"
              loading="lazy"
              className="h-7 w-auto brightness-0 invert"
            />
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-foreground text-[10px] font-bold text-foreground">
              <span aria-hidden="true">+18</span>
              <span className="sr-only">Proibido para menores de 18 anos</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs text-secondary-foreground">
              <span
                aria-hidden="true"
                className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground"
              >
                ✓
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] opacity-90">Verificada por</span>
                <span className="block font-semibold">ReclameAQUI</span>
              </span>
            </span>
          </div>

          <div className="mt-6 space-y-4 text-xs leading-relaxed break-words text-muted-foreground">
            <p>
              Zon7 BET é uma marca e plataforma de titularidade da Zon7 Entertainment Ltda., operada
              com exclusividade no Brasil, inscrita no CNPJ/MF sob o nº 56.431.248/0001-61, com
              endereço para correspondência: Avenida Paulista, 726, Sala/Conjunto 1202, Bela Vista,
              São Paulo – SP, 01310-910.
            </p>
            <p>
              A Zon7 BET opera sob a Autorização SPA/MF nº 471, datada de 10 de março de 2025, uma
              licença oficial do Governo Brasileiro.
            </p>
            <p>
              A Zon7 BET se compromete com a proteção dos direitos do consumidor. Acesse aqui o{" "}
              <Link to="/terms" className={`font-semibold text-foreground underline ${anelFoco}`}>
                Código de Defesa do Consumidor
              </Link>
              .
            </p>
            <p>
              Jogue com responsabilidade. A participação frequente pode causar transtornos
              relacionados a jogos de apostas, como dependência, endividamento e impactos à saúde.
              Para orientações e apoio, acesse nossa página de{" "}
              <Link
                to="/responsible-gambling"
                className={`font-semibold text-foreground underline ${anelFoco}`}
              >
                Jogo Responsável
              </Link>
              .
            </p>
            <p>
              É proibido utilizar recursos de programas assistenciais federais como Bolsa Família e
              Benefício de Prestação Continuada (LOAS) para realizar apostas. Cumprindo a IN SPA/MF
              nº 22/2025 e a diretriz do STF, impedimos o cadastro e o acesso de beneficiários.
            </p>
            <p>
              Proibido para menores de 18 anos. Não compartilhe o conteúdo desta plataforma com
              menores de idade.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border sm:mt-10 sm:pt-8">
        <Secao titulo="Contatos" rotuloNav="Canais de atendimento">
          <ul className="mx-auto grid max-w-7xl gap-5 text-xs sm:grid-cols-3 sm:text-center lg:grid-cols-7">
            {contatos.map((c) => (
              <li key={c.titulo} className="min-w-0">
                <p className="text-muted-foreground">{c.titulo}</p>
                {c.linhas.map((linha, i) => (
                  <p
                    key={linha}
                    className={
                      i === 0
                        ? "mt-1 font-semibold break-words text-foreground"
                        : "break-words text-muted-foreground"
                    }
                  >
                    {linha}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </Secao>
      </div>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Zon7 BET · Ambiente de demonstração, sem apostas reais.
      </p>
    </footer>
  );
}
