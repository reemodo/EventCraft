import { configureStore } from "@reduxjs/toolkit";

import { eventApi } from "../modules/events/api/events.api";
import { eventsReducer } from "../modules/events/rdx/events.rdx";
import { userReducer } from "../modules/users/rdx/users.rdx";
import { userApi } from "../modules/users/api/user.api";
import { externalApi } from "../modules/shared/apis/external.api";
import { eventCardApi } from "../modules/events/card/api/eventCard.api";
import { cardItemApi } from "../modules/events/card/api/cardItem.api";

const setupStore = () => {
  return configureStore({
    reducer: {
      // states
      events: eventsReducer,
      user: userReducer,
      //api

      [eventApi.reducerPath]: eventApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [externalApi.reducerPath]: externalApi.reducer,
      [eventCardApi.reducerPath]: eventCardApi.reducer,
      [cardItemApi.reducerPath]: cardItemApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        eventApi.middleware,
        userApi.middleware,
        externalApi.middleware,
        eventCardApi.middleware,
        cardItemApi.middleware,
      ]),
  });
};

const store = setupStore();

export { store };
