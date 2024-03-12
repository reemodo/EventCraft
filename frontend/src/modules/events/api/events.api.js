import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery} from '../../../rdx/rdxUtilities'
export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (id) => ({
        url: `events`,
        method: "GET",
        params:{id}
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
  useUpdateEventMutation,
  useLazyGetMyEventsQuery
} = eventApi;
