// ShopCard Component (ShopCard.tsx)
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { FiShoppingCart } from 'react-icons/fi';

const ShopCard = ({ item, index }: any) => {
  const renderRating = () => {
    const fullStars = Math.floor(item.rating.rate);
    const hasHalfStar = item.rating.rate % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < fullStars
                ? 'text-yellow-400'
                : hasHalfStar && i === fullStars
                  ? 'text-yellow-400'
                  : 'text-muted-foreground'
            }`}
          >
            {i < fullStars ? '★' : hasHalfStar && i === fullStars ? '½' : '☆'}
          </span>
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          ({item.rating.count})
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <Link
        href={`/shop/${item.id}`}
        className="flex flex-col h-full p-4 border rounded-xl bg-background/50 hover:border-primary transition-all"
      >
        <div className="relative aspect-square mb-4">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>

        {renderRating()}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            ${item.price}
          </span>
          <Badge
            variant="outline"
            className="text-green-500 border-green-500/30"
          >
            In Stock
          </Badge>
        </div>
      </Link>

      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
      >
        <FiShoppingCart className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default ShopCard;
