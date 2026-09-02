import { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ApiError } from '../lib/api';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);

  const destino = (location.state as { from?: string } | null)?.from || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await login(email, password);
      toast.success('¡Bienvenido de nuevo!');
      navigate(destino, { replace: true });
    } catch (error) {
      const mensaje = error instanceof ApiError ? error.message : 'No se pudo iniciar sesión.';
      toast.error(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                {/* Enlace para recuperar contraseña */}
                <Link 
                  to="/recuperar-password" 
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={enviando}>
              {enviando ? 'Ingresando...' : 'Ingresar'}
            </Button>
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="underline">
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}