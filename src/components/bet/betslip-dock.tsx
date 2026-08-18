import { Ticket } from "lucide-react";
import { useState } from "react";

import { Betslip } from "@/components/bet/betslip";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBetslip } from "@/lib/betslip";

export function BetslipDock() {
  const { selecoes, oddTotal } = useBetslip();
  const [aberto, setAberto] = useState(false);

  if (selecoes.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="fixed right-4 bottom-20 z-50 flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring lg:bottom-6"
      >
        <Ticket className="h-4 w-4" />
        Cupom
        <span className="tabular rounded-full bg-background/20 px-2 py-0.5 text-xs">
          {selecoes.length}
        </span>
        <span className="tabular text-xs opacity-80">{oddTotal.toFixed(2)}x</span>
      </button>

      <Sheet open={aberto} onOpenChange={setAberto}>
        <SheetContent side="right" className="w-full p-4 sm:max-w-sm">
          <SheetTitle className="sr-only">Cupom de apostas</SheetTitle>
          <div className="mt-6">
            <Betslip />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
