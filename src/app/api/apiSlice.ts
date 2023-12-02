import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  logOut,
  AuthState,
} from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }) => {
    const authState = getState() as { auth: AuthState };
    const token = authState.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "put", credentials: "include" },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const authState = api.getState() as { auth: AuthState };
      const user = authState.auth.user;

      // store token and user
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry original query with new accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
