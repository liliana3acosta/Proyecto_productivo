import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ApiError } from '../lib/api';

export function Cart() {
  const { estaAutenticado } = useAuth();
  const { carrito, cargando, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const manejarError = (error: unknown) => {
    const mensaje = error instanceof ApiError ? error.message : 'Ocurrió un error con el carrito.';
    toast.error(mensaje);
  };

  if (!estaAutenticado) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl mb-4">Tu Carrito</h1>
          <p className="text-xl text-gray-600 mb-8">
            Inicia sesión para ver y gestionar tu carrito.
          </p>
          <Button size="lg" asChild>
            <Link to="/login" state={{ from: '/cart' }}>
              Iniciar sesión
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (cargando && !carrito) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500">Cargando tu carrito...</p>
      </div>
    );
  }

  const items = carrito?.productos ?? [];

  if (items.length === 0) {
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
            {items.map((item) => (
              <Card key={item._id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <ImageWithFallback
                      src={item.producto.imagenes[0] ?? ''}
                      alt={item.producto.nombre}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{item.producto.nombre}</h3>
                      {item.talla && (
                        <p className="text-gray-600 text-sm mb-2">Talla: {item.talla}</p>
                      )}
                      <p className="text-lg mb-4">${item.precio.toFixed(2)}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item._id, item.cantidad - 1).catch(manejarError)
                            }
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center">{item.cantidad}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item._id, item.cantidad + 1).catch(manejarError)
                            }
                          >
                            <Plus size={16} />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item._id).catch(manejarError)}
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
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
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
