import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "../../../rdx/rdxUtilities";
import { eventFormData } from "../event.utils";

import { v4 as uuid } from "uuid";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
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
        const formData = new FormData();
        formData.append("img", body.img || "");
        formData.append("title", body.title || "");
        formData.append("category", body.category || "");
        formData.append("description", body.description || "");
        formData.append("location", body.location || "");
        formData.append("startDate", body.startDate || "");
        formData.append("endDate", body.endDate || "");
        formData.append("userId", body.userId || "");
        formData.append("card", JSON.stringify(body.card) || "");
        return {
          url: `events/`,
          method: "POST",
          body: formData,
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
      query: (body, id) => {
        return {
          url: `events/${id}`,
          method: "PUT",
          body,
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
