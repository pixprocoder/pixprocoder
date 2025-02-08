import { getBaseURL } from '@/src/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003/api/v1' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/jwt?role=admin',
    }),
  }),
});

export const { useGetUsersQuery } = UserApiSlice;
