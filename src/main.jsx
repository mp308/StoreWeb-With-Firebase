import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Example from './components/Error';
import AddProducts from './components/AddProducts';
import ProductsContextProvider from './global/ProductsContext';
import Register from './components/Register';
import Login from './components/Login';
import { UserAuthContextProvider } from './global/UserAuthContext';
import { CartContextProvider } from './global/CartContext'
import { Cart } from './components/Cart';
import { Cashout } from './components/Cashout';

// Create a custom component to wrap the RouterProvider and pass the user prop to Home


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Pass user to Home
    errorElement: <Example />,
  },
  {
    path: '/AddProducts',
    element: <AddProducts />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Cartproducts',
    element: <Cart/>,
  },
  {
    path: '/Cashout',
    element: <Cashout/>,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <ProductsContextProvider>
    <CartContextProvider>
      <UserAuthContextProvider>
        <RouterProvider router={router} />
      </UserAuthContextProvider>
    </CartContextProvider>
  </ProductsContextProvider>
);
