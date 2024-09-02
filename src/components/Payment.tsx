import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
// @ts-ignore
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/src/components/CheckoutForm";

// todo: add pk
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);
const Payment = () => {
    return (
        <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
        </div>
    );
};

export default Payment;