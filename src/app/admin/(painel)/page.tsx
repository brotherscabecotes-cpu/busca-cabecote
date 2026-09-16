import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [familias, produtos, aplicacoes, leadsNovos] = await Promise.all([
    prisma.familia.count(),
    prisma.produto.count(),
    prisma.aplicacao.count(),
    prisma.lead.count({ where: { status: "Novo" } }),
  ]);

  const cards = [
    { label: "Famílias cadastradas", valor: familias, href: "/admin/familias" },
    { label: "Produtos cadastrados", valor: produtos, href: "/admin/produtos" },
    { label: "Aplicações cadastradas", valor: aplicacoes, href: "/admin/aplicacoes" },
    { label: "Leads novos", valor: leadsNovos, href: "/admin/leads" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Painel</h1>
      <div className="grid gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-white/10 bg-bc-grafite/40 p-5 hover:border-bc-amarelo/50"
          >
            <p className="font-display text-3xl font-extrabold text-bc-amarelo">{c.valor}</p>
            <p className="mt-1 text-sm text-white/60">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
