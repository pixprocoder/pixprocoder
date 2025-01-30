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
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import { Key } from 'lucide-react';
import Image from 'next/image';
import {
  decrementQuantity,
  incrementQuantity,
} from '@/src/redux/features/cart/CartSlice';
import emptyCartImage from '../../assets/images/empty-cart.svg';

// Component start

function CartSheet() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  return (
    <div>
      <SheetHeader>
        <SheetTitle className="text-gray-100">MY CART</SheetTitle>
        <div className="flex justify-center flex-col items-center">
          <p className="text-xs text-gray-300">Total Price</p>
          <p className="text-purple-500 text-xl font-bold">
            {totalPrice} <span className="text-gray-200">USD</span>
          </p>
        </div>
        <hr className="border-gray-500" />
        <SheetDescription className="max-h-[60vh] overflow-y-auto">
          {items?.length! > 0 ? (
            items?.map((item: any) => {
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
                      <h3>Total</h3>
                      <span className="text-purple-500 font-bold">
                        {item?.itemTotalPrice}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <h3>Qty</h3>
                      <span className="text-white">{item?.quantity}</span>
                    </div>
                    <div className="flex gap-2">
                      <FaPlus
                        onClick={() => dispatch(incrementQuantity(item))}
                        className="text-lg cursor-pointer text-white bg-blue-500 rounded-full p-1"
                      />
                      <TiMinus
                        onClick={() => dispatch(decrementQuantity(item))}
                        className="text-lg cursor-pointer text-white bg-red-500 rounded-full p-1"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center flex-col my-4">
              <h1 className="my-2">Cart Is Empty 🪫</h1>
              <div className="bg-gray-900 p-4 rounded-md">
                <Image
                  width={200}
                  height={200}
                  src={emptyCartImage}
                  alt="empty cart"
                />
              </div>
            </div>
          )}
        </SheetDescription>
      </SheetHeader>

      <SheetFooter className="mt-2 gap-2">
        <Button variant="secondary" className="" asChild>
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
