import { createApi } from "@reduxjs/toolkit/query/react";

import { apiUrl } from "../../../../env";
import { getBaseQuery } from "../../../../rdx/rdxUtilities";

const eventCardApi = createApi({
  reducerPath: "eventCardApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getEventCard: builder.query({
      query: (id) => ({
        url: `cards/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetEventCardQuery } = eventCardApi;
