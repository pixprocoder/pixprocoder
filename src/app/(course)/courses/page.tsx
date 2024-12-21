import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import React from 'react';

function CoursesPage() {
  const id = 1;
  return (
    <div className="min-h-screen mx-auto">
      Course Details Page.
      <Button>
        <Link href={`/courses/${id}`}>View Details</Link>
      </Button>
    </div>
  );
}

export default CoursesPage;
