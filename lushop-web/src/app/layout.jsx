import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import Cart from '@/components/Cart';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'LU Shop+ | Sneakers Premium a Precios Accesibles',
  description: 'Catálogo de sneakers, prendas y accesorios premium. Envío gratis en compras mayores a $2,500 MXN.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Cart />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
