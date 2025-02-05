'use client';

import ShopCard from '../_components/ShopCard';
import { useEffect, useState } from 'react';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once

  if (loading) {
    return <div className="text-center my-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="lg:w-[1200px] min-h-screen mx-auto">
      <h1 className="text-3xl text-center my-4">Shop from my store</h1>
      {/* <GoogleAdsense /> */}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4  ">
        {items.map((item, index) => (
          <ShopCard key={index} item={item}></ShopCard>
        ))}
      </div>
    </div>
  );
};

export default Shop;
