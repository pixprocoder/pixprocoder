import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ShopDetailsPage({ item }) {
  const { id, description, image, price, title, rating, category } = item;
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1 justify-center items-start flex">
          {image && <Image src={image} alt="image" width={400} height={400} />}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-sm text-gray-300 my-2">{description}</p>
          {/* <p className="text-sm text-gray-300 my-2">{category}</p> */}
          <p className="text-sm text-gray-300 my-2 flex items-center gap-2">
            {' '}
            Price:{' '}
            <span className="text-2xl text-purple-500 font-bold ">
              {price}
            </span>{' '}
          </p>
          <Button className="primary-btn">Add To Cart</Button>
        </div>
      </div>
      {/* TODO: add rating */}
      <hr className="my-2" />
      <h1 className="text-center ">Rating will go here for this product</h1>
    </div>
  );
}

export default ShopDetailsPage;
