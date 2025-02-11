import { getBaseURL } from '@/src/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/jwt',
    }),
  }),
});

export const { useGetUsersQuery } = UserApiSlice;
