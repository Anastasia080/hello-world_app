import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Users', 'Feedbacks'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    blockUser: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    getFeedbacks: builder.query({
      query: () => 'feedbacks',
      providesTags: ['Feedbacks'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedbacks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedbacks'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
} = api;