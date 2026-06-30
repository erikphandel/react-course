import { Routes, Route } from 'react-router';
import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';

// Lazy loading dos componentes (só carrega quando a rota for acessada)
const HomePage = lazy(() => import('./pages/home/HomePage.jsx'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage.jsx'));
const OrdersPage = lazy(() => import('./pages/orders/OrdersPage.jsx'));
const TrackingPage = lazy(() => import('./pages/tracking/TrackingPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/utils/NotFoundPage.jsx'));

window.axios = axios;

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route 
        index 
        element={
          <Suspense fallback={<div className="loading">Carregando página inicial...</div>}>
            <HomePage cart={cart} loadCart={loadCart} />
          </Suspense>
        } 
      />

      <Route 
        path="checkout" 
        element={
          <Suspense fallback={<div className="loading">Carregando checkout...</div>}>
            <CheckoutPage cart={cart} loadCart={loadCart} />
          </Suspense>
        } 
      />

      <Route 
        path="orders" 
        element={
          <Suspense fallback={<div className="loading">Carregando pedidos...</div>}>
            <OrdersPage cart={cart} loadCart={loadCart} />
          </Suspense>
        } 
      />

      <Route 
        path="tracking/:orderId/:productId" 
        element={
          <Suspense fallback={<div className="loading">Carregando rastreamento...</div>}>
            <TrackingPage cart={cart} />
          </Suspense>
        } 
      />

      <Route 
        path="*" 
        element={
          <Suspense fallback={<div className="loading">Carregando...</div>}>
            <NotFoundPage cart={cart} />
          </Suspense>
        } 
      />
    </Routes>
  );
}

export default App;