import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl mb-4">Tu Carrito</h1>
          <p className="text-xl text-gray-600 mb-8">
            Tu carrito está vacío. ¡Descubre nuestra colección!
          </p>
          <Button size="lg" asChild>
            <Link to="/shop">
              Ir a la tienda
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl mb-8">Tu Carrito</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.selectedSize}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Talla: {item.selectedSize}
                      </p>
                      <p className="text-lg mb-4">€{item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus size={16} />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>€{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span>€{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceder al pago
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
