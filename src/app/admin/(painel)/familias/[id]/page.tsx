import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { atualizarFamilia } from "@/lib/actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditarFamiliaPage({ params }: Props) {
  const { id } = await params;
  const familia = await prisma.familia.findUnique({
    where: { id },
    include: { produtos: true, aplicacoes: { orderBy: [{ montadora: "asc" }, { modelo: "asc" }] } },
  });
  if (!familia) notFound();

  const atualizar = atualizarFamilia.bind(null, familia.id);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Editar família</h1>
        <form action={atualizar} className="space-y-4 rounded-xl border border-white/10 bg-bc-grafite/40 p-6">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Nome</label>
            <input
              name="nome"
              defaultValue={familia.nome}
              required
              className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Descrição</label>
            <textarea
              name="descricao"
              rows={3}
              defaultValue={familia.descricao ?? ""}
              className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" name="redirecionamentoAutomatico" defaultChecked={familia.redirecionamentoAutomatico} className="h-4 w-4" />
            Redirecionamento automático (encontrou aplicação ativa, vai direto pro WhatsApp)
          </label>
          <button
            type="submit"
            className="rounded-md bg-bc-amarelo px-6 py-3 font-display text-sm font-extrabold uppercase text-bc-preto hover:brightness-110"
          >
            Salvar
          </button>
        </form>
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold uppercase text-white/80">Produtos desta família</h2>
        <ul className="space-y-1 text-sm">
          {familia.produtos.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/produtos/${p.id}`} className="text-bc-amarelo hover:underline">
                {p.nome}
              </Link>
            </li>
          ))}
          {familia.produtos.length === 0 && <li className="text-white/40">Nenhum produto ainda.</li>}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold uppercase text-white/80">Aplicações desta família</h2>
          <Link href="/admin/aplicacoes/nova" className="text-sm text-bc-amarelo hover:underline">
            + nova aplicação
          </Link>
        </div>
        <ul className="divide-y divide-white/10 rounded-xl border border-white/10">
          {familia.aplicacoes.map((a) => (
            <li key={a.id} className="flex items-center justify-between px-4 py-2 text-sm">
              <span>
                {a.montadora} {a.modelo} ({a.anoInicial}-{a.anoFinal}) · {a.motorizacaoLabel}
                {!a.ativa && <span className="ml-2 text-white/40">(inativa)</span>}
              </span>
              <Link href={`/admin/aplicacoes/${a.id}`} className="text-bc-amarelo hover:underline">
                editar
              </Link>
            </li>
          ))}
          {familia.aplicacoes.length === 0 && <li className="px-4 py-2 text-white/40">Nenhuma aplicação ainda.</li>}
        </ul>
      </div>
    </div>
  );
}
