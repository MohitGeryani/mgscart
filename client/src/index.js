import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from  'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/auth';
import { SearchProvider } from './Context/Search';
import ScrollToTop from './Hooks/ScrollToTop';
import { CartProvider } from './Context/cart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <AuthProvider>
    <CartProvider>
    <SearchProvider>
  <Router>
<ScrollToTop>
    <App />
    </ScrollToTop>

    <Toaster />
  
  </Router>
  </SearchProvider>
  </CartProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
