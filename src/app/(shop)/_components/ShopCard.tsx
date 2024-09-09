import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

const ShopCard = ({ item }: any) => {
  return (
    <div className="bg-red-300  rounded-lg flex justify-center items-center flex-col p-4">
      <img src={item.image} alt="image" />
      <p>{item.name}</p>
      <p>{item.price}</p>
      <div className="flex gap-2 flex-col">
        <Button>Add To Cart</Button>
        <Button asChild>
          <Link href={`/shop/${item.id}`}>View More</Link>
        </Button>
      </div>
    </div>
  );
};

export default ShopCard;
