import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();



const AuthProvider = ({children}) =>{
    const [auth , setAuth] = useState({    
        
        user: null,
        token: ''
    });
    
    
    
    // axios defaults 
    
    axios.defaults.headers.common['Authorization']  = auth?.token;   /// auth ? . token question mark basically checks if the data exists i.e token if yes then get it.
    
 

useEffect(()=> {
    const data = localStorage.getItem("auth");
    if(data) {
        const parseData = JSON.parse(data);
        setAuth({
            ...auth,
            user: parseData.user,
            token: parseData.token,
        })
    }


    //eslint-disable-next-line

}, []);



return <AuthContext.Provider value={[auth,setAuth]} >
    {children}
 </AuthContext.Provider>

}


// Custom Hook 

const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider} 