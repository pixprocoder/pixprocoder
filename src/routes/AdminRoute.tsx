'use client';

import { useRouter } from 'next/navigation';
import { useGetUsersQuery } from '../redux/api/user/UserApiSlice';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { Role } from '../enums';

const AdminRoute = ({ children }: { children: any }) => {
  const router = useRouter();
  const { user, admin, loading } = useContext(AuthContext);
  console.log('adminroute', admin);
  const hasAdmin = admin?.some((user: any) => user.role === Role.ADMIN);
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
