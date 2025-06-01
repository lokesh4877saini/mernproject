import React from 'react'
import { Link } from 'react-router-dom';
import {DeleteOutline} from '@mui/icons-material';
import defaultimg from '../../../assets/default.jpg';
import './CartItemCard.scss';
const CartItemCard = ({ item ,deleteCartItems}) => {
  return (
    <>
      <div className="cartItemCard">
        <div className="img">
          <img 
          src={defaultimg}
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