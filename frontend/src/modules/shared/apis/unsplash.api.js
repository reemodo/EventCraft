import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../../env";

export const unsplashApi = createApi({
  reducerPath: "unsplashApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: ({ search }) => ({
        url: `unSplash/api/photos`,
        method: "GET",
        params: { search },
      }),
    }),
  }),
});

export const {
  useLazyGetPhotosQuery, //
  useGetPhotosQuery,
} = unsplashApi;
