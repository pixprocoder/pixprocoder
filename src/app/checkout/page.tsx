import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex mt-4 gap-4 items-center">
        <Link href="/">
          <Image width={40} height={40} src="/vertical-logo.png" alt="logo" />
        </Link>
        <h1 className="text-sm text-green-600"> 🔒 All Data Are encrypted</h1>
      </div>
      <hr className="border border-gray-600 my-4" />
      <div className="flex justify-between gap-4">
        <div className="flex-[2]">
          <div>
            <h3 className="mb-2 text-gray-100">Shipping Address Details</h3>
            <div>add shipping address form here</div>
          </div>
          <div>
            <h3 className="mb-2 text-gray-100">Item Details goes here</h3>
            <div>All Items here</div>
          </div>
          <div>
            <h3 className="mb-2 text-gray-100">Payment Method</h3>
            <div>Payment Method here</div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-[1]">
          <h1 className="mb-2 text-gray-100"> Order Summary</h1>
          <div>
            <div className="flex justify-between">
              <h1 className="text-sm text-gray-300">Items total:</h1>
              <span>$33.00</span>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm text-gray-300">Shipping</h1>
              <span>FREE</span>
            </div>
          </div>
          <hr className="border border-gray-600 my-4" />
          <div>
            <div className="flex justify-between">
              <h1 className="text-sm">Total:</h1>
              <span>$33.00</span>
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
