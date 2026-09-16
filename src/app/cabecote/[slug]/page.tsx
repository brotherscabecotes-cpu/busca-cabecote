import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";
import { linkWhatsApp } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const produtos = await prisma.produto.findMany({ select: { slug: true } });
  return produtos.map((p) => ({ slug: p.slug }));
}

async function buscarProdutoDisponivel(slug: string) {
  const produto = await prisma.produto.findUnique({
    where: { slug },
    include: { familia: true, aplicacoes: { where: { ativa: true } } },
  });
  if (!produto) return null;
  const disponivel = produto.disponivel && produto.familia.redirecionamentoAutomatico;
  return { produto, disponivel };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const encontrado = await buscarProdutoDisponivel(slug);
  if (!encontrado) return {};
  return {
    title: encontrado.produto.tituloSEO,
    description: encontrado.produto.metaDescription,
  };
}

export default async function CabecotePage({ params }: Props) {
  const { slug } = await params;
  const encontrado = await buscarProdutoDisponivel(slug);
  if (!encontrado || !encontrado.disponivel) notFound();
  const { produto } = encontrado;

  const compativeis = produto.aplicacoes
    .map((a) => `${a.montadora} ${a.modelo} (${a.anoInicial} a ${a.anoFinal})`)
    .join(", ");

  const mensagem = `Olá! Encontrei no Busca Cabeçote o ${produto.nome} e gostaria de solicitar um orçamento.`;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <nav className="mb-6 font-mono text-xs uppercase tracking-wider text-white/40">
          <Link href="/" className="hover:text-bc-amarelo">Início</Link> / {produto.nome}
        </nav>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              width={800}
              height={600}
              className="h-full w-full object-contain p-6"
              priority
            />
          </div>

          <div>
            <span className="mb-3 inline-block rounded-full border border-bc-amarelo/40 bg-bc-amarelo/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-bc-amarelo">
              Temos este cabeçote disponível
            </span>
            <h1 className="mb-3 font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
              {produto.nome}
            </h1>
            {compativeis && <p className="mb-6 text-white/70">{compativeis}</p>}

            <dl className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-bc-grafite/40 p-5 text-sm">
              <div>
                <dt className="text-white/40">Motor</dt>
                <dd className="font-medium">{produto.motor}</dd>
              </div>
              <div>
                <dt className="text-white/40">Cilindrada</dt>
                <dd className="font-medium">{produto.cilindrada}</dd>
              </div>
              <div>
                <dt className="text-white/40">Válvulas</dt>
                <dd className="font-medium">{produto.valvulas}</dd>
              </div>
              <div>
                <dt className="text-white/40">Combustível</dt>
                <dd className="font-medium">{produto.combustivel}</dd>
              </div>
              <div>
                <dt className="text-white/40">Condição</dt>
                <dd className="font-medium">{produto.condicao}</dd>
              </div>
              <div>
                <dt className="text-white/40">Garantia</dt>
                <dd className="font-medium">{produto.garantiaMeses} meses</dd>
              </div>
              <div>
                <dt className="text-white/40">Base de troca</dt>
                <dd className="font-medium">{produto.baseDeTroca ? "Sim" : "Não"}</dd>
              </div>
            </dl>

            <p className="mb-6 text-sm text-white/60">{produto.descricao}</p>

            <a
              href={linkWhatsApp(mensagem)}
              className="btn-toque block w-full rounded-md bg-bc-amarelo py-4 text-center font-display text-base font-extrabold uppercase tracking-wide text-bc-preto hover:brightness-110 sm:inline-block sm:w-auto sm:px-10"
            >
              Pedir este cabeçote agora
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
