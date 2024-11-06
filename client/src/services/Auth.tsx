// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";

// Auth User Model

export type User = {
  id: string;
  username: string;
  email: string;
}

export type SignInErros = {
  statusCode: number;
  message: string;
  messageStack: { [x: string]: string };
}

// actions CONSTANTS
const ACTION_PREPEND = "API/Auth";

// Define a service using a base URL and expected endpoints
export const AuthAPI = createApi({
  reducerPath: ACTION_PREPEND,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response: { token: string }) =>
        jwtDecode<User>(response.token),
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as SignInErros;
        }
        return err;
      },
    }),

		signUp: builder.mutation<User, { email: string; username: string; password: string }>({
      query: ({ email, username, password }) => ({
        url: "/auth/signUp",
        method: "POST",
        body: { email, username, password },
      }),
      transformResponse: (response: { token: string }) =>
        jwtDecode<User>(response.token),
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as SignInErros;
        }
        return err;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default AuthAPI;
