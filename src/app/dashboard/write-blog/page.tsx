import AdminRoute from '@/src/routes/AdminRoute';
import PrivateRoute from '@/src/routes/PrivateRoute';

const page = () => {
  return (
    <PrivateRoute>
      <AdminRoute>
        <h1>Hi I am admin</h1>
      </AdminRoute>
    </PrivateRoute>
  );
};
export default page;
