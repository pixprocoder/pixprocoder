'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const AdminRoute = ({ children }: { children: any }) => {
  const router = useRouter();
  const { user, admin, loading } = useContext(AuthContext);
  console.log('adminroute', admin);
  // const hasAdmin = admin?.some((user: any) => user.role === Role.ADMIN);
  const hasAdmin = true;
  console.log('hasAdmin', hasAdmin);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!hasAdmin) {
    router.push('/login');
    return;
  }
  return children;
};

export default AdminRoute;
