
import './App.css';
import Layout from './Components/Layout/Layout';
import { Route,Routes } from 'react-router-dom';


import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import DashBoard from './Pages/User/DashBoard';
import PrivateRoute from './Components/Routes/PrivateRoute';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Orders from './Pages/User/Orders';
import Profile from './Pages/User/Profile';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import { useSearch } from './Context/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import AdminOrders from './Pages/Admin/AdminOrders';


function App() {




  return (


    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/product/:slug' element={ <ProductDetails/> } />
      <Route path='/home' element={ <Home/> } />
      <Route path='/all-categories' element={ <Categories/> } />
      <Route path='/cart' element={ <CartPage/> } />
      <Route path='/category/:slug' element={ <CategoryProduct/> } />
      <Route path='/register' element={ <Register/> } />

    <Route path={`/search`} element={<Search/>} />
    <Route path='/dashboard' element={<PrivateRoute/>} >

      <Route path='user' element={ <DashBoard/> } />
      <Route path='user/orders' element={ <Orders/> } />
      <Route path='user/profile' element={ <Profile/> } />
    </Route>

    <Route path='/dashboard' element={<AdminRoute/>} >
      <Route path='admin' element={<AdminDashboard/>} />
      <Route path='admin/create-category' element={<CreateCategory/>} />
      <Route path='admin/create-product' element={<CreateProduct/>} />
      <Route path='admin/product/:slug' element={<UpdateProduct/>} />
      <Route path='admin/products' element={<Products/>} />
      <Route path='admin/users' element={<Users/>} />
      <Route path='admin/orders' element={<AdminOrders/>} />
    </Route>

      
      <Route path='/login' element={ <Login/> } />
      <Route path='/forgot-password' element={ <ForgotPassword/> } />
      
      <Route path='/about' element={ <About/> } />
      <Route path='/contact' element={ <Contact/> } />
      <Route path='/policy' element={ <Policy/> } />
      <Route path='/*' element={ <PageNotFound/> } />

      
    </Routes>

    
  );
}

export default App;
