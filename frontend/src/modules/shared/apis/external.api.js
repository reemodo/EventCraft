import { createApi } from "@reduxjs/toolkit/query/react";

import { getBaseQuery } from "../../../rdx/rdxUtilities";

export const externalApi = createApi({
  reducerPath: "externalApi",
  baseQuery: getBaseQuery(),
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
