import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mallu Pet | Cuidado Veterinário com Amor e Dedicação",
  description:
    "A Mallu Pet oferece consultas veterinárias, vacinação completa, exames laboratoriais e muito mais. Seu pet merece saúde, carinho e atenção de verdade! Agende agora pelo WhatsApp: (19) 99954-5724",
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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
