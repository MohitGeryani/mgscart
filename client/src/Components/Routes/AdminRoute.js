import { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();


    useEffect(()=> {    
        const authCheck = async() => {
            const res  = await axios.get(`${process.env.REACT_APP_API}/admin-auth`);
                if(res.data.ok) {
                    setOk(true);

                } else {
                   setOk(false);
                }

                }

                if(auth?.token) {
                    authCheck();

                } 


                


    },[auth])


    return ok ? <Outlet/> : <Spinner path=""/>;


}