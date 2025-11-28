'use client';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import LoadingPage from '../app/loading';
import { AuthContext } from '../providers/AuthProviders';

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
