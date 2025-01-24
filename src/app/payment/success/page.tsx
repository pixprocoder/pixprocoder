"use client";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/src/providers/OtherProviders";
import { Button } from "@/src/components/ui/button";
import Confetti from "react-confetti";
import Link from "next/link";

const SuccessPage = () => {
  const { transactionId } = useContext(TransactionContext);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Only run the effect in the browser
    if (typeof window !== "undefined") {
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={800}
          recycle={false}
          colors={["#ff0000", "#00ff00", "#0000ff"]}
        />
      )}
      <p className="text-white text-center">Success!</p>
      <p className="text-white text-center my-2">
        Your Transaction id is{" "}
        <span className="text-green-400">{transactionId}</span>
      </p>
      <Button className="text-purple-500" variant="link">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default SuccessPage;
