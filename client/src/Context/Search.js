
import { useState, useContext, createContext,  } from "react";

const SearchContext = createContext();



const SearchProvider = ({children}) =>{
    const [Search , setSearch] = useState({    
    
    query: '',
    results: []
});






return <SearchContext.Provider value={[Search,setSearch]} >
    {children}
 </SearchContext.Provider>

}


// Custom Hook 

const useSearch = () => useContext(SearchContext);

export {useSearch, SearchProvider} 