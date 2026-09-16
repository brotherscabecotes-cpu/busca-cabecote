import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bc-preto/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/img/logo.png" alt="Busca Cabeçote" width={220} height={73} className="h-11 w-auto sm:h-14" priority />
        </Link>
        <nav className="hidden gap-6 font-mono text-xs uppercase tracking-wider text-white/70 sm:flex">
          <Link href="/#buscar" className="hover:text-bc-amarelo">Buscar cabeçote</Link>
          <Link href="/#como-funciona" className="hover:text-bc-amarelo">Como funciona</Link>
          <Link href="/#duvidas" className="hover:text-bc-amarelo">Dúvidas</Link>
        </nav>
      </div>
    </header>
  );
}
