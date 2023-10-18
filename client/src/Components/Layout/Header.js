import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../Context/auth'
import { Toast, toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'

import useCategory from '../../Hooks/useCategory'
import { useCart } from '../../Context/cart'
import {Badge} from 'antd'





const Header = () => {

  

  // useEffect(()=> {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'instant'
  //   })
  // }, [])

  const [auth,setAuth] = useAuth();
  const categories  = useCategory();
  const [cart] = useCart(); 
  
  
  useEffect(() => {
    // Log cart changes for debugging
    console.log("Cart updated:", cart);
  }, [cart]);
  
  const handleLogout = () => {
    setAuth({
      ...auth, // we are spreading again and again coz it may have more imp info than user and token so we should have a copy of that info
      user: null,
      token: ''

    })
    localStorage.removeItem('auth');
  toast.success("Logout Successfully!")
  }

  return (

   <nav className="navbar navbar-expand-lg bg-body-tertiary" id='navBar'>
        <div className="container-fluid">
        <Link to="/" className="navbar-brand"  id='logo'>
              🛒 <h4 style={{fontFamily: "'Montserrat', sans-serif", fontSize: '20px'}}>MG's CART</h4>
            </Link>
           
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
        
          <SearchInput/>
         
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link  ">
                  Home
                </NavLink>
              </li>
             
             {
              !auth.user ? ( <>
                <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              </>) : (
              <> <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {auth?.user.name}
  </NavLink>
  <ul className="dropdown-menu drop">
    <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===1? 'admin' :'user'}`}>Dashboard</NavLink></li>
    <li>
                <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                  Logout
                </NavLink>
              </li>
  
  </ul>
</li>

                
               
              </>)
              }
            <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown" >
    Categories
  </Link>
  
    <ul className="dropdown-menu" >
    
  {categories?.map((c)=> (
    <li key={c._id}> <Link  to ={`/category/${c.slug}`} className="dropdown-item" href="#">{c.name}</Link></li>
   
  ))}
  <li><Link  to ={`/all-categories`} className="dropdown-item" href="#">More</Link></li>
   
  </ul>
 
</li>

              <li className="nav-item" >
               <Badge count= {cart?.length} showZero style={{marginTop: '4px'}}   >
               <NavLink to="/cart" className="nav-link" style={{marginTop: '4px' ,fontSize: '16px'}}>
                  Cart 
                </NavLink>
               </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>

  )
}

export default Header