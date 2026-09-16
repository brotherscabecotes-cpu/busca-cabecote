import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function ProdutosPage() {
  const produtos = await prisma.produto.findMany({
    include: { familia: true, _count: { select: { aplicacoes: true } } },
    orderBy: { nome: "asc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold uppercase">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="rounded-md bg-bc-amarelo px-4 py-2 font-display text-sm font-extrabold uppercase text-bc-preto hover:brightness-110"
        >
          Novo produto
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-bc-grafite/50 text-white/50">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Variante</th>
              <th className="px-4 py-3">Família</th>
              <th className="px-4 py-3">Aplicações</th>
              <th className="px-4 py-3">Disponível</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">{p.nome}</td>
                <td className="px-4 py-3 text-white/60">{p.varianteTecnica ?? "—"}</td>
                <td className="px-4 py-3 text-white/60">{p.familia.nome}</td>
                <td className="px-4 py-3 text-white/60">{p._count.aplicacoes}</td>
                <td className="px-4 py-3">
                  <span className={p.disponivel ? "text-bc-amarelo" : "text-white/40"}>{p.disponivel ? "Sim" : "Não"}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/produtos/${p.id}`} className="text-bc-amarelo hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
