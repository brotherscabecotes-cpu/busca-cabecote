import { prisma } from "./db";

export type AplicacaoPublica = {
  montadora: string;
  modelo: string;
  anoInicial: number;
  anoFinal: number;
  motorizacaoLabel: string;
  disponivel: boolean;
  produtoId: string;
  produtoSlug: string;
  produtoNome: string;
  varianteTecnica: string | null;
};

// Todas as aplicações cadastradas (ativas ou não), para a busca guiada
// conseguir oferecer as opções. A decisão de redirecionar pro WhatsApp
// ou cair no formulário de lead depende de "disponivel", calculado aqui:
// aplicação ativa + família com redirecionamento automático ligado + produto disponível.
export async function getAplicacoesPublicas(): Promise<AplicacaoPublica[]> {
  const aplicacoes = await prisma.aplicacao.findMany({
    include: { familia: true, produto: true },
    orderBy: [{ montadora: "asc" }, { modelo: "asc" }, { anoInicial: "asc" }],
  });

  return aplicacoes.map((a) => ({
    montadora: a.montadora,
    modelo: a.modelo,
    anoInicial: a.anoInicial,
    anoFinal: a.anoFinal,
    motorizacaoLabel: a.motorizacaoLabel,
    disponivel: a.ativa && a.familia.redirecionamentoAutomatico && a.produto.disponivel,
    produtoId: a.produtoId,
    produtoSlug: a.produto.slug,
    produtoNome: a.produto.nome,
    varianteTecnica: a.produto.varianteTecnica,
  }));
}

export async function getProdutoPorSlug(slug: string) {
  return prisma.produto.findUnique({
    where: { slug },
    include: { familia: true },
  });
}
