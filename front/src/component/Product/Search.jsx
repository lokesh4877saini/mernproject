import React, { useState } from 'react'
import './search.scss';
const Search = ({history}) => {
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        }else{
            history.push('/products')
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