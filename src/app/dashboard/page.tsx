import { Button } from '@/src/components/ui/button';
import PrivateRoute from '@/src/routes/PrivateRoute';
import Link from 'next/link';

const page = () => {
  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto">
        <h1>Dashbord Home Page</h1>
        <Button>
          <Link href="/dashboard/write-blog">Write Blog</Link>
        </Button>
      </div>
    </PrivateRoute>
  );
};

export default page;
