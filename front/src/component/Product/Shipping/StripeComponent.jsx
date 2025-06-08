import React,{useState,useEffect} from 'react';
import  {Elements}  from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Payment';
import axios from 'axios';

const StripeContainer = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const preUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    async function getStripeKey() {
      try {
        const response = await axios.get(`${preUrl}/api/v1/stripeapikey`, {
          withCredentials: true
        });
        const key = response.data.stripeApiKey; 
        if (key) {
          setStripePromise(loadStripe(key));
        } else {
          console.error("No stripeApiKey returned from backend.");
        }
      } catch (error) {
        console.error("Error fetching Stripe key:", error.response?.data || error.message);
      }
    }
    getStripeKey();
  }, [preUrl]);

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default StripeContainer;
