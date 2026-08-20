import { useEffect, useState, type ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "zon7.age-gate";
type Resposta = "maior" | "menor";

export function AgeGate({ children }: { children: ReactNode }) {
  const [resposta, setResposta] = useState<Resposta | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(STORAGE_KEY);
      if (salvo === "maior" || salvo === "menor") setResposta(salvo);
    } catch {
      /* ignora */
    }
    setPronto(true);
  }, []);

  function responder(valor: Resposta) {
    setResposta(valor);
    try {
      window.localStorage.setItem(STORAGE_KEY, valor);
    } catch {
      /* ignora */
    }
  }

  function reabrir() {
    setResposta(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignora */
    }
  }

  const liberado = resposta === "maior";

  return (
    <>
      <div aria-hidden={pronto && !liberado} inert={pronto && !liberado}>
        {children}
      </div>

      {pronto && !liberado ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 px-4 backdrop-blur-md"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
            <div className="flex justify-center">
              <Logo />
            </div>

            {resposta === "menor" ? (
              <>
                <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10 text-lg font-bold text-destructive">
                  18
                </div>
                <h2 id="age-gate-title" className="mt-5 text-xl font-semibold">
                  Acesso não permitido
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Apostas são proibidas para menores de 18 anos. O acesso à plataforma foi
                  bloqueado neste dispositivo.
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Jogue com responsabilidade. Em caso de dúvidas, fale com o suporte.
                </p>
                <Button variant="outline" className="mt-6 w-full" onClick={reabrir}>
                  Respondi por engano
                </Button>
              </>
            ) : (
              <>
                <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-lg font-bold text-primary">
                  +18
                </div>
                <h2 id="age-gate-title" className="mt-5 text-xl font-semibold">
                  Você tem 18 anos ou mais?
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  O acesso à plataforma é permitido apenas para maiores de 18 anos. Confirme sua
                  idade para continuar.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  <Button className="w-full" onClick={() => responder("maior")}>
                    Sim, tenho 18+
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => responder("menor")}>
                    Não, sou menor
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Jogo responsável. Apostas envolvem risco de perda financeira.
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
