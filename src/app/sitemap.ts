import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const produtos = await prisma.produto.findMany({
    where: { disponivel: true, familia: { redirecionamentoAutomatico: true } },
    select: { slug: true, updatedAt: true },
  });

  const paginasProduto: MetadataRoute.Sitemap = produtos.map((p) => ({
    url: `https://buscacabecote.com/cabecote/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://buscacabecote.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...paginasProduto,
    {
      url: "https://buscacabecote.com/privacidade",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://buscacabecote.com/termos",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
