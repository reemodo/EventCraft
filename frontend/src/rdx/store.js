import { configureStore } from "@reduxjs/toolkit";

import { eventApi } from "../modules/events/api/events.api";
import { eventReducer } from "../modules/events/rdx/events.rdx";
import { userReducer } from "../modules/users/rdx/users.rdx";
import { userApi } from "../modules/users/api/user.api";
import { externalApi } from "../modules/shared/apis/external.api";

const setupStore = () => {
  return configureStore({
    reducer: {
      // states
      events: eventReducer,
      user: userReducer,
      //api

      [eventApi.reducerPath]: eventApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [externalApi.reducerPath]: externalApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        eventApi.middleware,
        userApi.middleware,
        externalApi.middleware,
      ]),
  });
};

const store = setupStore();

export { store };
