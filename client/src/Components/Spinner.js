import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Spinner = ({path = "login" }) => {

    const [count, setCount]  = useState(3);
    const navigate= useNavigate();
    const location = useLocation();

    useEffect(()=> {
        const interval = setInterval(()=>{
            setCount((prevValue) => --prevValue)
        },1000)
        if(count === 0 ) navigate(`/${path}`,{
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count,navigate, location, path])

  return (
    <div style={{justifyContent: 'center', flexDirection: 'column', display:'flex',height:'100vh', alignItems: 'center'}}>
   
   <h2>Redirecting you in {count}</h2>


<span className="loader" ></span>

    </div>

  )
}

export default Spinner