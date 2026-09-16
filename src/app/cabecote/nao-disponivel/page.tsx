import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

type Props = { searchParams: Promise<{ veiculo?: string; codigo?: string }> };

export const metadata = { title: "Verificando disponibilidade | Busca Cabeçote" };

export default async function NaoDisponivelPage({ searchParams }: Props) {
  const { veiculo } = await searchParams;
  const descricao = veiculo || "Cabeçote não identificado";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
        <h1 className="mb-3 font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
          Ainda não encontramos este cabeçote disponível.
        </h1>
        <p className="mb-8 text-white/70">
          Deixe seus dados e podemos verificar essa peça para você.
        </p>
        <div className="text-left">
          <LeadForm veiculo={descricao} />
        </div>
      </main>
      <Footer />
    </>
  );
}
