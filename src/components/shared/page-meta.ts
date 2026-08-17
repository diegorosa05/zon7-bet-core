/** Helper para gerar meta tags padrão das páginas do mockup. */
export function meta(titulo: string, descricao: string) {
  return {
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
