import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

export default function Home({ searchParams }) {
  const categoria = searchParams?.categoria || null;

  return (
    <>
      <Hero />
      <ProductGrid initialCategory={categoria} />
    </>
  );
}
