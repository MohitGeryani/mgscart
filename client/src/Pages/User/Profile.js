import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import styles from './user.module.css';


const Profile = () => {

  // context 
  const [ auth, setAuth ] = useAuth();

// states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");




// Get user Profile data 

useEffect(() => {
 const {email, name , phone, address}= auth.user;
 setName(name)  
 setPhone(phone)  
 setEmail(email)  
 setAddress(address)  
}, [auth?.user])





  // handle Sunmit

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/profile`, {name,email,password,phone,address});
      if(data?.success) { // we have a data object in response 
        
        setAuth({...auth, user: data?.updatedUser})

        let local_storage = localStorage.getItem("auth");
        local_storage = JSON.parse(local_storage);
          local_storage.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(local_storage));

        toast.success("Profile Updated Successfully");

      

      } else {
        toast.error(data.message);
      } 
    }catch(error) {
      console.log(error);
      toast.error('Something Went Wrong!');
    }
}


  return (
    <Layout title={'Your Profile'}>

    <div className="container-fluid   p-3">
   
        <div className="row">
        
            <div className="col-md-3"><UserMenu /></div>
            
            <div className="col-md-9">

            <div className="register" id={styles.profileBody}>
              
             
                <div  id={styles.register}>
                <h2>Your Profile</h2>
                
                <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              disabled
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              
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
              
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          

          <button type="submit" className="btn btn-primary" id={styles.subBtn}>
          UPDATE
          </button>
        </form>
        </div>
        </div>
            </div>
        </div>
    </div>


    </Layout>
  )
}

export default Profile