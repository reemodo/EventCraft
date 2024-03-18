import { createApi } from "@reduxjs/toolkit/query/react";

import { getBaseQuery } from "../../../../rdx/rdxUtilities";
import { cardFormData } from "../card.utils";

export const eventCardApi = createApi({
  reducerPath: "eventCardApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getEventCard: builder.query({
      query: (id) => ({
        url: `cards/${id}`,
        method: "GET",
      }),
    }),

    updateEventCard: builder.mutation({
      query: (body) => {
        const formData = cardFormData(body);

        return {
          url: `cards/${body._id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const { useLazyGetEventCardQuery, useUpdateEventCardMutation } =
  eventCardApi;
