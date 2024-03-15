import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "../../../rdx/rdxUtilities";
import { eventFormData } from "../event.utils";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: (id) => ({
        url: `events/${id}`,
        method: "GET",
      }),
    }),

    getEvents: builder.query({
      query: (id) => ({
        url: `events/`,
        method: "GET",
        params: { id },
      }),
    }),

    getMyEvents: builder.query({
      query: (id) => ({
        url: `events/myEvents/${id}`,
        method: "GET",
      }),
    }),

    addEvent: builder.mutation({
      query: (body) => {
        const formData = eventFormData(body);
        return {
          url: `events/`,
          method: "POST",
          body: formData,
        };
      },
    }),

    joinEvent: builder.mutation({
      query: ({ userId, eventId }) => {
        return {
          url: `events/joinEvent/${eventId}/${userId}`,
          method: "POST",
        };
      },
    }),

    cancelJoinedEvent: builder.mutation({
      query: ({ userId, eventId }) => {
        return {
          url: `events/cancelJoinedEvent/${eventId}/${userId}`,
          method: "POST",
        };
      },
    }),

    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `events/${id}`,
        method: "DELETE",
      }),
    }),

    updateEvent: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `events/${id}`,
          method: "PUT",
          body: formData,
        };
      },
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
  useLazyGetMyEventsQuery,
  useLazyGetEventQuery,
  useJoinEventMutation,
  useCancelJoinedEventMutation,
} = eventApi;
