import {createSlice} from '@reduxjs/toolkit';
import {getEvents} from '../actions/events';
import {Event} from '../types';

type state = {isLoading: boolean; events: Event[]};

const initialState: state = {isLoading: false, events: []};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEvents.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    });
    builder.addCase(getEvents.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default eventsSlice.reducer;
