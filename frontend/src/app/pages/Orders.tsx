import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { api, ApiError } from '../lib/api';
import { Orden, RespuestaPaginada, EstadoOrden } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const colorEstado: Record<EstadoOrden, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  pagado: 'bg-blue-100 text-blue-800',
  enviado: 'bg-purple-100 text-purple-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
};

export function Orders() {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const respuesta = await api.get<RespuestaPaginada<Orden>>('/orders/mis-ordenes');
        setOrdenes(respuesta.data);
      } catch (error) {
        const mensaje = error instanceof ApiError ? error.message : 'No se pudieron cargar tus pedidos.';
        toast.error(mensaje);
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8">Mis Pedidos</h1>

        {cargando ? (
          <p className="text-gray-500">Cargando...</p>
        ) : ordenes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Todavía no has hecho ningún pedido.</p>
            <Button asChild>
              <Link to="/shop">Ir a la tienda</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {ordenes.map((orden) => (
              <Card key={orden._id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Pedido #{orden._id.slice(-6).toUpperCase()}
                  </CardTitle>
                  <Badge className={colorEstado[orden.estado]}>{orden.estado}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(orden.createdAt).toLocaleDateString()} · Envío a: {orden.direccionEnvio}
                  </p>
                  <div className="space-y-1 mb-3">
                    {orden.productos.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>
                          {item.nombre} {item.talla ? `(${item.talla})` : ''} x{item.cantidad}
                        </span>
                        <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg border-t pt-3">
                    <span>Total</span>
                    <span>${orden.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
