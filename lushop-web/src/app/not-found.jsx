import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-oswald text-9xl font-bold text-accent-silver mb-4">
          404
        </h1>
        <h2 className="font-oswald text-3xl font-semibold mb-4">
          Página No Encontrada
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-accent-silver text-bg-primary font-semibold uppercase tracking-wider hover:bg-white transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
