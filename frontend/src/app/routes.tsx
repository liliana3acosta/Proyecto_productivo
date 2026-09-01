import { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Orders } from './pages/Orders';
import { Appointments } from './pages/Appointments';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

const PaginaConHeader = ({ children }: { children: ReactNode }) => (
  <Layout>
    <Header />
    {children}
    <Footer />
  </Layout>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/shop',
    element: <PaginaConHeader><Shop /></PaginaConHeader>,
  },
  {
    path: '/cart',
    element: <PaginaConHeader><Cart /></PaginaConHeader>,
  },
  {
    path: '/checkout',
    element: <PaginaConHeader><Checkout /></PaginaConHeader>,
  },
  {
    path: '/login',
    element: <PaginaConHeader><Login /></PaginaConHeader>,
  },
  {
    path: '/registro',
    element: <PaginaConHeader><Register /></PaginaConHeader>,
  },
  {
    path: '/pedidos',
    element: (
      <PaginaConHeader>
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      </PaginaConHeader>
    ),
  },
  {
    path: '/citas',
    element: (
      <PaginaConHeader>
        <ProtectedRoute>
          <Appointments />
        </ProtectedRoute>
      </PaginaConHeader>
    ),
  },
  {
    path: '/admin',
    element: (
      <PaginaConHeader>
        <ProtectedRoute soloAdmin>
          <AdminDashboard />
        </ProtectedRoute>
      </PaginaConHeader>
    ),
  },
]);
