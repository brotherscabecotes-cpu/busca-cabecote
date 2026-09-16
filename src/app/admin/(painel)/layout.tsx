import Link from "next/link";
import { logout } from "@/lib/actions";

const links = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/familias", label: "Famílias" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/aplicacoes", label: "Aplicações" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bc-preto text-bc-branco">
      <header className="border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider text-white/70">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-bc-amarelo">
                {l.label}
              </Link>
            ))}
          </nav>
          <form action={logout}>
            <button className="font-mono text-xs uppercase tracking-wider text-white/50 hover:text-bc-amarelo">Sair</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
