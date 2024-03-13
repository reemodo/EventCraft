import { createApi } from "@reduxjs/toolkit/query/react";

import { getBaseQuery } from "../../../../rdx/rdxUtilities";

export const cardItemApi = createApi({
  reducerPath: "cardItemApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    addCardItem: builder.mutation({
      query: (body) => ({
        url: `items/${body.cardId}`,
        method: "Post",
        body,
      }),
    }),

    updateCardItem: builder.mutation({
      query: (body) => {
        return {
          url: `items/${body._id}`,
          method: "PUT",
          body,
        };
      },
    }),

    deleteCardItem: builder.mutation({
      query: ({ itemId, cardId }) => {
        return {
          url: `items/${cardId}/${itemId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddCardItemMutation,
  useDeleteCardItemMutation,
  useUpdateCardItemMutation,
} = cardItemApi;
