import { PublicLayout } from "@/components/layouts/public-layout";

export interface SecaoLegal {
  id: string;
  titulo: string;
  paragrafos: string[];
}

export function LegalPage({
  titulo,
  atualizacao,
  resumo,
  secoes,
}: {
  titulo: string;
  atualizacao: string;
  resumo: string;
  secoes: SecaoLegal[];
}) {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Documento institucional
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{titulo}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Última atualização: {atualizacao}</p>
          <p className="mt-5 text-muted-foreground">{resumo}</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Nesta página</p>
            <ul className="mt-3 space-y-2 text-sm">
              {secoes.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-10">
            {secoes.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-lg font-semibold">{s.titulo}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.paragrafos.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
