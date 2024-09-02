"use client"
import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button} from "@/src/components/ui/button";
import axios from "axios";
import {getBaseURL} from "@/src/utils";
import {useRouter} from "next/navigation";

const CheckoutForm = () => {

    const [clientSecret,  setClientSecret] = useState<string>("");
    const [transactionId, setTransactionId] = useState<string>("");

    const router =useRouter()
    const stripe = useStripe();
    const elements = useElements();
    const price = 100.90

    useEffect(() => {
        axios({
            method: 'post',
            url: `${getBaseURL()}/payment/create-checkout-session`,
            data: {
                price: price, // Send the price as part of the request body
            }
        })
            .then((response) => {

                // Set clientSecret if it is available in the response
                if (response.data && response.data.data.clientSecret) {
                    setClientSecret(response.data.data.clientSecret);
                } else {
                    console.warn('Client secret is missing in the response.');
                }
            })
            .catch((error) => {
                // Log and handle errors
                console.error('Error:', error);
                alert('An error occurred while creating the checkout session. Please try again.');
            });
    }, []);


    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

      const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: "card",
          card
      })

        if (error) {
            console.error("payment error",error)
        }else { console.log(paymentMethod)}

      // confirm card payment
        console.log(clientSecret)
      const   {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
              card: card,
              billing_details:{
                  name: "kobir"
              }
          }
      })
        if(confirmError){
            console.log("confirmError", confirmError)
        }   else {
            if(paymentIntent?.status === "succeeded"){
                setTransactionId(paymentIntent.id)
                router.push("/payment/success")
            }
        }

    };

    return (

            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <Button disabled={!clientSecret}  className="btn btn-sm mt-4" type="submit" >
                    Pay
                </Button>
            </form>

    );
};

export default CheckoutForm;