import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import styles from './auth.module.css';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer,setAnswer] = useState("");


  const Navigate = useNavigate();
  
const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/forgot-password`, {email,newPassword,answer});
      if(res.data.success) { // we have a data object in response 
        
        toast.success(res.data.message);
      

        Navigate('/login');

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
   <Layout title={'Forgot Password'}>
<div className="register" id={styles.authBody}>
        <h1 id={styles.title}>Reset Password</h1>
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
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Book that deeply influenced you?"
              required
            />
         
          </div>

          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setnewPassword  (e.target.value)}
              value={newPassword}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary" id={styles.subBtn}>
            Reset
          </button>
       
        
        </form>
        </div>
        </div>
   </Layout>
  )
}

export default ForgotPassword