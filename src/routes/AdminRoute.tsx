'use client';

import { useRouter } from 'next/navigation';
import { useGetUsersQuery } from '../redux/api/user/UserApiSlice';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const AdminRoute = ({ children }: { children: any }) => {
  const router = useRouter();
  const { user, admin, loading } = useContext(AuthContext);
  console.log('the data is form authProvider', admin);
  const hasAdmin = admin?.some((user) => user.role === 'admin');
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user || hasAdmin) {
    router.push('/login');
    return;
  }
  return children;
};

export default AdminRoute;
