import React, { useEffect, useState } from 'react'
import './Products.scss';
import {useSelector,useDispatch} from 'react-redux'
import { ClearErros,getProduct } from '../../store/actions/productActions';
import Loader from '../layout/loader/Loader';
import {useParams} from 'react-router-dom'
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination'
const Products = () => {
  const {keyword} = useParams();
  const dispatch  = useDispatch();
  const [currentPage,setCurrentPage] = useState(1);
  const {product:products,loading,error,productsCount,resultPerPage} = useSelector(state=>state.products)
  const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
  }
  useEffect(() => {
    if(error){
      alert.error(error)
      useDispatch(ClearErros())
    }
    dispatch(getProduct(keyword,currentPage));
  }, [dispatch,keyword,currentPage])
  return (
    <>
    {
      loading?(<Loader/>)
      :
      (
      <> 
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products && products.map((product,index)=>(
          <ProductCard key={index} product={product} />
        ))}
      </div>
     {
      resultPerPage < productsCount &&  <div className="paginationBox">
      <Pagination
      activePage = {currentPage}
      itemCountPerPage = {resultPerPage}
      totalItemsCount = {productsCount}
      onChange = {setCurrentPageNo}
      firstPageText = "1st"
      nextPageText = "Next"
      prevPageText = "Prev"
      lastPageText = "Last"
      itemClass = "page-item"
      linkClass = "page-link"
      activeClass = "pageItemActive"
      activeLinkClass = "pageLinkActive" 
      ></Pagination>
    </div>
     }
      </>
      )
    }
    </>
  )
}

export default Products;