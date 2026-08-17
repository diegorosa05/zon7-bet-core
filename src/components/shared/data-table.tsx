import { Search } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { EmptyState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Coluna<T> {
  chave: string;
  titulo: string;
  render: (item: T) => ReactNode;
  /** Renderização compacta usada no card mobile; padrão: render */
  className?: string;
  ocultarNoMobile?: boolean;
}

export interface Filtro<T> {
  id: string;
  rotulo: string;
  opcoes: { valor: string; rotulo: string }[];
  aplicar: (item: T, valor: string) => boolean;
}

interface DataTableProps<T> {
  dados: T[];
  colunas: Coluna<T>[];
  chaveItem: (item: T) => string;
  busca?: (item: T, termo: string) => boolean;
  placeholderBusca?: string;
  filtros?: Filtro<T>[];
  porPagina?: number;
  onSelecionar?: (item: T) => void;
  tituloVazio?: string;
  descricaoVazio?: string;
}

export function DataTable<T>({
  dados,
  colunas,
  chaveItem,
  busca,
  placeholderBusca = "Buscar…",
  filtros = [],
  porPagina = 8,
  onSelecionar,
  tituloVazio = "Nenhum registro encontrado",
  descricaoVazio = "Ajuste a busca ou os filtros para ver outros resultados.",
}: DataTableProps<T>) {
  const [termo, setTermo] = useState("");
  const [valoresFiltro, setValoresFiltro] = useState<Record<string, string>>({});
  const [pagina, setPagina] = useState(1);

  const filtrados = useMemo(() => {
    return dados.filter((item) => {
      if (termo && busca && !busca(item, termo.toLowerCase())) return false;
      for (const filtro of filtros) {
        const valor = valoresFiltro[filtro.id];
        if (valor && valor !== "todos" && !filtro.aplicar(item, valor)) return false;
      }
      return true;
    });
  }, [dados, termo, busca, filtros, valoresFiltro]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const visiveis = filtrados.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

  return (
    <div className="space-y-4">
      {(busca || filtros.length > 0) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {busca ? (
            <div className="relative min-w-0 flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={termo}
                onChange={(e) => {
                  setTermo(e.target.value);
                  setPagina(1);
                }}
                placeholder={placeholderBusca}
                className="pl-9"
                aria-label={placeholderBusca}
              />
            </div>
          ) : null}
          {filtros.map((filtro) => (
            <Select
              key={filtro.id}
              value={valoresFiltro[filtro.id] ?? "todos"}
              onValueChange={(v) => {
                setValoresFiltro((prev) => ({ ...prev, [filtro.id]: v }));
                setPagina(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-52" aria-label={filtro.rotulo}>
                <SelectValue placeholder={filtro.rotulo} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">{filtro.rotulo}: todos</SelectItem>
                {filtro.opcoes.map((op) => (
                  <SelectItem key={op.valor} value={op.valor}>
                    {op.rotulo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      )}

      {visiveis.length === 0 ? (
        <EmptyState titulo={tituloVazio} descricao={descricaoVazio} />
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {colunas.map((coluna) => (
                    <TableHead key={coluna.chave} className="text-xs tracking-wide uppercase">
                      {coluna.titulo}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visiveis.map((item) => (
                  <TableRow
                    key={chaveItem(item)}
                    onClick={onSelecionar ? () => onSelecionar(item) : undefined}
                    className={cn(onSelecionar && "cursor-pointer")}
                  >
                    {colunas.map((coluna) => (
                      <TableCell key={coluna.chave} className={coluna.className}>
                        {coluna.render(item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 md:hidden">
            {visiveis.map((item) => (
              <button
                key={chaveItem(item)}
                type="button"
                onClick={onSelecionar ? () => onSelecionar(item) : undefined}
                className="w-full rounded-xl border border-border bg-card p-4 text-left"
              >
                {colunas
                  .filter((c) => !c.ocultarNoMobile)
                  .map((coluna) => (
                    <div key={coluna.chave} className="flex items-start justify-between gap-3 py-1">
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {coluna.titulo}
                      </span>
                      <span className="min-w-0 text-right text-sm">{coluna.render(item)}</span>
                    </div>
                  ))}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="tabular text-xs text-muted-foreground">
              {filtrados.length} registro(s) · página {paginaAtual} de {totalPaginas}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={paginaAtual <= 1}
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={paginaAtual >= totalPaginas}
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
