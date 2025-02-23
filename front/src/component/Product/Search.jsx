import React, { useState } from 'react'
import './search.scss';
import {useNavigate} from 'react-router-dom'
import MetaData from '../layout/MetaData'
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
    <MetaData title={`Search a product`} />
    <form onSubmit={searchSubmitHandler} className="searchBox">
        <input type="text" placeholder='Search a Product ...' onChange={(e)=>setKeyword(e.target.value)} required />
         <input type="submit" value="Search" />
    </form>
    </>

  )
}

export default Search;