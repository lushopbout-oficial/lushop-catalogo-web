import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import DarkBanner from '@/components/DarkBanner';
import TrustBar from '@/components/TrustBar';
import Footer from '@/components/Footer'; // 1. Importamos el Footer

export default function Home({ searchParams }) {
  const categoria = searchParams?.categoria || null;

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductGrid initialCategory={categoria} />
      <DarkBanner />
      <TrustBar />
      <Footer /> {/* 2. Lo colocamos al final para cerrar la página */}
    </>
  );
}
