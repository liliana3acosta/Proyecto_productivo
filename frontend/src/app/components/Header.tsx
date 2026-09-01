import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { CartButton } from './CartButton';
import { useAuth } from '../context/AuthContext';
import logo from "../../assets/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { estaAutenticado, esAdmin, usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo Artdance Fashion"
              className="h-12 w-auto rounded-full m-3"
            />
            <span className="text-2xl">ArtDance Fashion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Inicio
            </Link>
            <Link to="/shop" className="hover:text-gray-600 transition-colors">
              Tienda
            </Link>
            <Link to="/citas" className="hover:text-gray-600 transition-colors">
              Citas
            </Link>
            <a href="/#acerca" className="hover:text-gray-600 transition-colors">
              Acerca de
            </a>
            <a href="/#contacto" className="hover:text-gray-600 transition-colors">
              Contacto
            </a>
            {estaAutenticado && (
              <Link to="/pedidos" className="hover:text-gray-600 transition-colors">
                Mis pedidos
              </Link>
            )}
            {esAdmin && (
              <Link to="/admin" className="hover:text-gray-600 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <CartButton />
            {estaAutenticado ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <User size={16} />
                  {usuario?.nombre}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut size={16} className="mr-1" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/shop">Comprar</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center gap-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CartButton />
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4">
            <Link to="/" className="hover:text-gray-600 transition-colors">
              Inicio
            </Link>
            <Link to="/shop" className="hover:text-gray-600 transition-colors">
              Tienda
            </Link>
            <Link to="/citas" className="hover:text-gray-600 transition-colors">
              Citas
            </Link>
            <a href="/#acerca" className="hover:text-gray-600 transition-colors">
              Acerca de
            </a>
            <a href="/#contacto" className="hover:text-gray-600 transition-colors">
              Contacto
            </a>
            {estaAutenticado && (
              <Link to="/pedidos" className="hover:text-gray-600 transition-colors">
                Mis pedidos
              </Link>
            )}
            {esAdmin && (
              <Link to="/admin" className="hover:text-gray-600 transition-colors">
                Admin
              </Link>
            )}
            {estaAutenticado ? (
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Cerrar sesión ({usuario?.nombre})
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
            )}
            <Button className="w-full" asChild>
              <Link to="/shop">Comprar</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
