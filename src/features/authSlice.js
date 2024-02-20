import { createSlice } from '@reduxjs/toolkit';
import { loginApi, signupApi } from '../apis/api';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('authToken') || null,
    isLoggedIn: false,
    // signupStatus:null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('authToken',action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

// for login
export const loginAsync = (email, password) => async (dispatch) => {
  try {
    const user = await loginApi(email, password);
    if (user) {
      dispatch(setToken(user.token));
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

// for signup
export const signupAsync = (userData) => async () => {
  try {
    const user = await signupApi(userData);
    if (user) {
      return user;
    } else {
      console.error('Signup failed');
      return null;
    }
  } catch (error) {
    console.error('Error during signup:', error);
  }
};

export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
