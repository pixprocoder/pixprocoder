import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/index';

export const EmailApiSlice = createApi({
  reducerPath: 'emailApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    sendContactEmail: builder.mutation({
      query(data) {
        return {
          url: `contact/send-quote`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useSendContactEmailMutation } = EmailApiSlice;
