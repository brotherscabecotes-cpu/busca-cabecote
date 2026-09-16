import { prisma } from "@/lib/db";
import { criarProduto } from "@/lib/actions";
import ProdutoForm from "@/components/admin/ProdutoForm";

export default async function NovoProdutoPage() {
  const familias = await prisma.familia.findMany({ orderBy: { nome: "asc" } });

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Novo produto</h1>
      <ProdutoForm action={criarProduto} familias={familias} botao="Criar produto" />
    </div>
  );
}
