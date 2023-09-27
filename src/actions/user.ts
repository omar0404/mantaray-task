import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {auth} from '../api';

export const clearUser = createAction('user/clearUser');

export const login = createAsyncThunk(
  'login',
  async (values: {email: string; password: string}) => auth.login(values),
);

export const signup = createAsyncThunk(
  'signup',
  async (values: {name: string; email: string; password: string}) =>
    auth.signup(values),
);
export const getUser = createAsyncThunk('getUser', auth.getUser);
