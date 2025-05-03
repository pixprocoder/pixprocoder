'use client';
import { useState } from 'react';
import AdminRoute from '@/src/routes/AdminRoute';
import PrivateRoute from '@/src/routes/PrivateRoute';
import BlogPostForm from '@/src/components/BlogPostForm';

const page = () => {
  return (
    <PrivateRoute>
      <AdminRoute>
        <div className="max-w-2xl mx-auto">
          <h1 className="py-6 text-center text-2xl ">
            Welcome, Start Writng Your Blog
          </h1>

          {/* BlogPostForm */}
          <BlogPostForm></BlogPostForm>
        </div>
      </AdminRoute>
    </PrivateRoute>
  );
};
export default page;
