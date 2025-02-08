'use client';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { useRouter } from 'next/navigation';
import LoadingPage from '../app/loading';

const PrivateRoute = ({ children }: any) => {
  const { user, loading } = useContext(AuthContext);
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
