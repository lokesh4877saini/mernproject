import React from 'react'
import { Link } from 'react-router-dom';
import {DeleteOutline} from '@mui/icons-material';
import './CartItemCard.scss';
const CartItemCard = ({ item ,deleteCartItems}) => {
  return (
    <>
      <div className="cartItemCard">
        <div className="img">
          <img 
          src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/11/goku-dragon-ball.jpg?q=70&fit=crop&w=1140&h=&dpr=1"
          // src={item.image}
           alt="ad" />
        </div>
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`Price: ₹${item.price}`}</span>
          <button onClick={()=>{deleteCartItems(item.product)}}><DeleteOutline /></button>
        </div>
      </div>
    </>

  )
}

export default CartItemCard;