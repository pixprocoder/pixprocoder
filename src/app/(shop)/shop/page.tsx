"use client";
import ShopCard from "@/src/components/ShopCard";

const Shop = () => {
  const items = [
    { id: 1, price: 20, name: "laptop" },
    { id: 2, price: 30, name: "iPhone" },
    { id: 3, price: 200, name: "samsung" },
    { id: 4, price: 2089, name: "pc" },
  ];
  return (
    <div className="w-[1200px] mx-auto grid grid-cols-3 gap-4 min-h-screen">
      {items.map((item, index) => (
        <ShopCard key={item.id} item={item}></ShopCard>
      ))}
    </div>
  );
};

export default Shop;
