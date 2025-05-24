import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import './confirm.scss';
import CheckoutSteps from '../Cart/CheckoutSteps';
const Confirm = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const history = useNavigate();
    const Subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const ShippingCharges = Subtotal >= 1000 ? 0 : 200;
    const GST = Subtotal * 0.18;
    const totalPrice = Subtotal + ShippingCharges + GST;
    const Address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
    const proceedToPayment= () =>{
        const data = {Subtotal,ShippingCharges,GST,totalPrice};
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        if(data){
            history("/order/payment")
        }
    }
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
                                         src={item.image}
                                         alt={item.product} />
                                        </div>
                                        <div className="itemDetails">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                            <button onClick={proceedToPayment}>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Confirm;