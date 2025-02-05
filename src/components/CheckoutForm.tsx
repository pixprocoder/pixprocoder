'use client';
import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/src/components/ui/button';
import axios from 'axios';
import { getBaseURL } from '@/src/utils';
import { useRouter } from 'next/navigation';
import { TransactionContext } from '@/src/providers/OtherProviders';
import { AuthContext } from '../providers/AuthProviders';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import { clearCart } from '../redux/features/cart/CartSlice';

const CheckoutForm = () => {
  const { totalPrice, items } = useAppSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const distatch = useAppDispatch();
  const { setTransactionId } = useContext(TransactionContext);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string>('');

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios({
      method: 'post',
      url: `${getBaseURL()}/payment/create-checkout-session`,
      data: {
        price: totalPrice,
      },
    })
      .then((response) => {
        if (response.data && response.data.data.clientSecret) {
          setClientSecret(response.data.data.clientSecret);
        } else {
          console.warn('Client secret is missing in the response.');
        }
      })
      .catch((error) => {
        alert(
          'An error occurred while creating the checkout session. Please try again.',
        );
      });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error('payment error', error);
      setPaymentError(error?.message!);
    } else {
      //   console.log(paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'gust',
            email: user?.email || 'unknown',
          },
        },
      });
    if (confirmError) {
      console.log('confirmError', confirmError);
      router.push('/payment/failed');
    } else {
      console.log('intent', paymentIntent);
      if (paymentIntent?.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        distatch(clearCart());
        router.push('/payment/success');

        // Send and save to db
        const payment = {
          email: user?.email,
          userId: user?.uid,
          totalPrice,
          items,
          date: new Date(),
          status: paymentIntent.status,
          transactionId: paymentIntent.id,
        };
        axios({
          method: 'post',
          url: `${getBaseURL()}/payment`,
          data: {
            payment: payment,
          },
        })
          .then((response) => {
            if (response.data) {
              console.log('payment success history data', response.data);
            } else {
              console.warn('Client secret is missing in the response.');
            }
          })
          .catch((error) => {
            alert(
              'An error occurred while creating the checkout session. Please try again.',
            );
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        disabled={!user?.uid}
        className="primary-btn w-full mt-4"
        type="submit"
      >
        Order and Pay
      </Button>
      {paymentError && <p className="text-red-500 text-xs">{paymentError}</p>}
    </form>
  );
};

export default CheckoutForm;
