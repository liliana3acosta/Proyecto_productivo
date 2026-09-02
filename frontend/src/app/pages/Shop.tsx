import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { api, ApiError } from '../lib/api';
import { Producto, Categoria } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

function nombreCategoria(producto: Producto): string {
  if (typeof producto.categoria === 'string') return producto.categoria;
  return producto.categoria?.nombre ?? '';
}

export function Shop() {
  const { addToCart } = useCart();
  const { estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');
  const [cargando, setCargando] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [agregando, setAgregando] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);

      try {
        const [productosData, categoriasData] = await Promise.all([
          api.get<Producto[]>('/products', { auth: false }),
          api.get<Categoria[]>('/categories', { auth: false }),
        ]);

        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (error) {
        const mensaje = error instanceof ApiError ? error.message : 'No se pudieron cargar los productos.';
        toast.error(mensaje);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  const productosFiltrados =
    categoriaFiltro === 'todas'
      ? productos
      : productos.filter((p) => {
          const idCategoria = typeof p.categoria === 'string' ? p.categoria : p.categoria?._id;
          return idCategoria === categoriaFiltro;
        });

  const handleAddToCart = async (producto: Producto) => {
    if (!estaAutenticado) {
      toast.error('Inicia sesión para agregar productos al carrito');
      navigate('/login', { state: { from: '/shop' } });
      return;
    }

    const talla = selectedSizes[producto._id];
    const tallasDisponibles = producto.talla ?? [];

    if (tallasDisponibles.length > 0 && !talla) {
      toast.error('Por favor, selecciona una talla');
      return;
    }

    setAgregando(producto._id);

    try {
      await addToCart(producto._id, 1, talla ?? '');
      toast.success('Producto agregado al carrito');
    } catch (error) {
      const mensaje = error instanceof ApiError ? error.message : 'No se pudo agregar el producto.';
      toast.error(mensaje);
    } finally {
      setAgregando(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Nuestra Tienda</h1>
          <p className="text-xl text-gray-600">
            Descubre la colección completa de Artdance Fashion
          </p>
        </div>

        {categorias.length > 0 && (
          <div className="flex justify-center mb-8">
            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria._id} value={categoria._id}>
                    {categoria.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {cargando ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : productosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">Todavía no hay productos disponibles.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <Card key={producto._id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <ImageWithFallback
                    src={producto.imagenes?.[0] ?? ''}
                    alt={producto.nombre}
                    className="w-full h-80 object-cover"
                  />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-sm text-gray-500 mb-2">{nombreCategoria(producto)}</div>
                  <CardTitle className="mb-2">{producto.nombre}</CardTitle>
                  <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                  <div className="text-2xl mb-4">${producto.precio.toFixed(2)}</div>

                  {Array.isArray(producto.talla) && producto.talla.length > 0 && (
                    <Select
                      value={selectedSizes[producto._id] || ''}
                      onValueChange={(value) =>
                        setSelectedSizes({ ...selectedSizes, [producto._id]: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona talla" />
                      </SelectTrigger>
                      <SelectContent>
                        {producto.talla.map((talla) => (
                          <SelectItem key={talla} value={talla}>
                            {talla}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {producto.stock === 0 && (
                    <p className="text-sm text-red-500 mt-2">Sin stock disponible</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={producto.stock === 0 || agregando === producto._id}
                    onClick={() => handleAddToCart(producto)}
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    {agregando === producto._id ? 'Agregando...' : 'Agregar al carrito'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}