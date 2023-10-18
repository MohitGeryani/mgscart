import React, { useState } from 'react'
import { useSearch } from '../../Context/Search'
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';

const SearchInput = () => {

  const [query, setQuery] = useState("");

const [value, setValue] = useSearch();

const navigate= useNavigate();

const handleSubmit = async(e) => {
e.preventDefault();
    try{    

        
            navigate(`/search?q=${query}`)
    }
    catch(error) {
        console.log(error)
    }
}

  return (
   <form className="d-flex" role="search" onSubmit={handleSubmit}>
   <div className='search-box'>
   <input  value={query }   className="searchBar" type="search" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
  <button className="btn" type="submit"><BiSearch/></button>

   </div>
  </form>

  )
}

export default SearchInput