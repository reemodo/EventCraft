import { createApi } from "@reduxjs/toolkit/query/react";

import { apiUrl } from "../../../../env";
import { getBaseQuery } from "../../../../rdx/rdxUtilities";

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

    updateEventCard: builder.query({
      query: (body) => {
        return {
          url: `cards/${body.id}`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const { useLazyGetEventCardQuery } = eventCardApi;
