'use client';
import BlogPostForm from '@/src/components/BlogPostForm';
import AdminRoute from '@/src/routes/AdminRoute';
import PrivateRoute from '@/src/routes/PrivateRoute';

const page = () => {
  return (
    <PrivateRoute>
      <AdminRoute>
        <div className="container mx-auto">
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
