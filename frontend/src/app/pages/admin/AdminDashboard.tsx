import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api, ApiError } from '../../lib/api';
import {
  ResumenDashboard,
  Cita,
  Orden,
  Producto,
  RespuestaPaginada,
  EstadoCita,
  EstadoOrden,
} from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const ESTADOS_ORDEN: EstadoOrden[] = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];
const ESTADOS_CITA: EstadoCita[] = ['pendiente', 'confirmada', 'cancelada', 'completada'];

function TarjetaResumen({ titulo, valor }: { titulo: string; valor: string | number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-gray-500 mb-1">{titulo}</p>
        <p className="text-3xl">{valor}</p>
      </CardContent>
    </Card>
  );
}

function manejarError(error: unknown, defecto: string) {
  const mensaje = error instanceof ApiError ? error.message : defecto;
  toast.error(mensaje);
}

export function AdminDashboard() {
  const [resumen, setResumen] = useState<ResumenDashboard | null>(null);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarTodo = async () => {
    setCargando(true);
    try {
      const [resumenData, citasData, ordenesData, productosData] = await Promise.all([
        api.get<ResumenDashboard>('/dashboard/resumen'),
        api.get<Cita[]>('/appointments'),
        api.get<RespuestaPaginada<Orden>>('/orders'),
        api.get<Producto[]>('/products', { auth: false }),
      ]);

      setResumen(resumenData);
      setCitas(citasData);
      setOrdenes(ordenesData.data);
      setProductos(productosData);
    } catch (error) {
      manejarError(error, 'No se pudo cargar el panel de administración.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const cambiarEstadoCita = async (id: string, estado: EstadoCita) => {
    try {
      await api.put(`/appointments/${id}/estado`, { estado });
      setCitas((prev) => prev.map((c) => (c._id === id ? { ...c, estado } : c)));
      toast.success('Estado de la cita actualizado.');
    } catch (error) {
      manejarError(error, 'No se pudo actualizar la cita.');
    }
  };

  const cambiarEstadoOrden = async (id: string, estado: EstadoOrden) => {
    try {
      await api.put(`/orders/${id}/estado`, { estado });
      setOrdenes((prev) => prev.map((o) => (o._id === id ? { ...o, estado } : o)));
      toast.success('Estado del pedido actualizado.');
    } catch (error) {
      manejarError(error, 'No se pudo actualizar el pedido.');
    }
  };

  const eliminarProducto = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProductos((prev) => prev.filter((p) => p._id !== id));
      toast.success('Producto eliminado.');
    } catch (error) {
      manejarError(error, 'No se pudo eliminar el producto.');
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 text-center">
        <p className="text-gray-500">Cargando panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-8">Panel de Administración</h1>

        {resumen && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            <TarjetaResumen titulo="Usuarios" valor={resumen.totalUsuarios} />
            <TarjetaResumen titulo="Productos" valor={resumen.totalProductos} />
            <TarjetaResumen titulo="Pedidos" valor={resumen.totalOrdenes} />
            <TarjetaResumen titulo="Ventas totales" valor={`$${resumen.totalVentas.toFixed(2)}`} />
            <TarjetaResumen titulo="Citas pendientes" valor={resumen.citasPendientes} />
          </div>
        )}

        <Tabs defaultValue="citas">
          <TabsList>
            <TabsTrigger value="citas">Citas</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="productos">Productos</TabsTrigger>
          </TabsList>

          <TabsContent value="citas" className="space-y-4 mt-6">
            {citas.length === 0 ? (
              <p className="text-gray-500">No hay citas registradas.</p>
            ) : (
              citas.map((cita) => (
                <Card key={cita._id}>
                  <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{cita.servicio}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(cita.fecha).toLocaleDateString()} · {cita.hora}
                        {typeof cita.usuario === 'object' &&
                          ` · ${cita.usuario.nombre} ${cita.usuario.apellido}`}
                      </p>
                    </div>
                    <Select
                      value={cita.estado}
                      onValueChange={(valor: EstadoCita) => cambiarEstadoCita(cita._id, valor)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTADOS_CITA.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="pedidos" className="space-y-4 mt-6">
            {ordenes.length === 0 ? (
              <p className="text-gray-500">No hay pedidos registrados.</p>
            ) : (
              ordenes.map((orden) => (
                <Card key={orden._id}>
                  <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">
                        Pedido #{orden._id.slice(-6).toUpperCase()} · ${orden.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(orden.createdAt).toLocaleDateString()}
                        {typeof orden.usuario === 'object' &&
                          ` · ${orden.usuario.nombre} ${orden.usuario.apellido}`}
                      </p>
                    </div>
                    <Select
                      value={orden.estado}
                      onValueChange={(valor: EstadoOrden) => cambiarEstadoOrden(orden._id, valor)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTADOS_ORDEN.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="productos" className="space-y-4 mt-6">
            {productos.length === 0 ? (
              <p className="text-gray-500">No hay productos registrados.</p>
            ) : (
              productos.map((producto) => (
                <Card key={producto._id}>
                  <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{producto.nombre}</p>
                      <p className="text-sm text-gray-500">
                        ${producto.precio.toFixed(2)} · Stock: {producto.stock}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={producto.estado ? 'default' : 'outline'}>
                        {producto.estado ? 'Activo' : 'Inactivo'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => eliminarProducto(producto._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
            <p className="text-sm text-gray-500">
              Crear y editar productos/categorías aún se hace desde la API (Postman/Insomnia) o se
              puede agregar aquí como siguiente paso.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
