import { configureStore } from "@reduxjs/toolkit";

import { eventApi } from "../modules/events/api/events.api";
import { eventReducer } from "../modules/events/rdx/events.rdx";
import { userReducer } from "../modules/users/rdx/users.rdx";
import { userApi } from "../modules/events/api/user.api";

const setupStore = () => {
  return configureStore({
    reducer: {
      // states
      events: eventReducer,
      user: userReducer,
      //api

      [eventApi.reducerPath]: eventApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([eventApi.middleware, userApi.middleware]),
  });
};

const store = setupStore();

export { store };
