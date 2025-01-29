'use client';
import React from 'react';
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/src/components/ui/sheet';
import { Button } from '@/src/components/ui/button';
import { TiMinus } from 'react-icons/ti';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useAppSelector } from '@/src/redux/hooks/hooks';
import { Key } from 'lucide-react';
import Image from 'next/image';

// Component start

function CartSheet() {
  const { items } = useAppSelector((state) => state.cart);
  console.log('inside cart sheet', items);
  return (
    <div>
      <SheetHeader>
        <SheetTitle className="text-gray-100">MY CART</SheetTitle>
        <SheetDescription>
          {items?.map((item: any) => {
            return (
              <div key={item?.id}>
                <div className="bg-gray-800 rounded-md flex justify-between items-center p-4 my-2">
                  <div className="flex flex-col">
                    <div className="w-30 h-30 rounded-md overflow-hidden flex justify-center items-center border-2 border-gray-700">
                      <Image
                        src={item?.image}
                        alt="image"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3>Price</h3>
                    <span className="text-purple-500 font-bold">
                      {item?.price}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3>Qty</h3>
                    <span className="text-white">{item?.quantity}</span>
                  </div>
                  <div className="flex gap-2">
                    <FaPlus className="text-lg cursor-pointer text-white bg-blue-500 rounded-full p-1" />
                    <TiMinus className="text-lg cursor-pointer text-white bg-red-500 rounded-full p-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </SheetDescription>
      </SheetHeader>

      <SheetFooter>
        <Button className="" asChild>
          <Link href="/shop">Continue Shopping 🛍️</Link>
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
          <Link href="/cart-details">See Cart 👀</Link>
        </Button>
      </SheetFooter>
    </div>
  );
}

export default CartSheet;
