import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { atualizarAplicacao } from "@/lib/actions";
import AplicacaoForm from "@/components/admin/AplicacaoForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditarAplicacaoPage({ params }: Props) {
  const { id } = await params;
  const [aplicacao, familias, produtos] = await Promise.all([
    prisma.aplicacao.findUnique({ where: { id } }),
    prisma.familia.findMany({ orderBy: { nome: "asc" } }),
    prisma.produto.findMany({ orderBy: { nome: "asc" } }),
  ]);
  if (!aplicacao) notFound();

  const atualizar = atualizarAplicacao.bind(null, aplicacao.id);

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Editar aplicação</h1>
      <AplicacaoForm action={atualizar} familias={familias} produtos={produtos} aplicacao={aplicacao} botao="Salvar" />
    </div>
  );
}
