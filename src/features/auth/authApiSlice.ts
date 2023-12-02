import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'post',
        body: {
          ...credentials
        }
      })
    }),
    logOut: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'post',
      })
    }),
  })
})

export const { useLoginMutation, useLogOutMutation } = authApiSlice