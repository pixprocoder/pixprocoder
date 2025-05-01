'use client';
import { Button } from '@/src/components/ui/button';
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/src/components/ui/sheet';
import {
  decrementQuantity,
  incrementQuantity,
} from '@/src/redux/features/cart/CartSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import emptyCartImage from '../../assets/images/empty-cart.svg';
import { motion } from 'framer-motion';

function CartSheet() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="border-b border-border pb-4">
        <SheetTitle className="text-foreground">Shopping Cart</SheetTitle>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Total:</span>
          <p className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </SheetHeader>

      <SheetDescription className="flex-1 overflow-y-auto py-4 px-2">
        {items.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 items-center p-3 rounded-lg border border-border bg-background/50"
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-border">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    fill
                    className="object-contain p-1.5"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium line-clamp-2 text-sm">
                    {item?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    ${item?.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => dispatch(decrementQuantity(item))}
                    >
                      <FiMinus className="w-4 h-4" />
                    </Button>
                    <span className="w-6 text-center">{item?.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => dispatch(incrementQuantity(item))}
                    >
                      <FiPlus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    ${(item?.price * item?.quantity).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <div className="relative w-48 h-48">
              <Image
                src={emptyCartImage}
                alt="Empty cart"
                fill
                className="object-contain opacity-50"
              />
            </div>
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm">
              Start adding items to continue
            </p>
          </motion.div>
        )}
      </SheetDescription>

      <SheetFooter className="border-t border-border pt-4">
        <div className="w-full flex flex-col gap-2">
          <Button asChild variant="secondary">
            <Link href="/shop" className="gap-2">
              <FiShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
          {items.length > 0 && (
            <Button asChild className="gap-2">
              <Link href="/cart-details">
                See Cart
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </SheetFooter>
    </div>
  );
}

export default CartSheet;
