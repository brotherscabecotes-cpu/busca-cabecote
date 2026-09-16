import { criarFamilia } from "@/lib/actions";

export default function NovaFamiliaPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Nova família</h1>
      <form action={criarFamilia} className="space-y-4 rounded-xl border border-white/10 bg-bc-grafite/40 p-6">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Nome</label>
          <input
            name="nome"
            required
            placeholder="Ex: Renault K4M 1.6 16V"
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Descrição</label>
          <textarea
            name="descricao"
            rows={3}
            className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" name="redirecionamentoAutomatico" className="h-4 w-4" />
          Redirecionamento automático (encontrou aplicação ativa, vai direto pro WhatsApp)
        </label>
        <button
          type="submit"
          className="rounded-md bg-bc-amarelo px-6 py-3 font-display text-sm font-extrabold uppercase text-bc-preto hover:brightness-110"
        >
          Criar família
        </button>
      </form>
    </div>
  );
}
