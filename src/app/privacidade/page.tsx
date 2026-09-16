import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Política de privacidade | Busca Cabeçote" };

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Política de privacidade</h1>
        <p className="mb-4 text-sm text-white/70">
          Usamos os dados enviados pelo formulário de verificação de peça (nome, oficina, WhatsApp e cidade)
          exclusivamente para retornar o contato sobre a disponibilidade do cabeçote procurado.
        </p>
        <p className="text-sm text-white/70">
          Página em elaboração junto com o restante da plataforma.
        </p>
      </main>
      <Footer />
    </>
  );
}
