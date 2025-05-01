'use client';
import { useEffect, useState } from 'react';
import { useGetPostsQuery } from '@/src/redux/api/posts/PostApiSlice';
import SelectCategoryPage from '@/src/components/shared/SelectCategory';
import { BlogCard } from '../_components/BlogCard';
import { SectionBanner } from '@/src/components/shared/SectionBanner';

export default function BlogPage() {
  const { data: posts, isLoading } = useGetPostsQuery({});

  return (
    <section className="container mx-auto min-h-screen py-14">
      <SectionBanner>Latest Articles</SectionBanner>

      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-2xl font-medium">Explore by Category</h2>
        <SelectCategoryPage />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(isLoading ? Array.from({ length: 6 }) : posts)?.map(
          (blog: any, index: number) => (
            <BlogCard
              key={blog?.id || index}
              blog={blog}
              isLoading={isLoading}
            />
          ),
        )}
      </div>
    </section>
  );
}
