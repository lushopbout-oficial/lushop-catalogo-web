'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function Cart() {
  const {
    cart,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getShippingCost,
  } = useCart();

  const total = getTotal();
  const shippingCost = getShippingCost();
  const finalTotal = total + shippingCost;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Generar mensaje de WhatsApp
    let message = '🛍️ *Nuevo Pedido LU Shop+*\n\n';

    cart.forEach(item => {
      message += `• ${item.marca} ${item.modelo}\n`;
      message += `  Talla: ${item.talla}\n`;
      message += `  Cantidad: ${item.quantity}\n`;
      message += `  Precio: $${item.precio_venta.toLocaleString()}\n\n`;
    });

    message += `💰 *Subtotal: $${total.toLocaleString()} MXN*\n`;

    // Información de envío
    if (shippingCost === 0) {
      message += `🚚 *Envío: GRATIS* ✨\n`;
    } else if (total >= 1500) {
      message += `🚚 *Envío: $${shippingCost.toLocaleString()} MXN* (50% descuento)\n`;
    } else {
      message += `🚚 *Envío: $${shippingCost.toLocaleString()} MXN*\n`;
    }

    message += `\n💳 *Total: $${finalTotal.toLocaleString()} MXN*\n\n`;
    message += '¿Confirmas tu pedido? 😊';

    // Abrir WhatsApp
    const whatsappNumber = '19132187736';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-bg-secondary z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="font-oswald text-2xl font-bold uppercase">
            Tu Carrito
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-text-secondary">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.sku}
                  className="flex gap-4 bg-bg-card p-4 border border-border-light"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-bg-primary">
                    <Image
                      src={item.foto_url || '/placeholder.jpg'}
                      alt={item.modelo}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                      {item.marca}
                    </p>
                    <h3 className="font-semibold text-sm mb-1 truncate">
                      {item.modelo}
                    </h3>
                    <p className="text-xs text-text-secondary mb-2">
                      Talla: {item.talla}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-border-medium text-text-secondary hover:border-accent-silver hover:text-accent-silver transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-border-medium text-text-secondary hover:border-accent-silver hover:text-accent-silver transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.sku)}
                      className="text-text-secondary hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <p className="font-oswald text-lg font-bold text-accent-silver">
                      ${(item.precio_venta * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-text-secondary hover:text-red-500 transition-colors py-2"
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer (Checkout) */}
        {cart.length > 0 && (
          <div className="border-t border-border-light p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal:</span>
              <span className="font-semibold">${total.toLocaleString()}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Envío:</span>
              <span className={`font-semibold ${shippingCost === 0 ? 'text-green-500' : ''}`}>
                {shippingCost === 0 ? 'GRATIS ✨' : `$${shippingCost.toLocaleString()}`}
              </span>
            </div>

            {/* Shipping Info */}
            <div className="text-xs text-text-secondary py-2 border-t border-border-light">
              {total >= 2500 ? (
                <p className="text-green-500">🎉 ¡Envío gratis!</p>
              ) : total >= 1500 ? (
                <p>💰 50% descuento en envío</p>
              ) : (
                <p>💡 Agrega ${(1500 - total).toLocaleString()} más para 50% descuento en envío</p>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-border-light">
              <span className="font-oswald text-lg uppercase">Total:</span>
              <span className="font-oswald text-2xl font-bold text-accent-silver">
                ${finalTotal.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-accent-silver text-bg-primary font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Finalizar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
