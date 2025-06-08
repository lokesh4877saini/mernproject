import React, { Fragment, useEffect } from 'react'
import './Home.scss';
import Product from './ProductCard'
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux'
import { ClearErros, getProduct } from '../../store/actions/productActions'
import Loader from '../layout/loader/Loader';
import { toast } from 'react-hot-toast';
const Home = () => {
  const dispatch = useDispatch();
  const { loading, product,error} = useSelector(state => state.products)
  useEffect(() => {
    if(error){
       toast.error(error)
      dispatch(ClearErros); 
    }
    dispatch(getProduct());
  }, [dispatch,error])
  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : 
      (<>
        <MetaData title={"Home Page is working"} />
        <div className="banner">
          <p>Welcome to Ecomm</p>
          <h1>Find Amazing Products Below</h1>
          <a href="#container">
            <button>Scroll <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FBFD"><path d="M480-80q-116 0-198-82t-82-198v-240q0-116 82-198t198-82q116 0 198 82t82 198v240q0 116-82 198T480-80Zm40-520h160q0-72-45.5-127T520-796v196Zm-240 0h160v-196q-69 14-114.5 69T280-600Zm200 440q83 0 141.5-58.5T680-360v-160H280v160q0 83 58.5 141.5T480-160Zm0-360Zm40-80Zm-80 0Zm40 80Z" /></svg></button>
          </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
          {
            product && product.map((product,i) => (
              <Product product={product} key={i} />
            ))
          }
        </div>
      </>)}
    </Fragment>
  )
}

export default Home