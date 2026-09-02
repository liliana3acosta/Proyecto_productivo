import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function ForgotPassword() {
  const [paso, setPaso] = useState(1); // Paso 1: Pedir correo, Paso 2: Nueva contraseña
  const [email, setEmail] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Paso 1: Verificar el correo en el backend
  const handleVerificarCorreo = async (e: FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo verificar el correo.');
      }

      toast.success('¡Correo verificado! Ingresa tu nueva contraseña.');
      setPaso(2); // Pasamos al siguiente paso
    } catch (error: any) {
      toast.error(error.message || 'Ocurrió un error.');
    } finally {
      setCargando(false);
    }
  };

  // Paso 2: Actualizar la contraseña
  const handleCambiarPassword = async (e: FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nuevaPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo actualizar la contraseña.');
      }

      toast.success('¡Contraseña actualizada con éxito! Ya puedes iniciar sesión.');
      navigate('/login'); // Redirigir al login
    } catch (error: any) {
      toast.error(error.message || 'Ocurrió un error al actualizar.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {paso === 1 ? 'Recuperar contraseña' : 'Nueva contraseña'}
          </CardTitle>
        </CardHeader>

        {paso === 1 ? (
          <form onSubmit={handleVerificarCorreo}>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Ingresa el correo electrónico asociado a tu cuenta para verificarlo.
              </p>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu-correo@ejemplo.com"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={cargando}>
                {cargando ? 'Verificando...' : 'Continuar'}
              </Button>
              <Link to="/login" className="text-sm text-center text-gray-600 hover:underline">
                Volver al inicio de sesión
              </Link>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleCambiarPassword}>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Escribe tu nueva contraseña para la cuenta: <strong className="text-primary">{email}</strong>
              </p>
              <div className="space-y-2">
                <Label htmlFor="nuevaPassword">Nueva contraseña</Label>
                <Input
                  id="nuevaPassword"
                  type="password"
                  required
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={cargando}>
                {cargando ? 'Actualizando...' : 'Guardar nueva contraseña'}
              </Button>
              <Link to="/login" className="text-sm text-center text-gray-600 hover:underline">
                Cancelar
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}