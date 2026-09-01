import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { api, ApiError } from '../lib/api';
import { Orden, Pago, MetodoPago } from '../types';

export function Checkout() {
  const { carrito, getCartTotal, refrescarCarrito } = useCart();
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
    metodo: 'tarjeta' as MetodoPago,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const direccionEnvio = [formData.direccion, formData.ciudad, formData.codigoPostal]
        .filter(Boolean)
        .join(', ');

      const { orden } = await api.post<{ success: boolean; orden: Orden }>('/orders', {
        direccionEnvio,
        telefonoContacto: formData.telefono,
      });

      await api.post<{ success: boolean; pago: Pago }>('/payments', {
        orden: orden._id,
        metodo: formData.metodo,
      });

      await refrescarCarrito();
      toast.success('¡Pedido realizado con éxito!');
      navigate('/pedidos');
    } catch (error) {
      const mensaje = error instanceof ApiError ? error.message : 'No se pudo completar el pedido.';
      toast.error(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!estaAutenticado) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl mb-4">Finalizar Compra</h1>
        <p className="text-gray-600 mb-8">Inicia sesión para completar tu pedido.</p>
        <Button asChild>
          <Link to="/login" state={{ from: '/checkout' }}>
            Iniciar sesión
          </Link>
        </Button>
      </div>
    );
  }

  if (!carrito || carrito.productos.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl mb-4">Finalizar Compra</h1>
        <p className="text-gray-600 mb-8">Tu carrito está vacío.</p>
        <Button asChild>
          <Link to="/shop">Ir a la tienda</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl mb-8">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      required
                      value={formData.direccion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad</Label>
                      <Input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codigoPostal">Código Postal</Label>
                      <Input
                        id="codigoPostal"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono de contacto</Label>
                    <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Método de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={formData.metodo}
                    onValueChange={(value: MetodoPago) => setFormData({ ...formData, metodo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tarjeta">Tarjeta</SelectItem>
                      <SelectItem value="efectivo">Efectivo contra entrega</SelectItem>
                      <SelectItem value="transferencia">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-3">
                    Este es un pago simulado con fines de demostración; no se procesa ningún cobro real.
                  </p>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={enviando}>
                {enviando ? 'Procesando...' : `Confirmar pedido — $${getCartTotal().toFixed(2)}`}
              </Button>
            </form>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {carrito.productos.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>
                      {item.producto.nombre} x{item.cantidad}
                    </span>
                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
