import React, { useEffect, useState } from 'react'
import './Products.scss';
import { useSelector, useDispatch } from 'react-redux'
import { ClearErros, getProduct } from '../../store/actions/productActions';
import Loader from '../layout/loader/Loader';
import { useParams } from 'react-router-dom'
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination'
import {useAlert} from "react-alert"
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";
import MetaData from '../layout/MetaData'
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const { keyword } = useParams();
  const alert = useAlert();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings,setRatings] = useState(0);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { product: products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(ClearErros());
    }
    dispatch(getProduct(keyword, currentPage, price,category,ratings));
  }, [dispatch, keyword, currentPage, price,category,ratings,alert,error])
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  }
  let count = filteredProductsCount;
  return (
    <>
      {
        loading ? (<Loader />)
          :
          (
            <>
            <MetaData title="Products" />
              <h2 className="productsHeading">Products</h2>
              <main>
                <div className="products">
                  {
                    products === undefined ? (<></>
                    ) : (
                      <>
                        {
                          Object.keys(products).length === 0 ? (
                            <h1>no products available contact to your admin for add some products </h1>
                          ) : (<>
                            {
                              products && products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                              ))}
                          </>)
                        }
                      </>
                    )
                  }
                </div>
                <aside>
                  <div className="filterBox">
                    <div className="priceBox">
                      <Typography> Price </Typography>
                      <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider' min={0} max={25000} > </Slider>
                    </div>
                    <div className="categoryBox">
                      <Typography> Categories</Typography>
                      <ul>
                        {
                          categories.map((category) => (
                            <li
                              className='category-link'
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                      <div className="ratings">
                        <fieldset>
                          <Typography component="legend">Ratings Above</Typography>
                           <Slider
                           value={ratings}
                           onChange={(e,newRatings)=>{setRatings(newRatings)}}
                          //  aria-labelledby ="continuous-slider"
                           size="small"
                           defaultValue={1}
                           aria-label="Small"
                           valueLabelDisplay="auto"
                           min={0}
                           max={5}
                           >
                         </Slider>

                        </fieldset>
                      </div>

                  </div>
                </aside>
              </main>
              {
                (count === 0) ? (<></>) : (
                  resultPerPage < count &&
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage} itemCountPerPage={resultPerPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} firstPageText="1st" nextPageText="Next" prevPageText="Prev" lastPageText="Last" itemClass="page-item" linkClass="page-link" activeClass="pageItemActive" activeLinkClass="pageLinkActive"  ></Pagination>
                  </div>
                )
              }
            </>
          )
      }
    </>
  )
}

export default Products;