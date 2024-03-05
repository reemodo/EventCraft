import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "eventRex",
  initialState: {
    selectedEvent: { name: "asad" },
  },
  reducers: {
    setSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    },
  },
});

export const rdxSitesActions = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
