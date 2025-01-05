import React, { useState } from 'react'
import './search.scss';
import {useNavigate} from 'react-router-dom'
const Search = () => {
  const history = useNavigate();
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history(`/products/${keyword}`)
        }else{
            history('/products')
        }
    };
  return (
    <>
    <form onSubmit={searchSubmitHandler} className="searchBox">
        <input type="text" placeholder='Search a Product ...' onChange={(e)=>setKeyword(e.target.value)} />
         <input type="submit" value="Search" />
    </form>
    </>

  )
}

export default Search;