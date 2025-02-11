import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import ReactStars from 'react-rating-stars-component'
import './productDetails.scss';
import { useSelector, useDispatch } from 'react-redux'
import { ClearErros, getProductDetails } from '../../store/actions/productActions';
import ReviewCard from './ReviewCard';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData'
import {useAlert} from 'react-alert'
const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails)
    const alert = useAlert();
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(ClearErros()); 
        }
        dispatch(getProductDetails(id));
    }, [dispatch])
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        inHalf: true,
    }

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (<>
                <MetaData title={`${product.name}`} />
                    <div className="ProductDetails">
                        <div>
                            <div className="img-div">
                                <Carousel>
                                    {product.image && product.image.map((item, i) => (
                                        <img className='CarouselImage'
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product id: <span>#  {product._id}</span></p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span>{product.numOfReviews} Reviews</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button>-</button>
                                        <input type="number" value={1} />
                                        <button>+</button>
                                    </div>
                                    <button>Add to Cart</button>
                                </div>
                                <p>Status: <b
                                    className={product.stock < 1 ? "redColor" : "greenColor"}
                                >
                                    {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                                </b></p>
                            </div>
                            <div className="detailsBlock-4">
                                Desription: <p>{product.description}</p>
                            </div>
                            <button className='submitReview'> Submit Review</button>
                        </div>
                    </div>

                    <div className="review-section">
                        <h3 className="reviewsHeading">Reviews</h3>
                        {
                            product.reviews && product.reviews[0] ? (
                                <div className="reviews">
                                    {
                                        product.reviews && product.reviews.map((review, index) => <ReviewCard review={review} key={index} />)
                                    }
                                </div>
                            ) : (
                                <p className="noReviews">No Reviews Yet</p>
                            )
                        }
                    </div></>)
            }
        </Fragment>
    )
}

export default ProductDetails;