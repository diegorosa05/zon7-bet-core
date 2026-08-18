import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Faixa horizontal com rolagem suave: barra nativa oculta, setas de navegação
 * no desktop, gradientes indicando conteúdo além das bordas e suporte a teclado.
 */
export function ScrollRow({
  children,
  className,
  gap = "gap-3",
}: {
  children: ReactNode;
  className?: string;
  gap?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  const medir = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setInicio(el.scrollLeft <= 2);
    setFim(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    medir();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [medir]);

  const rolar = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 200), behavior: "smooth" });
  };

  return (
    <div className="group/scroll relative">
      <button
        type="button"
        aria-label="Rolar para a esquerda"
        onClick={() => rolar(-1)}
        disabled={inicio}
        className={cn(
          "absolute left-1 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-opacity hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring md:grid",
          inicio
            ? "pointer-events-none opacity-0"
            : "opacity-0 group-hover/scroll:opacity-100 focus-visible:opacity-100",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Rolar para a direita"
        onClick={() => rolar(1)}
        disabled={fim}
        className={cn(
          "absolute right-1 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-opacity hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring md:grid",
          fim
            ? "pointer-events-none opacity-0"
            : "opacity-0 group-hover/scroll:opacity-100 focus-visible:opacity-100",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={ref}
        onScroll={medir}
        tabIndex={0}
        style={{
          WebkitMaskImage: `linear-gradient(to right, transparent 0, #000 ${inicio ? "0px" : "40px"}, #000 calc(100% - ${fim ? "0px" : "40px"}), transparent 100%)`,
          maskImage: `linear-gradient(to right, transparent 0, #000 ${inicio ? "0px" : "40px"}, #000 calc(100% - ${fim ? "0px" : "40px"}), transparent 100%)`,
        }}
        className={cn(
          "no-scrollbar -mx-1 flex snap-x snap-mandatory scroll-px-1 overflow-x-auto px-1 pb-1 outline-none focus-visible:ring-2 focus-visible:ring-ring",
          gap,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
