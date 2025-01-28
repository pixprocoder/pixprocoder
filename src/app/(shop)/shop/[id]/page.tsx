'use client';
import React, { use, useEffect, useState } from 'react';
import ShopDetailsPage from '../../_components/ShopDetails';

function page({ params }) {
  const { id } = use(params);
  const [item, setItem] = useState([]);
  // console.log(item);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  return (
    <section className="container mx-auto min-h-screen my-2">
      {/* <h1 className="text-center my-2">Shop single page</h1> */}
      <ShopDetailsPage item={item} />
    </section>
  );
}

export default page;
