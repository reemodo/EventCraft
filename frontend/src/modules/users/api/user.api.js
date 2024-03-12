import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../env";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/user` }),
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

export const { useLoginMutation, useRegisterMutation } = userApi;
