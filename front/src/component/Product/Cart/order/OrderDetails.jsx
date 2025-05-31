import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { orderDetail } from '../../../../store/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
import Loader from '../../../layout/loader/Loader';
import MetaData from '../../../../component/layout/MetaData';
import './orderDetails.scss';
const OrderDetails = () => {
    const { order, loading, error } = useSelector((state) => state.orderdetails);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderDetail(id));
    }, [dispatch, id]);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ClearErros());
        }
    }, [toast, error, id])
    if (loading) return <Loader />;
    if (error) return <p className="error">Error: {error}</p>;
    if (!order || !order.user || !order.shippingInfo || !order.paymentInfo || !order.orderItems) {
        return <p>Loading order details...</p>; // fallback UI while data is being fetched
    }
    return (
        <>
            {
                loading ? (<><Loader /></>) : (<>
                    <section className="orderDetail">
                        <MetaData title={`My Order Details`} />
                        <div className="heading">
                            <h2>Order Details</h2>
                        </div>
                        <div className="orderContainer">
                            <h3>Order Id # <span>{order._id}</span></h3>
                            <div className="orderContainerBody">
                                <div>
                                    <h5>Shipping Info</h5>
                                    <div>
                                        <p><span>Name:</span> {order && order.user.name}</p>
                                        <p><span>Email:</span> {order && order.user.email}</p>
                                    </div>
                                    <div>
                                        <p><span>Moble No.:</span> {order && order.shippingInfo.phoneNo}</p>
                                    </div>
                                    <p><span>Address:</span> {`${order && order.shippingInfo.address}, ${order && order.shippingInfo.city}, ${order && order.shippingInfo.state}, ${order && order.shippingInfo.pinCode}, ${order && order.shippingInfo.country}`}</p>
                                </div>
                                <div>
                                    <h5>Payment Info</h5>
                                    <div>
                                        <p><span>Status:</span> {order && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"}</p>
                                        <p><span>Order Status: </span>{`${order && order.orderStatus}`}</p>
                                    </div>
                                    <p>{order && order.paymentInfo.status === "succeeded" ? (<>{`Amount: ${order && order.totalPrice}`}</>) : (<></>)}</p>
                                </div>
                                <div>
                                    <h5>Order Items</h5>
                                    {
                                        order && order.orderItems.map((item, i) => (
                                            <div key={item._id} className="special">
                                                <div>
                                                    <div className="img">
                                                        <img src={item.image.public_id} />
                                                    </div>
                                                    <p>{item.name}</p>

                                                </div>
                                                <div>
                                                    <p>{`${item.quantity} X ${item.price} = ${item.quantity * item.price}`}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </>)
            }
        </>
    )
}

export default OrderDetails;
