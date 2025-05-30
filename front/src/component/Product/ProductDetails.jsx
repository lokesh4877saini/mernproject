import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import './productDetails.scss';
import { useSelector, useDispatch } from 'react-redux'
import { ClearErros, getProductDetails, newReview } from '../../store/actions/productActions';
import ReviewCard from './ReviewCard';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import DialogTitle from '@mui/material/DialogTitle';
import { addItemsToCart } from '../../store/actions/cartActions'
import { NEW_REVIEW_REST } from '../../store/constants/productConstants';
const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);
    const {success} = useSelector(state=>state.newReview);
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1)
    const [hover, setHover] = React.useState(-1);
    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty)
    }
    const descreaseQuantity = () => {
        const qty = quantity - 1;
        if (quantity > 1) {
            setQuantity(qty)
        }
    }
    const handleAddToCart = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added to Cart")
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearErros());
        }
        if(success){
            alert.success("Review Sumbit Successfully")
            dispatch({type:NEW_REVIEW_REST})
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error,alert,success])

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(2);
    const [comment, setComment] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleReviewSubmit = () => {
        const reviewData = {
            rating: value,
            comment: comment,
            productId: id
        };
        dispatch(newReview(reviewData));
        handleClose();
    }
    return (
        <Fragment>
            {
                loading ? (<Loader />)
                    :
                    (<>
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
                                    <Rating name="rating" precision={0.5} value={product.ratings} size="large"
                                   className='rating' icon={<StarIcon style={{ color: 'tomato', fontSize: '1.4rem' }} />}
                                    readOnly emptyIcon={<StarIcon style={{ opacity: 0.55,color: 'grey' ,fontSize:"1.4rem"}} fontSize="inherit" />}  />
                                    <span>{product.numOfReviews} Reviews</span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={descreaseQuantity}>-</button>
                                            <input type="number" readOnly value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button onClick={handleAddToCart}>Add to Cart</button>
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
                                <button className='submitReview' onClick={handleClickOpen}> Submit Review</button>
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
                                        <Dialog
                                            open={open}
                                            style={{
                                                textAlign: "center"
                                            }}
                                        >
                                            <DialogTitle>Submit Review</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    To subscribe to this product, please enter your message here.
                                                </DialogContentText><br />
                                                <Rating
                                                    name="rating"
                                                    value={value}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover(newHover);
                                                    }}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                />
                                                <TextField
                                                    autoFocus
                                                    required
                                                    margin="dense"
                                                    id="name"
                                                    onChange={(e) => { setComment(e.target.value) }}
                                                    name="comment"
                                                    label="Message"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                <Button type="submit" onClick={handleReviewSubmit} variant="contained" color="primary">Submit</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                ) : (
                                    <p className="noReviews">No Reviews Yet</p>
                                )
                            }
                        </div>
                    </>)
            }
        </Fragment >
    )
}

export default ProductDetails;