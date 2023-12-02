import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listUsers: builder.query({
      query: () => '/users',
      keepUnusedDataFor: 120
    })
  })
})

export const { useListUsersQuery } = userApiSlice

