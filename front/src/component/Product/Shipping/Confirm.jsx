import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { saveConfirmInfo } from "../../../store/actions/cartActions";
// import PinDropIcon from '@mui/icons-material/PinDrop';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import PublicIcon from '@mui/icons-material/Public';
// import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useNavigate, Link } from 'react-router-dom'
// import { Country, State } from 'country-state-city';
// import { HomeOutlined } from '@mui/icons-material';
// import {useAlert} from 'react-alert'
import './confirm.scss';
import CheckoutSteps from '../Cart/CheckoutSteps';
const Confirm = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    //   const alert = useAlert();
    const history = useNavigate();
    //   const dispatch = useDispatch();
    const Subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const ShippingCharges = Subtotal >= 1000 ? 0 : 200;
    const GST = Subtotal * 0.18;
    const totalPrice = Subtotal + ShippingCharges + GST;
    const Address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
    return (
        <>
            <section className="confirm">
                <CheckoutSteps activeStep={1} />
                <div className="heading">
                    <h2>Confirm Details</h2>
                </div>
                <div id="div">
                    <div id='confirm1'>
                        <div className="confirmAread">
                            <div>
                                <label htmlFor="name">Name:</label>
                                <span id='name'>{user.name}</span>
                            </div>
                            <div>
                                <label htmlFor="phone">Phone No:</label>
                                <span id='phone'>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <label htmlFor="add">Address</label>
                                <span id='add'>{Address}</span>
                            </div>
                        </div>
                        <div className="confirmItemContainer">
                            <h2>Your Cart Items: </h2>
                            <div className="itemContainer">
                                {cartItems && cartItems.map((item, i) => (
                                    <div key={i}>
                                        <div className="img">
                                        <img
                                        //  src={item.image}
                                        src="https://i.pinimg.com/736x/fc/2f/d2/fc2fd2d1ce9f17004026e1f6ff67a977.jpg"
                                         alt={item.product} />
                                        </div>
                                        <div className="itemDetails">
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        <span>
                                            <p>{item.quantity} X ₹ {item.price}  = {" "}</p>
                                            <b>
                                                ₹{item.price * item.quantity}
                                            </b>
                                        </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="orderSummary">
                        <div>
                            <div>
                                <label htmlFor="Sub">Subtotal:</label>
                                <span id='Sub'>₹{Subtotal}</span>
                            </div>
                            <div>
                                <label htmlFor="car">Shipping Charges:</label>
                                <span id='Sub'>₹{ShippingCharges}</span>
                            </div>
                            <div>
                                <label htmlFor="gst">GST:</label>
                                <span id='gst'>₹{GST}</span>
                            </div>
                        </div>
                        <div>
                            <p className='total'>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div>
                            <button>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Confirm;