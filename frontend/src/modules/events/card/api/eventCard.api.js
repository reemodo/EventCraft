import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { apiUrl } from "../../../../env";

const eventCardApi = createApi({
  reducerPath: "eventCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
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
