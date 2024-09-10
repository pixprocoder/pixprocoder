"use client";

import ShopCard from "../_components/ShopCard";

const Shop = () => {
  const items = [
    { id: 1, image: "/vertical-logo.png", price: 20, name: "laptop" },
    { id: 2, image: "/vertical-logo.png", price: 30, name: "iPhone" },
    { id: 3, image: "/vertical-logo.png", price: 200, name: "samsung" },
    { id: 4, image: "/vertical-logo.png", price: 2089, name: "pc" },
  ];
  return (
    <div className="lg:w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 ">
      {items.map((item, index) => (
        <ShopCard key={item.id} item={item}></ShopCard>
      ))}
    </div>
  );
};

export default Shop;
