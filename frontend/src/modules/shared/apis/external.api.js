import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../env";

export const externalApi = createApi({
  reducerPath: "externalApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: ({ search }) => ({
        url: `external/api/photos`,
        method: "GET",
        params: { search },
      }),
    }),
    getShapes: builder.query({
      query: ({ search }) => ({
        url: `external/api/shapes`,
        method: "GET",
        params: { search },
      }),
    }),
  }),
});

export const {
  useLazyGetPhotosQuery, //
  useGetPhotosQuery,
  useLazyGetShapesQuery,
} = externalApi;
