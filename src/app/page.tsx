import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SobreSection from "@/components/SobreSection";
import ServicosSection from "@/components/ServicosSection";
import PromocaoSection from "@/components/PromocaoSection";
import CatalogoSection from "@/components/CatalogoSection";
import GaleriaSection from "@/components/GaleriaSection";
import AvaliacoesSection from "@/components/AvaliacoesSection";
import BlogSection from "@/components/BlogSection";
import ContatoSection from "@/components/ContatoSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SobreSection />
        <ServicosSection />
        <PromocaoSection />
        <CatalogoSection />
        <GaleriaSection />
        <AvaliacoesSection />
        <BlogSection />
        <ContatoSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
