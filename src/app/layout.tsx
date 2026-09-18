import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
  metadataBase: new URL("https://buscacabecote.com"),
  title: "Busca Cabeçote: encontre o cabeçote certo para sua oficina",
  description:
    "Informe o veículo e encontre rapidamente o cabeçote correto. Disponível, é direto no WhatsApp. Feito para oficinas, mecânicos e centros automotivos.",
  icons: { icon: "/favicon-192.png" },
  openGraph: {
    title: "Busca Cabeçote: encontre o cabeçote certo para sua oficina",
    description:
      "Informe o veículo e encontre rapidamente o cabeçote correto. Disponível, é direto no WhatsApp.",
    url: "https://buscacabecote.com",
    siteName: "Busca Cabeçote",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Busca Cabeçote: encontre o cabeçote certo para sua oficina",
    description: "Informe o veículo e encontre rapidamente o cabeçote correto. Disponível, é direto no WhatsApp.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      <body className="min-h-screen bg-bc-preto text-bc-branco font-sans antialiased">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
