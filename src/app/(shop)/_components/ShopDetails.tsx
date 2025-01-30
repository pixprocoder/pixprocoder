import { Button } from '@/src/components/ui/button';
import { useToast } from '@/src/components/ui/use-toast';
import { addToCart } from '@/src/redux/features/cart/CartSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import Image from 'next/image';

function ShopDetailsPage({ item }: { item: any }) {
  const { items } = useAppSelector((state) => state.cart);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { id, description, image, price, title, rating, category } = item;

  // handle addToCart
  const handleAddToCart = (item) => {
    const isItemExist = items.find((i) => i.id === item.id);
    if (isItemExist) {
      toast({
        title: 'Item AlreadyExist',
        description: 'If You want to update the quantity go to cart',
        className: `toast-warning`, // Apply the custom class
      });
    } else {
      dispatch(addToCart(item));
      toast({
        title: 'WOW 🎉',
        description: 'Item Added Successfully 🚀',
        className: 'toast-success',
      });
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1 justify-center items-start flex">
          {image && <Image src={image} alt="image" width={400} height={400} />}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-sm text-gray-300 my-2">{description}</p>
          {/* <p className="text-sm text-gray-300 my-2">{category}</p> */}
          <p className="text-sm text-gray-300 my-2 flex items-center gap-2">
            {' '}
            Price:{' '}
            <span className="text-2xl text-purple-500 font-bold ">
              {price}
            </span>{' '}
          </p>
          <Button onClick={() => handleAddToCart(item)} className="primary-btn">
            Add To Cart
          </Button>
        </div>
      </div>
      {/* TODO: add rating */}
      <hr className="my-2" />
      <h1 className="text-center ">Rating will go here for this product</h1>
    </div>
  );
}

export default ShopDetailsPage;
