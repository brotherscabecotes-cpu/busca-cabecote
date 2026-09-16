import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuidedSearch from "@/components/GuidedSearch";
import { getAplicacoesPublicas } from "@/lib/catalog";

const passos = [
  {
    numero: "01",
    titulo: "Informe seu veículo",
    texto: "Selecione marca, modelo, ano e motorização. Sem código de peça, sem catálogo pra decifrar.",
  },
  {
    numero: "02",
    titulo: "Encontre o cabeçote",
    texto: "O Busca Cabeçote identifica a aplicação correspondente na nossa base.",
  },
  {
    numero: "03",
    titulo: "Solicite seu orçamento",
    texto: "Disponível, você fala direto pelo WhatsApp. Sem disponibilidade, a gente verifica pra você.",
  },
];

export default async function Home() {
  const aplicacoes = await getAplicacoesPublicas();
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-bc-amarelo">Busca Cabeçote</p>
          <h1 className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight sm:text-5xl">
            Cabeçotes à pronta entrega para o seu veículo.
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Informe seu veículo e encontre rapidamente o cabeçote correto. Disponível, é direto no WhatsApp.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <GuidedSearch aplicacoes={aplicacoes} />
        </section>

        <section id="como-funciona" className="border-t border-white/10 bg-bc-grafite/30 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-bc-amarelo">Como funciona</p>
            <h2 className="mb-10 font-display text-2xl font-extrabold uppercase sm:text-3xl">
              Três passos até o orçamento.
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {passos.map((p) => (
                <div key={p.numero} className="rounded-xl border border-white/10 bg-black/30 p-6">
                  <span className="mb-3 block font-mono text-sm text-bc-amarelo">{p.numero}</span>
                  <h3 className="mb-2 font-display text-lg font-bold">{p.titulo}</h3>
                  <p className="text-sm text-white/60">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="duvidas" className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-bc-amarelo">Dúvidas</p>
            <h2 className="mb-8 font-display text-2xl font-extrabold uppercase sm:text-3xl">Direto ao ponto.</h2>
            <div className="space-y-6 text-white/70">
              <div>
                <p className="font-display font-bold text-white">Atende motor diesel ou linha pesada?</p>
                <p className="text-sm">Não. Trabalhamos só com motores a gasolina, etanol e flex de veículos leves.</p>
              </div>
              <div>
                <p className="font-display font-bold text-white">Preciso saber o código da peça?</p>
                <p className="text-sm">Não. A busca guiada por marca, modelo, ano e motor já identifica isso pra você.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
