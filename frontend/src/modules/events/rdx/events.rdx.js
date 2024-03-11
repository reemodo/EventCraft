import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "eventRdx",
  initialState: {
    selectedEvent: {},
    isEditingEventCard: false,
    editedCardItemType: "",
  },
  reducers: {
    setSelectedEvent(state, action) {
      state.selectedEvent = { ...action.payload };
    },

    setEditedCardItemType(state, action) {
      state.editedCardItemType = action.payload;
    },

    setIsEditingEventCard(state, action) {
      state.isEditingEventCard = action.payload;
      state.editedCardItemType = undefined;
    },

    resetSelectedEvent(state, action) {
      state.selectedEvent = {};
    },
  },
});

export const rdxEventsActions = eventSlice.actions;
export const eventsReducer = eventSlice.reducer;
