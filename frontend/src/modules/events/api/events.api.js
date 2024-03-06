import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
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
