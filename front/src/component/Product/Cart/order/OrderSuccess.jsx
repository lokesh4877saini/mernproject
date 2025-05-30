import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import MetaData from '../../../layout/MetaData';
import "./order.scss";
const OrderSuccess = () => {
  return (
    <section className="Order">
        <MetaData title={"Orders Details"} />
        <div className="heading">
          <CheckCircleOutlineIcon />
          <h2>Your Order has been Placed Successfully </h2>
          <Link to='/orders/me'>View Orders </Link>
        </div>
      </section>
  )
}

export default OrderSuccess;