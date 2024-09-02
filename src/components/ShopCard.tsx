import React from 'react';
import {Button} from "./ui/button";
import Link from "next/link";


const ShopCard = ({item}:any) => {

    return (
        <div className="bg-red-300 p-8 rounded-lg flex justify-center items-center flex-col">
            <p>{item.name}</p>
            <p>{item.price}</p>
            <Button>Add To Cart</Button>
            <Button>
                <Link href="/payment" >Pay Now</Link>
            </Button>
        </div>
    );
};

export default ShopCard;