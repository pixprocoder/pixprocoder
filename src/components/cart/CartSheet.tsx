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

function CartSheet() {
  return (
    <div>
      <SheetHeader>
        <SheetTitle className="text-gray-100">MY CART</SheetTitle>
        <SheetDescription>
          <div className="bg-gray-800 rounded-md flex justify-between items-center p-4 my-2">
            <p>Image</p>
            <h2>Name</h2>
            <span>01</span>
            <div className="flex gap-2">
              <FaPlus className="text-lg cursor-pointer text-white bg-blue-500 rounded-full p-1" />
              <TiMinus className="text-lg cursor-pointer text-white bg-red-500 rounded-full p-1" />
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>

      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Checkout</Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
}

export default CartSheet;
