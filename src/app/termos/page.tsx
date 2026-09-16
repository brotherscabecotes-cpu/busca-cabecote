import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Termos de uso | Busca Cabeçote" };

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Termos de uso</h1>
        <p className="mb-4 text-sm text-white/70">
          O Busca Cabeçote é uma plataforma de busca de aplicação de cabeçotes automotivos para motores a
          gasolina, etanol e flex, voltada a oficinas mecânicas, mecânicos e centros automotivos. Não atendemos
          diesel, caminhão, ônibus ou linha pesada, e não somos uma retífica.
        </p>
        <p className="text-sm text-white/70">
          Página em elaboração junto com o restante da plataforma.
        </p>
      </main>
      <Footer />
    </>
  );
}
