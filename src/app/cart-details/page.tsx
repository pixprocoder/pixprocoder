'use client';
import ConfirmDelete from '@/src/components/shared/ConfirmDelete';
import Modal from '@/src/components/shared/Modal';
import { Button } from '@/src/components/ui/button';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '@/src/redux/features/cart/CartSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { TiMinus } from 'react-icons/ti';

function page() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleDelete = (item: any) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex mt-4 gap-6 items-center">
        <Link href="/">
          <Image width={40} height={40} src="/vertical-logo.png" alt="logo" />
        </Link>
        <h1 className="text-sm text-green-600"> 🔒 All Data Are encrypted</h1>
      </div>
      <hr className="border border-gray-600 my-4" />
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-[2] px-4">
          <div className="flex justify-between items-center">
            <h3 className=" text-purple-500 text-xl">My Items</h3>
            <h2 className="mr-2">
              <span className="text-purple-500 font-bold mr-1">
                {items.length ? items?.length : '0'}
              </span>
              {items.length > 1 ? 'items' : 'item'}
            </h2>
          </div>
          <div className="flex flex-col gap-2 max-h-[60vh] overflow-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
            {items?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="bg-gray-800 flex justify-between gap-2 rounded-sm p-4"
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-20 flex justify-center items-center overflow-hidden border border-gray-600 rounded-md">
                      <Image
                        src={item?.image}
                        alt="product image"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm mb-4 hover:underline">
                        <Link href={`/shop/${item.id}`}>{item?.title}</Link>
                      </h4>
                      <span className="text-purple-500 font-black text-2xl">
                        ${item?.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center ">
                      <p className="text-sm text-gray-400">Item Total</p>
                      <span className="text-purple-500 font-bold">
                        {item?.itemTotalPrice}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-400">Quantity</p>
                      <span>{item?.quantity}</span>
                    </div>

                    <div className="flex gap-2 flex-col">
                      <FaPlus
                        onClick={() => dispatch(incrementQuantity(item))}
                        className="text-xl cursor-pointer text-white bg-blue-500 rounded-full p-1"
                      />
                      <TiMinus
                        onClick={() => dispatch(decrementQuantity(item))}
                        className="text-xl cursor-pointer text-white bg-red-500 rounded-full p-1"
                      />
                      <ConfirmDelete
                        id={item}
                        onConfirm={handleDelete}
                        onTrigger={
                          <FaRegTrashAlt className="text-xl cursor-pointer text-white bg-red-500 rounded-full p-1" />
                        }
                      />

                      {/* <Modal
                        onCancel={
                          <Button className="bg-gradient-to-r from-purple-500 to-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"></Button>
                        }
                        onConfirm={
                          <Button className="bg-gradient-to-r from-purple-500 to-blue-500  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"></Button>
                        }
                        trigger={
                          <FaRegTrashAlt className="text-xl cursor-pointer text-white bg-red-500 rounded-full p-1" />
                        }
                        title="Are You Sure To Remove?"
                      >
                        <span className="my-2">
                          The Product will be removed from the cart
                        </span>
                      </Modal> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-[1] px-4">
          <h1 className=" text-gray-100"> Order Summary</h1>
          <hr className="border border-gray-600 my-4" />
          <div>
            <div className="flex justify-between">
              <h1 className="text-sm text-gray-300">Total Price:</h1>
              <span className="text-purple-500 font-bold">$ {totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm text-gray-300">Item Discount:</h1>
              <span className="text-purple-500 font-bold">$00.00</span>
            </div>
          </div>
          <hr className="border border-gray-600 my-4" />
          <div>
            <div className="flex justify-between">
              <h1 className="text-sm">Grand Total:</h1>
              <span className="text-purple-500 font-bold">$ {totalPrice}</span>
            </div>
          </div>
          <div>
            <Button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 w-full  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
              <Link href="/checkout">Proceed To Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1>TODO: Remanded Product will goes here</h1>
      </div>
    </div>
  );
}

export default page;
