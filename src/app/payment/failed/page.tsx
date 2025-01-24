'use client';
import React from 'react';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

const FailedPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="text-white text-center">Sorry Something went wrong!</p>

      <Button className="text-purple-500" variant="link">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default FailedPage;
