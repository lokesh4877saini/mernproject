import React from 'react'
import { Link } from 'react-router-dom';
import './CartItemCard.scss';
const CartItemCard = ({ item }) => {
  return (
    <div className="cartItemCard">
      <div className="img">
      <img src={item.image} alt="ad" />
      </div>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <button>Remove</button>
      </div>
    </div>
  )
}

export default CartItemCard;