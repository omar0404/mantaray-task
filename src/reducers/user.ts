import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {User} from '../types';
import {clearUser} from '../actions/user';
import {auth} from '../api';

type state = {isLoading: boolean; error: string; user: User | null};
const initialState: state = {
  isLoading: false,
  user: null,
  error: '',
};

export const login = createAsyncThunk(
  'login',
  async (values: {email: string; password: string}) => auth.login(values),
);
export const signup = createAsyncThunk(
  'signup',
  async (values: {name: string; email: string; password: string}) =>
    auth.signup(values),
);
export const userSlice = createSlice<state, {}, 'user'>({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(clearUser, () => {
      return {isLoading: false, user: null, error: ''};
    });
    builder.addMatcher(
      isAnyOf(login.fulfilled, signup.fulfilled),
      (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      },
    );
    builder.addMatcher(
      isAnyOf(login.rejected, signup.rejected),
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? '';
      },
    );
  },
});

export default userSlice.reducer;
