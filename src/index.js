import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './index.css';
import App from './App';
import TokenCountextProvider from './context/token';
import { CartContextProvider } from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let query = new QueryClient()
root.render(
  <React.StrictMode>
    <CartContextProvider>
      <QueryClientProvider client={query}> 
          <TokenCountextProvider>
            <App />
          </TokenCountextProvider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider >
    </CartContextProvider>
  </React.StrictMode>
);


