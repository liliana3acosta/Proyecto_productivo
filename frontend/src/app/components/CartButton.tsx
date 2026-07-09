import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';

export function CartButton() {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart size={24} />
      {count > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {count}
        </Badge>
      )}
    </Link>
  );
}
