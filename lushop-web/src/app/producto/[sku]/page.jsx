import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySKU, getProducts } from '@/services/sheetsAPI';
import AddToCartButton from './AddToCartButton';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(product => ({
    sku: product.sku,
  }));
}

export default async function ProductPage({ params }) {
  const product = await getProductBySKU(params.sku);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-text-secondary hover:text-accent-silver transition-colors">
            Inicio
          </Link>
          <span className="mx-2 text-text-secondary">/</span>
          <span className="text-text-primary">{product.modelo}</span>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-bg-secondary border border-border-light overflow-hidden group">
            <Image
              src={product.foto_url || '/placeholder.jpg'}
              alt={product.modelo}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.stock <= 2 && (
              <div className="absolute top-4 right-4 bg-accent-gold text-bg-primary px-4 py-2 font-bold uppercase text-sm">
                {product.stock} Disponibles
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Brand */}
            <div className="text-sm text-text-secondary uppercase tracking-widest mb-3 font-semibold">
              {product.marca}
            </div>

            {/* Model */}
            <h1 className="font-oswald text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
              {product.modelo}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="font-oswald text-5xl font-bold text-accent-silver">
                ${product.precio_venta.toLocaleString()}
                <span className="text-lg text-text-secondary ml-2">MXN</span>
              </div>
            </div>

            {/* Size */}
            <div className="mb-8 pb-8 border-b border-border-light">
              <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">
                Talla
              </div>
              <div className="inline-block px-6 py-3 border-2 border-accent-silver bg-bg-card">
                <span className="font-oswald text-2xl font-semibold">{product.talla}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">En stock ({product.stock} disponibles)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Agotado</span>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Product Details */}
            <div className="mt-12 space-y-6">
              <div>
                <h3 className="font-oswald text-xl font-semibold mb-3 uppercase tracking-wide">
                  Detalles del Producto
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <dt className="text-text-secondary">Marca:</dt>
                    <dd className="font-semibold">{product.marca}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <dt className="text-text-secondary">Categoría:</dt>
                    <dd className="font-semibold">{product.categoria}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <dt className="text-text-secondary">Talla:</dt>
                    <dd className="font-semibold">{product.talla}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border-light">
                    <dt className="text-text-secondary">SKU:</dt>
                    <dd className="font-mono text-sm">{product.sku}</dd>
                  </div>
                </dl>
              </div>

              {/* Shipping Info */}
              <div className="bg-bg-card border border-border-light p-6">
                <h3 className="font-oswald text-lg font-semibold mb-4 uppercase tracking-wide">
                  Información de Envío
                </h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-silver flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Envío gratis en compras mayores a $2,500 MXN</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-silver flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>50% descuento en envío para compras entre $1,500 - $2,499 MXN</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-accent-silver flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Entrega a todo México</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Catalog */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-border-medium text-text-secondary hover:border-accent-silver hover:text-accent-silver transition-all uppercase text-sm tracking-wider font-semibold"
          >
            ← Volver al Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
