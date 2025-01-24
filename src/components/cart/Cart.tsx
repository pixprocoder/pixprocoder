import React from 'react';
import Link from 'next/link';

function Cart() {
  return (
    <div>
      <h1>Cart</h1>
      <p>This is a new cart</p>
      <p>Hello world</p>
      <Link href="/">Go to cart</Link>
    </div>
  );
}

export default Cart;
