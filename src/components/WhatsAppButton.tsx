"use client";

import { linkWhatsApp } from "@/lib/whatsapp";
import { trackWhatsappClick } from "@/lib/tracking";

export default function WhatsAppButton({
  mensagem,
  veiculo,
  produtoNome,
  className,
  children,
}: {
  mensagem: string;
  veiculo: string;
  produtoNome?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={linkWhatsApp(mensagem)}
      className={className}
      onClick={() => trackWhatsappClick(veiculo, produtoNome)}
    >
      {children}
    </a>
  );
}
