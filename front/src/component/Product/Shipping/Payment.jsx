import React, {useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { createOrder,ClearErros } from '../../../store/actions/orderActions'
import { useAlert } from 'react-alert';
import './payment.scss';
import { CreditCardOutlined, VpnKeyOutlined, EventAvailable } from '@mui/icons-material';
import MetaData from '../../layout/MetaData';
import CheckoutSteps from '../Cart/CheckoutSteps';
import axios from 'axios';

const Payment = () => {
  const preUrl = import.meta.env.VITE_SERVER_URL;
  const alert = useAlert();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const {error} = useSelector((state)=>state.order);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const order = {
    shippingInfo,
    orderItems: cartItems,
    user:user._id,
    itemsPrice: orderInfo.Subtotal,
    taxPrice:orderInfo.GST,
    shippingPrice:orderInfo.ShippingCharges,
    totalPrice:orderInfo.totalPrice,
  }
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  
  const paymentHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${preUrl}/api/v1/payment/process`, paymentData, config);

      const clientSecret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order));
          navigate('/order/success');
        } else {
          alert.error('There was an issue with the payment.');
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(ClearErros());
    }
  },[dispatch,alert,error])
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '18px',
        textAlign: 'center',
        color: '#333',
        fontFamily: "'Segoe UI', sans-serif",
        '::placeholder': {
          color: '#999',
        },
      },
      invalid: {
        color: '#e53e3e',
      },
    },
  };

  return (
    <>
      <section className="payment">
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="heading">
          <h2>Payment Details</h2>
        </div>
        <div className="paymentContainer">
          <form onSubmit={paymentHandler}>
            <div>
              <CreditCardOutlined />
              <CardNumberElement options={cardElementOptions} />
            </div>
            <div>
              <EventAvailable />
              <CardExpiryElement options={cardElementOptions} />
            </div>
            <div>
              <VpnKeyOutlined />
              <CardCvcElement options={cardElementOptions} />
            </div>
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentSubBtn"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;
