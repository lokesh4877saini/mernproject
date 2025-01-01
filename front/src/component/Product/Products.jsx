import React, { useEffect } from 'react'
import './Products.scss';
import {useSelector,useDispatch} from 'react-redux'
import { ClearErros,getProduct } from '../../store/actions/productActions';
import Loader from '../layout/loader/Loader';
// import {useAlert} from 'react-alert'
import ProductCard from '../Home/ProductCard';
const Products = () => {
  const dispatch  = useDispatch();
  // const alert  = useAlert();
  const {product:products,loading,error,productsCount} = useSelector(state=>state.products)
  useEffect(() => {
    if(error){
      alert.error(error)
      useDispatch(ClearErros())
    }
    dispatch(getProduct());
  }, [dispatch])
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
      </>
      )
    }
    </>
  )
}

export default Products;