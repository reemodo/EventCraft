import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "../../../rdx/rdxUtilities";
import { eventFormData } from "../event.utils";
export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (id) => ({
        url: `events`,
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
          url: `events/${body.id}`,
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),

    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `events/myEvents/${id}`,
        method: "DELETE",
      }),
    }),

    updateEvent: builder.mutation({
      query: (body) => {
        const formData = eventFormData(body);

        return {
          url: `events/${body.id}`,
          method: "PUT",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
} = eventApi;
