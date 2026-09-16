import Link from "next/link";
import { prisma } from "@/lib/db";
import { alternarAtivaAplicacao, excluirAplicacao } from "@/lib/actions";

export default async function AplicacoesPage() {
  const aplicacoes = await prisma.aplicacao.findMany({
    include: { familia: true, produto: true },
    orderBy: [{ montadora: "asc" }, { modelo: "asc" }, { anoInicial: "asc" }],
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold uppercase">Aplicações</h1>
        <Link
          href="/admin/aplicacoes/nova"
          className="rounded-md bg-bc-amarelo px-4 py-2 font-display text-sm font-extrabold uppercase text-bc-preto hover:brightness-110"
        >
          Nova aplicação
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-bc-grafite/50 text-white/50">
            <tr>
              <th className="px-4 py-3">Veículo</th>
              <th className="px-4 py-3">Anos</th>
              <th className="px-4 py-3">Motor</th>
              <th className="px-4 py-3">Família</th>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Ativa</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {aplicacoes.map((a) => {
              const toggle = alternarAtivaAplicacao.bind(null, a.id, a.ativa);
              const excluir = excluirAplicacao.bind(null, a.id);
              return (
                <tr key={a.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium">
                    {a.montadora} {a.modelo}
                  </td>
                  <td className="px-4 py-3 text-white/60">
                    {a.anoInicial}-{a.anoFinal}
                  </td>
                  <td className="px-4 py-3 text-white/60">{a.motorizacaoLabel}</td>
                  <td className="px-4 py-3 text-white/60">
                    {a.familia.nome}
                    {!a.familia.redirecionamentoAutomatico && (
                      <span className="ml-1 text-white/30">(família desligada)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/60">{a.produto.nome}</td>
                  <td className="px-4 py-3">
                    <form action={toggle}>
                      <button
                        type="submit"
                        className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
                          a.ativa ? "border-bc-amarelo bg-bc-amarelo/15 text-bc-amarelo" : "border-white/20 text-white/50"
                        }`}
                      >
                        {a.ativa ? "Sim" : "Não"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/aplicacoes/${a.id}`} className="mr-3 text-bc-amarelo hover:underline">
                      Editar
                    </Link>
                    <form action={excluir} className="inline">
                      <button type="submit" className="text-red-400 hover:underline">
                        Excluir
                      </button>
                    </form>
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
