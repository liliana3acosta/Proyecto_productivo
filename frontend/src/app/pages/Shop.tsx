import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function Shop() {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const size = selectedSizes[productId];

    if (!product) return;

    if (!size) {
      toast.error('Por favor, selecciona una talla');
      return;
    }

    addToCart(product, size);
    toast.success('Producto agregado al carrito');
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                <CardTitle className="mb-2">{product.name}</CardTitle>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="text-2xl mb-4">€{product.price.toFixed(2)}</div>
                
                <Select
                  value={selectedSizes[product.id] || ''}
                  onValueChange={(value) =>
                    setSelectedSizes({ ...selectedSizes, [product.id]: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona talla" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Agregar al carrito
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
