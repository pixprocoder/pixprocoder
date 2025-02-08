'use client';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { useRouter } from 'next/navigation';
import LoadingPage from '../app/loading';
import { useGetUsersQuery } from '@/src/redux/api/user/UserApiSlice';

const PrivateRoute = ({ children }: any) => {
  const { user, loading } = useContext(AuthContext);
  const { data: admins, error } = useGetUsersQuery({});
  console.log(admins);
  const router = useRouter();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    router.push('/login');
    return;
  }

  return children;
};

export default PrivateRoute;
