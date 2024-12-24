import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { FaCartPlus } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

const ShopCard = ({ item }: any) => {
  return (
    <Link
      href={`/shop/${item.id}`}
      className=" shadow-lg hover:shadow-purple-950 bg-black rounded-sm flex p-2 py-6 flex-col"
    >
      <div className="w-full h-40 overflow-hidden  flex justify-center items-center ">
        <img src={item.image} alt="image" />
      </div>
      <div className="">
        <p className="text-sm text-gray-300 mt-2 overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {item.title}
        </p>
        <div className="flex flex-row-reverse justify-between my-2">
          <span className="text-xs text-gray-500">In Stock</span>
          <span className="text-sm text-gray-600 flex gap-1 items-center">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <span className="text-xs">(0)</span>
          </span>
        </div>
        <span className="text-purple-500 font-black text-2xl">
          ${item.price}
        </span>
      </div>
    </Link>
  );
};

export default ShopCard;
