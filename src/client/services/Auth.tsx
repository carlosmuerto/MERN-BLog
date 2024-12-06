// Need to use the React-specific entry point to import createApi
import { APIErros, APIResponseBase } from "@/Utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { jwtDecode } from "jwt-decode";

// actions CONSTANTS
const ACTION_PREPEND = "API/Auth";

// Define a service using a base URL and expected endpoints
export const AuthAPI = createApi({
  reducerPath: ACTION_PREPEND,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<string, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/signin",
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response: APIResponseBase & { token: string }) => {
        // const decoded = jwtDecode(response.token)
        return response.token
      },
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return err;
      },
    }),

		signUp: builder.mutation<string, { email: string; username: string; password: string }>({
      query: ({ email, username, password }) => ({
        url: "/signUp",
        method: "POST",
        body: { email, username, password },
      }),
      transformResponse: (response: APIResponseBase & { token: string }) => {
        // const decoded = jwtDecode(response.token)
        return response.token
      },
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return err;
      },
    }),

		signOut: builder.mutation<string, string>({
      query: (token ) => ({
        url: "/signOut",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return err;
      },
    }),

    delete: builder.mutation<string, string>({
      query: ( token ) => ({
        url: "/delete",
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return err;
      },
    }),

    currentUser: builder.query<string, APIResponseBase & {token: string}>({
      query: ({token}) => ({
        url: "/currentUser",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return err;
      },
    }),

		Update: builder.mutation<string, {email?: string; username?: string; profileImg?: string; password?: string, token: string}>({
      query: ({ token, ...user }) => ({
        url: "/Update",
        method: "POST",
        body: { ...user },
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      transformResponse: (response: APIResponseBase & { token: string }) => {
        // const decoded = jwtDecode(response.token)
        return response.token
      },
      transformErrorResponse: (err) => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return err;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default AuthAPI;
