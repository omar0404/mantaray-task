import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {User} from '../types';
import {clearUser, getUser, login, signup} from '../actions/user';

type state = {isLoading: boolean; error: string; user: User | null};
const initialState: state = {
  isLoading: true,
  user: null,
  error: '',
};

export const userSlice = createSlice<state, {}, 'user'>({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(clearUser, () => {
      return {isLoading: false, user: null, error: ''};
    });
    builder.addCase(getUser.rejected, () => {
      return {isLoading: false, user: null, error: ''};
    });
    builder.addMatcher(
      isAnyOf(login.fulfilled, signup.fulfilled, getUser.fulfilled),
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
