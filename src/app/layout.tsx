import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "Mallu Pet | Cuidado Veterinário com Amor e Dedicação",
  description:
    "A Mallu Pet oferece consultas veterinárias, vacinação completa, exames laboratoriais e muito mais. Seu pet merece saúde, carinho e atenção de verdade! Agende agora pelo WhatsApp: (19) 98118-5783",
  keywords: [
    "veterinária", "consultório veterinário", "mallu pet", "consulta veterinária",
    "vacinação pets", "cuidados com animais", "gatos", "cachorros"
  ],
  openGraph: {
    title: "Mallu Pet | Cuidado Veterinário com Amor e Dedicação",
    description: "Onde seu pet é tratado com amor e cuidado!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>{children}</body>
    </html>
  );
}
