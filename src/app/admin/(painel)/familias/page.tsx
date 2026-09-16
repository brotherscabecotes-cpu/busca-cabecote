import Link from "next/link";
import { prisma } from "@/lib/db";
import { alternarRedirecionamentoFamilia } from "@/lib/actions";

export default async function FamiliasPage() {
  const familias = await prisma.familia.findMany({
    include: { _count: { select: { aplicacoes: true, produtos: true } } },
    orderBy: { nome: "asc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold uppercase">Famílias de motor</h1>
        <Link
          href="/admin/familias/nova"
          className="rounded-md bg-bc-amarelo px-4 py-2 font-display text-sm font-extrabold uppercase text-bc-preto hover:brightness-110"
        >
          Nova família
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-bc-grafite/50 text-white/50">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Produtos</th>
              <th className="px-4 py-3">Aplicações</th>
              <th className="px-4 py-3">Redirecionamento automático</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {familias.map((f) => {
              const toggle = alternarRedirecionamentoFamilia.bind(null, f.id, f.redirecionamentoAutomatico);
              return (
                <tr key={f.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium">{f.nome}</td>
                  <td className="px-4 py-3 text-white/60">{f._count.produtos}</td>
                  <td className="px-4 py-3 text-white/60">{f._count.aplicacoes}</td>
                  <td className="px-4 py-3">
                    <form action={toggle}>
                      <button
                        type="submit"
                        className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
                          f.redirecionamentoAutomatico
                            ? "border-bc-amarelo bg-bc-amarelo/15 text-bc-amarelo"
                            : "border-white/20 text-white/50"
                        }`}
                      >
                        {f.redirecionamentoAutomatico ? "Sim" : "Não"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/familias/${f.id}`} className="text-bc-amarelo hover:underline">
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
