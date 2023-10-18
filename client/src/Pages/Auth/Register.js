import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './auth.module.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const Navigate = useNavigate();

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, {name,email,password,phone,address,answer});
      if(res.data.success) { // we have a data object in response 
        
        toast.success(res.data.message);
        Navigate('/login');

      } else {
        toast.error(res.data.message);
      } 
    }catch(error) {
      console.log(error);
      toast.error('Something Went Wrong!');
    }
}


  return (
    <Layout title={"Register Page"}>
      <div className="register" id={styles.authBody}>
        <h1 id={styles.title}>Register Your Account</h1>
        <div  id={styles.register}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Enter Your Phone Number"
              required
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <input
              type="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Enter Your Address"
              required
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <input
              type="address"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Book that deeply influenced you?"
              required
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>

          <button type="submit" className="btn btn-primary" id={styles.subBtn}>
          REGISTER
          </button>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
