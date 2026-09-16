type Familia = { id: string; nome: string };
type Produto = {
  nome: string;
  slug: string;
  familiaId: string;
  motor: string;
  cilindrada: string;
  valvulas: number;
  combustivel: string;
  condicao: string;
  garantiaMeses: number;
  baseDeTroca: boolean;
  mostrarPreco: boolean;
  preco: number | null;
  descricao: string;
  imagem: string;
  tituloSEO: string;
  metaDescription: string;
  disponivel: boolean;
  varianteTecnica: string | null;
};

const inputCls =
  "w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-bc-amarelo";
const labelCls = "mb-1 block text-xs uppercase tracking-wide text-white/50";

export default function ProdutoForm({
  action,
  familias,
  produto,
  botao,
}: {
  action: (formData: FormData) => void;
  familias: Familia[];
  produto?: Produto;
  botao: string;
}) {
  return (
    <form action={action} className="grid gap-4 rounded-xl border border-white/10 bg-bc-grafite/40 p-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelCls}>Nome do produto</label>
        <input name="nome" required defaultValue={produto?.nome} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>URL amigável (slug)</label>
        <input name="slug" required defaultValue={produto?.slug} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Família</label>
        <select name="familiaId" required defaultValue={produto?.familiaId} className={inputCls}>
          {familias.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls}>Motor</label>
        <input name="motor" required defaultValue={produto?.motor} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Cilindrada</label>
        <input name="cilindrada" required defaultValue={produto?.cilindrada} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Válvulas</label>
        <input name="valvulas" type="number" required defaultValue={produto?.valvulas} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Combustível</label>
        <select name="combustivel" defaultValue={produto?.combustivel ?? "Flex"} className={inputCls}>
          <option value="Flex">Flex</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Etanol">Etanol</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Condição</label>
        <select name="condicao" defaultValue={produto?.condicao ?? "Remanufaturado"} className={inputCls}>
          <option value="Remanufaturado">Remanufaturado</option>
          <option value="Novo">Novo</option>
        </select>
      </div>
      <div>
        <label className={labelCls}>Garantia (meses)</label>
        <input name="garantiaMeses" type="number" defaultValue={produto?.garantiaMeses ?? 12} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Preço (opcional)</label>
        <input name="preco" type="number" step="0.01" defaultValue={produto?.preco ?? ""} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Imagem (caminho em /public)</label>
        <input name="imagem" defaultValue={produto?.imagem ?? "/img/cabecote-ea111.jpg"} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Variante técnica (uso interno, ex: Tucho Fino, Roletado, Câmara Coração)</label>
        <input
          name="varianteTecnica"
          defaultValue={produto?.varianteTecnica ?? ""}
          placeholder="Deixe em branco se não houver variante"
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Descrição</label>
        <textarea name="descricao" rows={3} required defaultValue={produto?.descricao} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Título SEO</label>
        <input name="tituloSEO" required defaultValue={produto?.tituloSEO} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Meta description</label>
        <input name="metaDescription" required defaultValue={produto?.metaDescription} className={inputCls} />
      </div>

      <div className="flex flex-wrap gap-6 sm:col-span-2">
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" name="baseDeTroca" defaultChecked={produto?.baseDeTroca ?? true} className="h-4 w-4" />
          À base de troca
        </label>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" name="mostrarPreco" defaultChecked={produto?.mostrarPreco ?? false} className="h-4 w-4" />
          Mostrar preço no site
        </label>
        <label className="flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" name="disponivel" defaultChecked={produto?.disponivel ?? true} className="h-4 w-4" />
          Disponível em estoque
        </label>
      </div>

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
