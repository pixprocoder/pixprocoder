import PrivateRoute from '@/src/routes/PrivateRoute';

const page = () => {
  return (
    <PrivateRoute>
      <h1> I am private</h1>
    </PrivateRoute>
  );
};

export default page;
