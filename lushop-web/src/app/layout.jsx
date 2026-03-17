import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import WhatsAppButton from '@/components/WhatsAppButton';
import '@/styles/globals.css';

export const metadata = {
  title: 'LU Shop+ | Sneakers Premium a Precios Accesibles',
  description: 'Tienda de sneakers y moda urbana. Marcas reconocidas, envío gratis en compras mayores a $2,500 MXN.',
  keywords: 'sneakers, zapatos, Nike, Adidas, Jordan, moda urbana, calzado premium',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Cart />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
