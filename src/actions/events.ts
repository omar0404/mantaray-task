import {events} from '../api';
import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

export const getEvents = createAsyncThunk(
  'events/fetchEvents',
  events.getEvents,
);

export const updateEvent = createAction('events/updateEvent', (id, event) => ({
  payload: {id, event},
}));
