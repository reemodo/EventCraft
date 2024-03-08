import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../env";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: `events`,
        method: "GET"
      }),
    }),
    getMyEvents: builder.query({
      query: (id) => ({
        url: `events/myEvents/${id}`,
        method: "GET"
      }),
    }),

    addEvent: builder.mutation({
      query: (body) => ({
        url: `events`,
        method: "POST",
        body,
      }),
    }),

    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `events/myEvents/${id}`,
        method: "DELETE",
      }),
    }),

    updateEvent: builder.mutation({
      query: (body) => ({
        url: `events/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
  useLazyGetEventsQuery,
  useGetMyEventsQuery,
  useUpdateEventMutation
} = eventApi;
