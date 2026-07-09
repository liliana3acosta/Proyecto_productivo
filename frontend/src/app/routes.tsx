import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/shop',
    element: (
      <Layout>
        <Header />
        <Shop />
        <Footer />
      </Layout>
    ),
  },
  {
    path: '/cart',
    element: (
      <Layout>
        <Header />
        <Cart />
        <Footer />
      </Layout>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Layout>
        <Header />
        <Checkout />
        <Footer />
      </Layout>
    ),
  },
]);
