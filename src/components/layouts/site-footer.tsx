import { Link } from "@tanstack/react-router";

import conar from "@/assets/conar.png.asset.json";
import consumidor from "@/assets/consumidor.png.asset.json";
import govbr from "@/assets/govbr.png.asset.json";
import pix from "@/assets/pix.png.asset.json";
import { Logo } from "@/components/brand/logo";

const linksUteis = [
  { rotulo: "Crash", to: "/cassino/originais" },
  { rotulo: "Double", to: "/cassino/originais" },
  { rotulo: "Cassino ao vivo", to: "/cassino/ao-vivo" },
  { rotulo: "Esportes ao vivo", to: "/esportes/ao-vivo" },
  { rotulo: "Pesquisa", to: "/pesquisa" },
] as const;

const sobreNos = [
  { rotulo: "Termos de Serviço", to: "/terms" },
  { rotulo: "Política de Privacidade", to: "/privacy" },
  { rotulo: "Jogo Responsável", to: "/responsible-gambling" },
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
  { src: govbr.url, alt: "gov.br", h: "h-6" },
  { src: consumidor.url, alt: "consumidor.gov.br", h: "h-5" },
  { src: conar.url, alt: "CONAR", h: "h-6" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-sidebar px-4 pt-12 pb-8 text-sm sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.6fr_0.9fr_1.8fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[15rem] text-[13px] leading-relaxed text-muted-foreground">
            Zon7 BET — jogo 100% comprovadamente justo e transparente.
          </p>
        </div>

        <nav aria-label="Links úteis">
          <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Links úteis</h2>
          <ul className="mt-4 space-y-2.5">
            {linksUteis.map((l) => (
              <li key={l.rotulo}>
                <Link to={l.to} className="text-foreground/80 transition-colors hover:text-primary">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sobre nós">
          <h2 className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Sobre nós</h2>
          <ul className="mt-4 space-y-2.5">
            {sobreNos.map((l) => (
              <li key={l.rotulo}>
                <Link to={l.to} className="text-foreground/80 transition-colors hover:text-primary">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            {selos.map((s) => (
              <img
                key={s.alt}
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className={`${s.h} w-auto brightness-0 invert`}
              />
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
            <img src={pix.url} alt="Pix" loading="lazy" className="h-7 w-auto brightness-0 invert" />
            <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-foreground text-[10px] font-bold">
              +18
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                ✓
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] text-muted-foreground">Verificada por</span>
                <span className="block font-semibold">ReclameAQUI</span>
              </span>
            </span>
          </div>

          <div className="mt-6 space-y-4 text-xs leading-relaxed text-muted-foreground">
            <p>
              Zon7 BET é uma marca e plataforma de titularidade da Zon7 Entertainment Ltda., operada com exclusividade
              no Brasil, inscrita no CNPJ/MF sob o nº 56.431.248/0001-61, com endereço para correspondência: Avenida
              Paulista, 726, Sala/Conjunto 1202, Bela Vista, São Paulo – SP, 01310-910.
            </p>
            <p>
              A Zon7 BET opera sob a Autorização SPA/MF nº 471, datada de 10 de março de 2025, uma licença oficial do
              Governo Brasileiro.
            </p>
            <p>
              A Zon7 BET se compromete com a proteção dos direitos do consumidor. Acesse aqui o{" "}
              <Link to="/terms" className="font-semibold text-foreground underline">
                Código de Defesa do Consumidor
              </Link>
              .
            </p>
            <p>
              Jogue com responsabilidade. A participação frequente pode causar transtornos relacionados a jogos de
              apostas, como dependência, endividamento e impactos à saúde. Para orientações e apoio, acesse nossa
              página de{" "}
              <Link to="/responsible-gambling" className="font-semibold text-foreground underline">
                Jogo Responsável
              </Link>
              .
            </p>
            <p>
              É proibido utilizar recursos de programas assistenciais federais como Bolsa Família e Benefício de
              Prestação Continuada (LOAS) para realizar apostas. Cumprindo a IN SPA/MF nº 22/2025 e a diretriz do STF,
              impedimos o cadastro e o acesso de beneficiários.
            </p>
            <p>
              Proibido para menores de 18 anos. Não compartilhe o conteúdo desta plataforma com menores de idade.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-6 border-t border-border pt-8 text-center text-xs sm:grid-cols-3 lg:grid-cols-7">
        {contatos.map((c) => (
          <div key={c.titulo}>
            <p className="text-muted-foreground">{c.titulo}</p>
            {c.linhas.map((linha, i) => (
              <p key={linha} className={i === 0 ? "mt-1 font-semibold text-foreground" : "text-muted-foreground"}>
                {linha}
              </p>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Zon7 BET · Ambiente de demonstração, sem apostas reais.
      </p>
    </footer>
  );
}