import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate , useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './auth.module.css';
import { useAuth } from "../../Context/auth";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth]  = useAuth();

  const Navigate = useNavigate();
  const location = useLocation();

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, {email,password});
      if(res.data.success) { // we have a data object in response 
        
        toast.success(res.data.message);
        setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data));

        Navigate(location.state || '/home');

      } 
      else  {
        toast.error(res.data.message);
      } 
    } catch(error) {
      console.log(error);
      toast.error('Something Went Wrong!');
    }
}
  return (
   <Layout>
      <div className="register" id={styles.authBody}>
        <h1 id={styles.title}>Login Form</h1>
        <div  id={styles.login}>
        <form onSubmit={handleSubmit}>
        
          
          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setPassword  (e.target.value)}
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary" id={styles.subBtn}>
            LOGIN
          </button>
        <div className="mt-2 forgotPass">
        <div  id={styles.forgotPass}>
           <Link   style={{cursor:'pointer', textDecoration:'none', color: 'black', fontFamily: "'Montserrat', sans-serif", fontSize: '15px'}} to={'/forgot-password'}><p>Forgot Password </p>    </Link>
         </div>
        </div>
        </form>
        </div>
      </div>
   </Layout>
  )
}

export default Login