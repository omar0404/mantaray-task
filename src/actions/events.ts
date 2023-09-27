import {events} from '../api';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getEvents = createAsyncThunk(
  'evets/fetchEvents',
  events.getEvents,
);
