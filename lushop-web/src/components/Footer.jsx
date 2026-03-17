import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-oswald text-lg font-semibold uppercase tracking-wide mb-4">
              LU Shop+
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Sneakers premium y moda urbana a precios accesibles. Marcas reconocidas con garantía de autenticidad.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-oswald text-lg font-semibold uppercase tracking-wide mb-4">
              Categorías
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?categoria=SNEAKERS" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Sneakers
                </Link>
              </li>
              <li>
                <Link href="/?categoria=KIDS" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/?categoria=HOMBRE" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Hombre
                </Link>
              </li>
              <li>
                <Link href="/?categoria=MUJER" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Mujer
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-oswald text-lg font-semibold uppercase tracking-wide mb-4">
              Información
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Métodos de Pago
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary text-sm hover:text-accent-silver transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-oswald text-lg font-semibold uppercase tracking-wide mb-4">
              Síguenos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://facebook.com/lushopplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-sm hover:text-accent-silver transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/lushopplus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-sm hover:text-accent-silver transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/19132187736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-sm hover:text-accent-silver transition-colors"
                >
                  WhatsApp: +1 913-218-7736
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-light text-center">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} LU Shop+. Todos los derechos reservados. | lu-shop.com
          </p>
        </div>
      </div>
    </footer>
  );
}
