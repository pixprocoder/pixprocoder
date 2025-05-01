'use client';
import { motion } from 'framer-motion';
import ConfirmDelete from '@/src/components/shared/ConfirmDelete';
import { Button } from '@/src/components/ui/button';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '@/src/redux/features/cart/CartSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiLock, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { FaPlus, FaMinus } from 'react-icons/fa';

function CartDetailsPage() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleDelete = (item: any) => dispatch(removeFromCart(item));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src="/vertical-logo.png"
            alt="logo"
            className="rounded-lg"
          />
          <span className="text-sm flex items-center gap-1 text-green-500">
            <FiLock className="w-4 h-4" />
            Secure Checkout
          </span>
        </Link>
        <Button asChild variant="ghost">
          <Link href="/shop" className="gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </Button>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Your Cart ({items.length})
            </h2>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl border border-border bg-background/50"
              >
                <div className="flex gap-4">
                  <Link
                    href={`/shop/${item.id}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden border border-border"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </Link>

                  <div className="flex-1">
                    <h3 className="font-medium hover:underline">
                      <Link href={`/shop/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => dispatch(decrementQuantity(item))}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => dispatch(incrementQuantity(item))}
                        >
                          <FaPlus className="w-3 h-3" />
                        </Button>
                      </div>

                      <ConfirmDelete
                        onConfirm={() => handleDelete(item)}
                        onTrigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </Button>
                        }
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-xl border border-border bg-background/50">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium">-$0.00</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-border">
                <span className="font-bold">Total</span>
                <span className="font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Button asChild className="w-full mt-6 primary-btn">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8">Recommended for You</h3>
        {/* Add recommended products component */}
      </div>
    </div>
  );
}

export default CartDetailsPage;
