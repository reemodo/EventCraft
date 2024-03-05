import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => `events/`,
    }),

    addEvent: builder.mutation({
      query: (body) => ({
        url: `events`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetEventsQuery, useAddEventMutation } = eventApi;
