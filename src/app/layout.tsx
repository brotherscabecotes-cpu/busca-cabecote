import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Busca Cabeçote: encontre o cabeçote certo para sua oficina",
  description:
    "Informe o veículo e encontre rapidamente o cabeçote correto. Disponível, é direto no WhatsApp. Feito para oficinas, mecânicos e centros automotivos.",
  icons: { icon: "/favicon-192.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bc-preto text-bc-branco font-sans antialiased">{children}</body>
    </html>
  );
}
