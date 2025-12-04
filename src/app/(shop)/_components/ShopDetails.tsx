import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useToast } from '@/src/components/ui/use-toast';
import { addToCart } from '@/src/redux/features/cart/CartSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiShoppingCart, FiStar } from 'react-icons/fi';

function ShopDetailsPage({ item }: { item: any }) {
  const { items } = useAppSelector((state) => state.cart);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { id, description, image, price, title, rating, category } = item;

  const handleAddToCart = (item: any) => {
    const isItemExist = items.find((i) => i.id === item.id);
    if (isItemExist) {
      toast({
        title: 'Item Already in Cart',
        description: 'Update quantity in cart page',
        variant: 'warning',
      });
    } else {
      dispatch(addToCart(item));
      toast({
        title: 'Added to Cart 🎉',
        description: `${title} added successfully!`,
        variant: 'success',
      });
    }
  };

  const renderRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < Math.floor(rating?.rate)
                ? 'text-yellow-400'
                : rating?.rate % 1 >= 0.5 && index === Math.floor(rating?.rate)
                  ? 'text-yellow-400'
                  : 'text-muted-foreground'
            }`}
          >
            {index < Math.floor(rating?.rate) ? (
              <FiStar className="fill-current" />
            ) : rating?.rate % 1 >= 0.5 &&
              index === Math.floor(rating?.rate) ? (
              <FiStar className="fill-current" />
            ) : (
              <FiStar className="fill-none" />
            )}
          </span>
        ))}
        <span className="text-sm text-muted-foreground">
          ({rating?.count} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/shop">
          <Button variant="ghost" className="gap-2">
            <FiChevronLeft className="w-4 h-4" />
            Back to Shop
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square bg-background rounded-xl overflow-hidden border border-border"
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-8"
              priority
            />
          ) : (
            <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
          )}

          <Badge className="absolute top-4 left-4 bg-green-500/20 text-green-500">
            In Stock
          </Badge>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Badge variant="outline" className="text-sm capitalize">
            {category}
          </Badge>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            {title}
          </h1>

          {renderRating()}

          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            ${price}
          </p>

          <p className="text-muted-foreground">{description}</p>

          <Button
            onClick={() => handleAddToCart(item)}
            className="gap-2 w-full lg:w-auto bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary"
          >
            <FiShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Delivered within 3-5 business days
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                30-day return policy
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Specifications */}
      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-8">Product Details</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium">Key Features</h3>
            <ul className="space-y-2">
              {[
                'Premium quality materials',
                '1-year manufacturer warranty',
                'Energy efficient design',
                'Easy installation',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-primary">▹</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Technical Specifications</h3>
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Material</span>
                <span>Premium Aluminum</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Dimensions</span>
                <span>10 × 5 × 2 inches</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Weight</span>
                <span>1.5 lbs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDetailsPage;
