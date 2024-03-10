import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../env";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: `register`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
