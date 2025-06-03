import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import defaultimage  from '../../assets/default.jpg'
import StarIcon from '@mui/icons-material/Star';
const ProductCard = ({ product }) => {

  return (
    <Link
      className='productCard' to={`/product/${product._id}`}
    >
      {/* <img src={product.image[0]?.url} alt={product.name} /> */}
      <img src={defaultimage} />
      <p>{product.name}</p>
      <div>
      <Rating name="rating" precision={0.5} value={product.ratings} size="large"
       className='rating' icon={<StarIcon style={{ color: 'tomato', fontSize: '1.4rem' }} />}
         readOnly emptyIcon={<StarIcon style={{ opacity: 0.55, color: 'grey', fontSize: "1.4rem" }} fontSize="inherit" />} />
         <span>{product.numOfReviews} Reviews</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;