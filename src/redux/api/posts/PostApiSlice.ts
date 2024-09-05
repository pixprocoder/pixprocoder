import { getBaseURL } from './../../../utils/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PostApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: getBaseURL()}),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts"
        })
    })
})

export const {useGetPostsQuery} = PostApiSlice