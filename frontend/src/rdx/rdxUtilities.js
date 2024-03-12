import { apiUrl } from "../env";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const getBaseQuery = function () {
  const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.currentUser.accessToken
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  })
  return baseQuery;
}
