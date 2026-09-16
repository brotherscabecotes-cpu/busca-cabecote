import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { atualizarProduto } from "@/lib/actions";
import ProdutoForm from "@/components/admin/ProdutoForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditarProdutoPage({ params }: Props) {
  const { id } = await params;
  const [produto, familias] = await Promise.all([
    prisma.produto.findUnique({ where: { id } }),
    prisma.familia.findMany({ orderBy: { nome: "asc" } }),
  ]);
  if (!produto) notFound();

  const atualizar = atualizarProduto.bind(null, produto.id);

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Editar produto</h1>
      <ProdutoForm action={atualizar} familias={familias} produto={produto} botao="Salvar" />
    </div>
  );
}
