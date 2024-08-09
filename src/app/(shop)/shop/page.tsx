"use client"
import { Button } from "@/src/components/ui/button";
import Confetti from 'react-confetti'
import { useState } from "react";


const Shop = () => {
    const [isConfettiVisible, setConfettiVisible] = useState(false);

    const handleClick = () => {
      setConfettiVisible(true);
      setTimeout(() => {
        setConfettiVisible(false);
      }, 4000); // Confetti lasts for 3 seconds
    };
  return (
    
    <div className="w-[1400px] mx-auto flex justify-center items-center min-h-screen">
     
      {/* <h1>Hello from shop page</h1> */}
      <Button onClick={handleClick}>Click</Button>
      {isConfettiVisible && (
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        gravity={0.1}
      />
    )}
    </div>
  );
};

export default Shop;
