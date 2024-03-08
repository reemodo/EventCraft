import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "eventRex",
  initialState: {
    selectedEvent: {},
  },
  reducers: {
    setSelectedEvent(state, action) {
      console.log(action.payload)
      state.selectedEvent = {...action.payload};
      console.log(state.selectedEvent)
    },
  },
});

export const rdxSitesActions = eventSlice.actions;
export const eventReducer = eventSlice.reducer;