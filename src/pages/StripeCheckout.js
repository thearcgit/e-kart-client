import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/orders/orderSlice";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OkNQqSCHySiVdAAQ1irzrVjXFGuX3sdNiR4g4yMVnH8J4LxCIDxsZun33yGiCdFx4bkAIyj8IOKt0Sd5EVUCBdN00vp9CGJVR");

export default function StripeCheckout() {
  const currentOrder = useSelector(selectCurrentOrder)
  const [clientSecret, setClientSecret] = useState("");
  const createPaymentIntent =  async () => {
    const res = await axios.post('/create-payment-intent',{
      totalAmount:currentOrder?.totalAmount,
      metadata:{
        order:currentOrder.id
      }
    },
    {heders:{"Contentn-Type":"application/json"}}
  )
  setClientSecret(res.data.clientSecret)
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // fetch("http://localhost/8080/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({totalAmount:currentOrder?.totalAmount}),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
    createPaymentIntent()
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}