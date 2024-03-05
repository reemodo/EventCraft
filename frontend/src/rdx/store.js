import { configureStore } from "@reduxjs/toolkit";

import { eventApi } from "../modules/events/api/events.api";
import { eventReducer } from "../modules/events/rdx/events.rdx";

const setupStore = () => {
  return configureStore({
    reducer: {
      // states
      events: eventReducer,
      //api

      [eventApi.reducerPath]: eventApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([eventApi.middleware]),
  });
};

const store = setupStore();

export { store };
