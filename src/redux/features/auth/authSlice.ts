import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../constants/types';

type AuthStateType = {
  user: User | null;
  token: string | null;
};

const initialState: AuthStateType = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
