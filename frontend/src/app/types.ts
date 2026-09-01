export type Rol = 'cliente' | 'admin';

export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  rol: Rol;
  createdAt?: string;
}

export interface Categoria {
  _id: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  estado: boolean;
}

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria | string;
  imagenes: string[];
  talla: string[];
  color: string[];
  estado: boolean;
}

export interface ItemCarrito {
  _id: string;
  producto: Producto;
  cantidad: number;
  talla: string;
  color: string;
  precio: number;
}

export interface Carrito {
  _id: string;
  usuario: string;
  productos: ItemCarrito[];
  total: number;
}

export type EstadoOrden = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

export interface ItemOrden {
  producto: string;
  nombre: string;
  cantidad: number;
  talla: string;
  color: string;
  precio: number;
}

export interface Orden {
  _id: string;
  usuario: string | Usuario;
  productos: ItemOrden[];
  total: number;
  direccionEnvio: string;
  telefonoContacto?: string;
  estado: EstadoOrden;
  createdAt: string;
}

export interface RespuestaPaginada<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type MetodoPago = 'tarjeta' | 'efectivo' | 'transferencia';
export type EstadoPago = 'pendiente' | 'completado' | 'fallido' | 'reembolsado';

export interface Pago {
  _id: string;
  orden: string | Orden;
  usuario: string | Usuario;
  monto: number;
  metodo: MetodoPago;
  estado: EstadoPago;
  referencia: string;
  createdAt: string;
}

export type EstadoCita = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

export interface Cita {
  _id: string;
  usuario: string | Usuario;
  servicio: string;
  fecha: string;
  hora: string;
  notas?: string;
  estado: EstadoCita;
  createdAt: string;
}

export interface ResumenDashboard {
  totalUsuarios: number;
  totalProductos: number;
  totalOrdenes: number;
  totalVentas: number;
  citasPendientes: number;
}
