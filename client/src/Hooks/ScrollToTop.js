import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop( {children}) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
        
         });
  }, [pathname]);

  return children ||  null;
}


export default ScrollToTop;