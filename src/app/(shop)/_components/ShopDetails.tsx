import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import React from "react";

function ShopDetailsPage({}) {
  return (
    <div>
      <Button asChild>
        <Link href={`/payment`}>Pay Now</Link>
      </Button>
    </div>
  );
}

export default ShopDetailsPage;
