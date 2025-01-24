'use client';

import GoogleAdsense from '../../../components/GoogleAdSense.tsx';
import ShopCard from '../_components/ShopCard';
import { useState } from 'react';

const Shop = () => {
  const [items, setItems] = useState([]);
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => setItems(data));

  return (
    <div className="lg:w-[1200px] min-h-screen mx-auto">
      <h1 className="text-3xl text-center my-4">Shop from my store</h1>
      <GoogleAdsense />
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4  ">
        {items.map((item, index) => (
          <ShopCard key={index} item={item}></ShopCard>
        ))}
      </div>
    </div>
  );
};

export default Shop;
