import { prisma } from "@/lib/db";
import { criarAplicacao } from "@/lib/actions";
import AplicacaoForm from "@/components/admin/AplicacaoForm";

export default async function NovaAplicacaoPage() {
  const [familias, produtos] = await Promise.all([
    prisma.familia.findMany({ orderBy: { nome: "asc" } }),
    prisma.produto.findMany({ orderBy: { nome: "asc" } }),
  ]);

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Nova aplicação</h1>
      <AplicacaoForm action={criarAplicacao} familias={familias} produtos={produtos} botao="Criar aplicação" />
    </div>
  );
}
