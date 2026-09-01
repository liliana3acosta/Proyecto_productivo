import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, getToken, setToken, clearToken } from '../lib/api';
import { Usuario } from '../types';

interface DatosRegistro {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  esAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  registrar: (datos: DatosRegistro) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargarPerfil = async () => {
    const token = getToken();

    if (!token) {
      setUsuario(null);
      setCargando(false);
      return;
    }

    try {
      const perfil = await api.get<Usuario>('/auth/profile');
      setUsuario(perfil);
    } catch {
      // Token vencido o inválido: lo limpiamos para forzar un nuevo login
      clearToken();
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const respuesta = await api.post<{ token: string; usuario: Usuario }>('/auth/login', {
      email,
      password,
    });

    setToken(respuesta.token);
    setUsuario(respuesta.usuario);
  };

  const registrar = async (datos: DatosRegistro) => {
    await api.post('/auth/register', datos);
    // El backend no devuelve token en el registro, así que iniciamos sesión justo después
    await login(datos.email, datos.password);
  };

  const logout = () => {
    clearToken();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: !!usuario,
        esAdmin: usuario?.rol === 'admin',
        login,
        registrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
