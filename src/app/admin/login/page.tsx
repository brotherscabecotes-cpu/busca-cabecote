import { login } from "@/lib/actions";

export const metadata = { title: "Entrar | Painel Busca Cabeçote" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-bc-preto px-4">
      <form action={login} className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-bc-grafite/50 p-8">
        <h1 className="font-display text-xl font-extrabold uppercase text-white">Painel Busca Cabeçote</h1>
        {erro && <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">Senha incorreta.</p>}
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Senha</label>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-bc-amarelo"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-bc-amarelo py-3 font-display text-sm font-extrabold uppercase tracking-wide text-bc-preto hover:brightness-110"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
