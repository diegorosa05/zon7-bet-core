import { cn } from "@/lib/utils";

export interface SetorRoleta {
  id: string;
  rotulo: string;
  detalhe: string;
  tipo: "premio" | "jackpot" | "vazio";
}

const R = 92;
const CENTRO = 100;

function ponto(angulo: number, raio: number) {
  const rad = ((angulo - 90) * Math.PI) / 180;
  return [CENTRO + raio * Math.cos(rad), CENTRO + raio * Math.sin(rad)] as const;
}

function fatia(inicio: number, fim: number, raio: number) {
  const [x1, y1] = ponto(inicio, raio);
  const [x2, y2] = ponto(fim, raio);
  return `M ${CENTRO} ${CENTRO} L ${x1} ${y1} A ${raio} ${raio} 0 0 1 ${x2} ${y2} Z`;
}

interface Props {
  setores: SetorRoleta[];
  angulo: number;
  girando: boolean;
  duracaoMs: number;
  vencedor: number | null;
}

export function Wheel({ setores, angulo, girando, duracaoMs, vencedor }: Props) {
  const passo = 360 / setores.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[24rem]">
      {/* brilho de fundo */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-[-12%] rounded-full blur-3xl transition-opacity duration-700",
          girando ? "opacity-60" : "opacity-30",
        )}
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 45%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* ponteiro */}
      <div
        aria-hidden
        className="absolute top-[-2%] left-1/2 z-20 -translate-x-1/2"
      >
        <div className="grid h-10 w-10 place-items-center rounded-full border border-primary/60 bg-background shadow-lg">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
        <div className="mx-auto -mt-1 h-0 w-0 border-x-[9px] border-t-[16px] border-x-transparent border-t-primary" />
      </div>

      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="Roleta de prêmios"
        className="relative z-10 h-full w-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
      >
        {/* aro externo */}
        <circle cx={CENTRO} cy={CENTRO} r={98} className="fill-card" />
        <circle
          cx={CENTRO}
          cy={CENTRO}
          r={96}
          fill="none"
          strokeWidth={5}
          className="stroke-primary/70"
        />
        {setores.map((_, i) => {
          const [bx, by] = ponto(i * passo, 96);
          return (
            <circle
              key={`luz-${i}`}
              cx={bx}
              cy={by}
              r={2.4}
              className={cn(
                "fill-primary transition-opacity",
                girando ? "opacity-100" : "opacity-60",
              )}
            />
          );
        })}

        <g
          style={{
            transform: `rotate(${angulo}deg)`,
            transformOrigin: "100px 100px",
            transition: `transform ${duracaoMs}ms cubic-bezier(0.12, 0.7, 0.1, 1)`,
          }}
        >
          {setores.map((setor, i) => {
            const inicio = i * passo;
            const fim = inicio + passo;
            const meio = inicio + passo / 2;
            const [tx, ty] = ponto(meio, R * 0.62);
            const destaque = vencedor === i && !girando;
            const fill =
              setor.tipo === "jackpot"
                ? "var(--color-primary)"
                : i % 2 === 0
                  ? "color-mix(in oklab, var(--color-secondary) 85%, black)"
                  : "color-mix(in oklab, var(--color-secondary) 55%, black)";

            return (
              <g key={setor.id}>
                <path
                  d={fatia(inicio, fim, R)}
                  fill={fill}
                  stroke="color-mix(in oklab, var(--color-primary) 35%, transparent)"
                  strokeWidth={0.8}
                  opacity={destaque ? 1 : vencedor !== null && !girando ? 0.5 : 1}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${meio} ${tx} ${ty})`}
                  className="select-none"
                  style={{
                    fontSize: setor.tipo === "vazio" ? 9 : 11,
                    fontWeight: 700,
                    fill:
                      setor.tipo === "jackpot"
                        ? "var(--color-primary-foreground)"
                        : "white",
                  }}
                >
                  {setor.rotulo}
                </text>
                <text
                  x={tx}
                  y={ty + 9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${meio} ${tx} ${ty})`}
                  className="select-none"
                  style={{
                    fontSize: 5.5,
                    fill:
                      setor.tipo === "jackpot"
                        ? "color-mix(in oklab, var(--color-primary-foreground) 80%, transparent)"
                        : "rgba(255,255,255,0.75)",
                  }}
                >
                  {setor.detalhe}
                </text>
              </g>
            );
          })}
        </g>

        <circle cx={CENTRO} cy={CENTRO} r={26} className="fill-card" />
        <circle
          cx={CENTRO}
          cy={CENTRO}
          r={26}
          fill="none"
          strokeWidth={2}
          className="stroke-primary/60"
        />
      </svg>
    </div>
  );
}
