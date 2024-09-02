"use client"
import { Button } from "@/src/components/ui/button";
import Confetti from 'react-confetti'
import { useState } from "react";
import ShopCard from "@/src/components/ShopCard";


const Shop = () => {
    // const [isConfettiVisible, setConfettiVisible] = useState(false);
    //
    // const handleClick = () => {
    //   setConfettiVisible(true);
    //   setTimeout(() => {
    //     setConfettiVisible(false);
    //   }, 4000); // Confetti lasts for 3 seconds
    // };

    const items = [
        {id: 1, price: 20, name:"laptop"},
        {id: 2, price: 30, name:"iPhone"},
        {id: 3, price: 200, name:"samsung"},
        {id: 4, price: 2089, name:"pc"}
    ]
  return (
    
    <div className="w-[1200px] mx-auto grid grid-cols-3 gap-4 min-h-screen">
        {items.map((item, index) => <ShopCard key={item.id} item={item}></ShopCard>)}
    {/* */}
    {/*  /!* <h1>Hello from shop page</h1> *!/*/}
    {/*  <Button onClick={handleClick}>Click</Button>*/}
    {/*  {isConfettiVisible && (*/}
    {/*  <Confetti*/}
    {/*    width={window.innerWidth}*/}
    {/*    height={window.innerHeight}*/}
    {/*    numberOfPieces={200}*/}
    {/*    gravity={0.1}*/}
    {/*  />*/}
    {/*)}*/}
    </div>
  );
};

export default Shop;
