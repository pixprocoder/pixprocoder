import React from 'react';
import Link from 'next/link';
import { FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const ShopCard = ({ item }: any) => {
  console.log(item);
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
          <div className="text-sm text-gray-600 flex gap-1 items-center">
            {[...Array(5)].map((_, index) => {
              if (index < Math.floor(item?.rating?.rate)) {
                // Full star
                return (
                  <span key={index} className="text-yellow-400">
                    <FaStar />
                  </span>
                );
              } else if (index < item?.rating?.rate) {
                // Half star
                return (
                  <span key={index} className="text-yellow-400">
                    <FaStarHalfAlt />
                  </span>
                );
              } else {
                // Empty star
                return (
                  <span key={index} className="text-gray-400">
                    <FaRegStar />
                  </span>
                );
              }
            })}
            <span className="text-xs text-purple-500">
              ({item?.rating?.count})
            </span>
          </div>
          {/* <div className="text-sm text-gray-600 flex gap-1 items-center">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <span className="text-xs text-purple-500">
              ({item?.rating?.count})
            </span>
          </div> */}
        </div>
        <span className="text-purple-500 font-black text-2xl">
          ${item.price}
        </span>
      </div>
    </Link>
  );
};

export default ShopCard;
