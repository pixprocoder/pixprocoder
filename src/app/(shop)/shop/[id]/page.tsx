'use client';
import React, { use } from 'react';

function page({ params }) {
  const { id } = use(params);
  return (
    <div>
      <h1>Shop single page</h1>
      <p>{id}</p>
    </div>
  );
}

export default page;
