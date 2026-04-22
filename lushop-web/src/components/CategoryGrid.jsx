'use client';

import Image from 'next/image';
import Link from 'next/link';

const CATS = [
  { label: 'Sneakers',   href: '/?categoria=SNEAKERS',   img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { label: 'Prendas',    href: '/?categoria=PRENDAS',    img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80' },
  { label: 'Accesorios', href: '/?categoria=ACCESORIOS', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80' },
  { label: 'Ofertas',    href: '/',                      img: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80' },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CATS.map(cat => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group relative overflow-hidden aspect-square"
          >
            <Image
              src={cat.img}
              alt={cat.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-bg-dark/30 group-hover:bg-bg-dark/50 transition-colors duration-300" />

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <span className="font-oswald text-white text-lg font-semibold uppercase tracking-wide">
                {cat.label}
              </span>
              <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
