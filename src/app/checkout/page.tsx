'use client';
import Payments from '@/src/app/payment/page';
import Modal from '@/src/components/shared/Modal';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { useAppSelector } from '@/src/redux/hooks/hooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { GrPaypal } from 'react-icons/gr';

function CheckoutPage() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const paymentMethods = {
    card: false,
    payPal: false,
  };

  const handlePayment = () => {
    if (paymentMethods.card || paymentMethods.payPal) {
      alert('payment successful');
    } else {
      alert('You Must select a payment method');
    }
  };

  return (
    <div className="container  mx-auto px-4 py-8">
      {/* Responsive Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            width={40}
            height={40}
            src="/vertical-logo.png"
            alt="logo"
            className="rounded-lg"
          />
          <Badge
            variant="outline"
            className="border-green-500/30 text-green-500"
          >
            <FiLock className="w-4 h-4 mr-1" />
            Secure Checkout
          </Badge>
        </Link>
        <Button asChild variant="ghost" className="flex-shrink-0">
          <Link href="/cart-details" className="gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address Section */}
          <div className="p-4 sm:p-6 rounded-xl border border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Shipping Address
              </h2>
              <Modal
                trigger={
                  <Button variant="ghost" size="sm" className="gap-2">
                    <FaRegEdit className="w-4 h-4" />
                    <span className="sr-only sm:not-sr-only">Edit</span>
                  </Button>
                }
              >
                <div className="p-4">
                  <p>Address edit form goes here</p>
                </div>
              </Modal>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Samsul Kobir (+33 5333456233)</p>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calea Moșilor 237, block.45, sc.1, sector.2, ap.20, floor.3
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                București, Romania 021243
              </p>
              <div className="pt-4 mt-4 border-t border-border">
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500/30"
                >
                  Delivery: 4-12 business days
                </Badge>
              </div>
            </div>
          </div>

          {/* Items Preview Section */}
          <div className="p-4 sm:p-6 rounded-xl border border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {items.length} Items
              </h2>
              <Modal
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    View All Items
                  </Button>
                }
              >
                <div className="max-h-[60vh] overflow-auto space-y-4 p-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-2 border-b border-border"
                    >
                      <div className="relative w-20 h-20 rounded-md overflow-hidden border border-border">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm sm:text-base">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          {item.description.split(' ').slice(0, 20).join(' ')}
                          ...
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                            ${item.price}
                          </span>
                          <span className="text-sm sm:text-base">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>
            </div>

            <div className="flex flex-wrap gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-24 h-24 flex-shrink-0 relative rounded-lg border border-border"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1 text-center">
                    <p className="text-xs font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="p-4 sm:p-6 rounded-xl border border-border">
            <h2 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Payment Method
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Modal
                trigger={
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CiCreditCard1 className="w-6 h-6 text-primary" />
                      <span className="font-medium text-sm sm:text-base">
                        Credit/Debit Card
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">
                    Card Payment
                  </h3>
                  <Payments total={totalPrice} />
                </div>
              </Modal>

              <Modal
                trigger={
                  <div className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <GrPaypal className="w-6 h-6 text-blue-500" />
                      <span className="font-medium text-sm sm:text-base">
                        PayPal
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="p-4 border border-border rounded-lg">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">
                    PayPal Integration
                  </h3>
                  <p className="text-muted-foreground">
                    PayPal checkout coming soon
                  </p>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-4 sm:p-6 rounded-xl border border-border lg:sticky lg:top-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base">Items:</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base">Shipping:</span>
                <span className="text-green-500">FREE</span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center pt-4">
                  <span className="font-bold text-sm sm:text-base">Total:</span>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
