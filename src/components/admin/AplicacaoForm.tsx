type Familia = { id: string; nome: string };
type Produto = { id: string; nome: string; familiaId: string };
type Aplicacao = {
  montadora: string;
  modelo: string;
  anoInicial: number;
  anoFinal: number;
  cilindrada: string;
  valvulas: number;
  combustivel: string;
  familiaId: string;
  produtoId: string;
  ativa: boolean;
  observacoes: string | null;
};

const inputCls =
  "w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-bc-amarelo";
const labelCls = "mb-1 block text-xs uppercase tracking-wide text-white/50";

export default function AplicacaoForm({
  action,
  familias,
  produtos,
  aplicacao,
  botao,
}: {
  action: (formData: FormData) => void;
  familias: Familia[];
  produtos: Produto[];
  aplicacao?: Aplicacao;
  botao: string;
}) {
  return (
    <form action={action} className="grid gap-4 rounded-xl border border-white/10 bg-bc-grafite/40 p-6 sm:grid-cols-2">
      <div>
        <label className={labelCls}>Montadora</label>
        <input name="montadora" required defaultValue={aplicacao?.montadora} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Modelo</label>
        <input name="modelo" required defaultValue={aplicacao?.modelo} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Ano inicial</label>
        <input name="anoInicial" type="number" required defaultValue={aplicacao?.anoInicial} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Ano final</label>
        <input name="anoFinal" type="number" required defaultValue={aplicacao?.anoFinal} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Cilindrada</label>
        <input name="cilindrada" required defaultValue={aplicacao?.cilindrada} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Válvulas</label>
        <input name="valvulas" type="number" required defaultValue={aplicacao?.valvulas} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Combustível</label>
        <select name="combustivel" defaultValue={aplicacao?.combustivel ?? "Flex"} className={inputCls}>
          <option value="Flex">Flex</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Etanol">Etanol</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Família</label>
        <select name="familiaId" required defaultValue={aplicacao?.familiaId} className={inputCls}>
          {familias.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Produto (cabeçote)</label>
        <select name="produtoId" required defaultValue={aplicacao?.produtoId} className={inputCls}>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Observações (uso interno, não aparece pro cliente)</label>
        <textarea name="observacoes" rows={2} defaultValue={aplicacao?.observacoes ?? ""} className={inputCls} />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/80 sm:col-span-2">
        <input type="checkbox" name="ativa" defaultChecked={aplicacao?.ativa ?? true} className="h-4 w-4" />
        Aplicação ativa (some da busca do cliente se desmarcada)
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-bc-amarelo px-6 py-3 font-display text-sm font-extrabold uppercase text-bc-preto hover:brightness-110"
        >
          {botao}
        </button>
      </div>
    </form>
  );
}
