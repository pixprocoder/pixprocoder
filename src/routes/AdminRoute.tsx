'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const AdminRoute = ({ children }: { children: any }) => {
  const router = useRouter();
  const { user, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user || !isAdmin) {
    router.push('/login');
    return null;
  }

  return children;
};

export default AdminRoute;
