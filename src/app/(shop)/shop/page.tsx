'use client';

import ShopCard from '../_components/ShopCard';
import { useState } from 'react';

const Shop = () => {
  const [items, setItems] = useState([]);
  fetch('https://fakestoreapi.com/products/category/jewelery')
    .then((res) => res.json())
    .then((data) => setItems(data));

  return (
    <div className="lg:w-[1200px] min-h-screen mx-auto">
      <h1 className="text-3xl text-center my-4">Shop from my store</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4 ">
        {items.map((item, index) => (
          <ShopCard key={item.id} item={item}></ShopCard>
        ))}
      </div>
    </div>
  );
};

export default Shop;
