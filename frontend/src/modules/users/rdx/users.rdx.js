import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userRex",
  initialState: {
    currentUser: {},
    loggedIn: false,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = { ...action.payload };
      state.loggedIn = true;
    },

    logout(state, action) {
      state.currentUser = {};
      state.loggedIn = false;
    },
  },
});

export const rdxUserActions = userSlice.actions;
export const userReducer = userSlice.reducer;
