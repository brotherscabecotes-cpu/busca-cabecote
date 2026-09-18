"use client";

import Image from "next/image";
import Link from "next/link";
import { linkWhatsApp } from "@/lib/whatsapp";
import { trackTelefoneClick, trackWhatsappClick } from "@/lib/tracking";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 text-sm text-white/60 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <Image src="/img/logo.png" alt="Busca Cabeçote" width={140} height={46} className="mb-3 h-7 w-auto" />
          <p>
            Plataforma especializada em cabeçotes para motores a gasolina, etanol e flex. Não atendemos diesel,
            caminhão, ônibus ou linha pesada.
          </p>
          <p className="mt-4 text-white/50">
            Dúvidas e informações:{" "}
            <a href="tel:+551144573588" onClick={trackTelefoneClick} className="text-white/70 hover:text-bc-amarelo">
              (11) 4457-3588
            </a>
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link href="/#buscar" className="hover:text-bc-amarelo">Buscar cabeçote</Link>
          <Link href="/#como-funciona" className="hover:text-bc-amarelo">Como funciona</Link>
          <Link href="/#duvidas" className="hover:text-bc-amarelo">Dúvidas</Link>
          <a
            href={linkWhatsApp("Olá! Vim pelo site Busca Cabeçote.")}
            onClick={() => trackWhatsappClick("rodapé")}
            className="hover:text-bc-amarelo"
          >
            WhatsApp
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-xs">
        © {new Date().getFullYear()} Busca Cabeçote — Grupo Retífica Pierre. Todos os direitos reservados.
      </div>
    </footer>
  );
}
