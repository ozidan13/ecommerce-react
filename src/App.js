import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut.jsx'
import Categories from './components/Categories/Categories.jsx';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';
import Products from './components/Products/Products.jsx';
import Brands from './components/Brands/Brands.jsx';
import Carts from './components/Carts/Carts.jsx';
import Home from './components/Home/Home.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import { tokenContext, TokenCountextProvider } from './context/token.js';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.js';
import ProtectedRoutesReverse from './components/ProtectedRoutesReverse/ProtectedRoutesReverse.jsx';
import FeatureProducts from './components/FeatureProducts/FeatureProducts.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import CheckOut from './components/CheckOut/CheckOut.jsx';
import AllOrders from './components/AllOrders/AllOrders.jsx';

function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <LayOut />, children: [
        { index: true, element: <Home /> },
        { path: "register", element: <ProtectedRoutesReverse><Register /></ProtectedRoutesReverse> },
        { path: "home", element: <Home /> },
        { path: "fe-ecommerce-react", element: <Home /> },
        { path: "signin", element: <ProtectedRoutesReverse><Signin /></ProtectedRoutesReverse> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /> </ProtectedRoutes> },
        { path: "Products", element: <FeatureProducts /> },
        { path: "details/:id", element: <ProductDetails /> },
        { path: "carts", element: <ProtectedRoutes><Carts /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  let { setToken } = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))
    }
  }, [])
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
