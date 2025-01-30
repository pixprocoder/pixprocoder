'use client';
import { Button } from '@/src/components/ui/button';
import { useAppSelector } from '@/src/redux/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { CiCreditCard1 } from 'react-icons/ci';
import { GrPaypal } from 'react-icons/gr';

function page() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex mt-4 gap-4 items-center">
        <Link href="/">
          <Image width={40} height={40} src="/vertical-logo.png" alt="logo" />
        </Link>
        <h1 className="text-sm text-green-600"> 🔒 All Data Are encrypted</h1>
      </div>
      <hr className="border border-gray-600 my-4" />
      <div className="flex flex-col md:flex-row justify-between gap-4 px-2">
        <div className="flex-[2]">
          {/* Shipping Address */}
          <div>
            <h3 className="mb-2 text-gray-300">Shipping Address </h3>
            <div className="bg-gray-900 rounded-md  flex justify-between gap-3 px-2 py-4">
              <div className="flex border-r border-gray-500 pr-2 flex-1 justify-between w-full">
                <div>
                  <p className="text-sm text-gray-300">
                    Samsul Kobir
                    <span className="pl-3">+33 5333456233</span>
                  </p>
                  <p className="text-xs my-1 text-purple-500">
                    Calea Moșilor 237, block.45, sc.1, sector.2, ap.20, floor.3
                    București, București 021243, Romania
                  </p>
                  <p className="text-sm text-gray-300">
                    București, București 021243, Romania
                  </p>
                </div>
                <FaRegEdit className="text-xl" />
              </div>
              <div className="hidden md:flex flex-col flex-1">
                <p className="text-sm text-gray-300">
                  Delivery
                  <span className="pl-3">FREE</span>
                </p>
                <p className="text-xs my-1 text-purple-500">
                  Delivery: 4-12 business days, fastest delivery in 4 business
                  days
                </p>
              </div>
            </div>
            <hr className="my-4 border-[0.1px] border-gray-700" />
          </div>
          {/* Item Details */}
          <div>
            <div className="flex justify-between  ">
              <h3 className="mb-2 text-sm text-gray-200">
                <span className="text-purple-500">
                  {items?.length && items?.length}
                </span>{' '}
                Items
              </h3>{' '}
              <span className="text-gray-300 text-sm underline cursor-pointer ">
                View All
              </span>
            </div>

            <div className="bg-gray-900 rounded-md flex justify-between  px-2 py-4">
              <div className="flex gap-4 overflow-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700 py-3">
                {items?.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col cursor-pointer  "
                    >
                      <div className="w-[100px] overflow-hidden border-gray-800 border-[0.1px] rounded-md h-[100px] flex justify-center items-center">
                        <Image
                          src={item?.image}
                          width={100}
                          height={100}
                          alt="product"
                        />
                      </div>
                      <h1 className=" text-xl text-purple-500 font-bold mt-2">
                        $ {item?.price}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <hr className="my-4  border-[0.1px]  border-gray-700" />

          {/* payment  */}
          <div>
            <h3 className="mb-2 text-gray-300">Payment Method </h3>
            <div className="bg-gray-900 rounded-md  flex justify-between gap-3 px-2 py-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center cursor-pointers">
                  <CiCreditCard1 className="text-2xl text-purple-500" />
                  <p className="text-sm cursor-pointer underline decoration-purple-500">
                    Mastercard
                  </p>
                </div>
                <div className="flex gap-2 items-center cursor-pointer">
                  <GrPaypal className="text-purple-500 text-2xl" />
                  <p className=" text-sm underline decoration-purple-500 cursor-pointer">
                    PayPal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-[1]">
          <h1 className="mb-2 text-gray-300"> Order Summary</h1>
          <div>
            <div className="flex justify-between">
              <h1 className="text-sm text-gray-300">Items total:</h1>
              <span className="text-purple-500 text-xl font-bold">
                $ {totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm text-gray-300">Shipping</h1>
              <span className="text-green-500 font-bold">FREE</span>
            </div>
          </div>
          <hr className="border border-gray-600 my-4" />
          <div>
            <div className="flex justify-between">
              <h1 className="text-sm">Total:</h1>
              <span className="text-purple-500 text-xl font-bold">
                $ {totalPrice}
              </span>
            </div>
          </div>
          <div>
            <Button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 w-full  hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
              Order And Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
