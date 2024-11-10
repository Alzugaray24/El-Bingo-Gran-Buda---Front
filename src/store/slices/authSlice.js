// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    userId: null, // Almacenamos el userId
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId; // Establecemos el userId
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null; // Limpiamos el userId
      state.isAuthenticated = false;
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAuthData, clearAuthData, setAuthError } = authSlice.actions;
export default authSlice.reducer;
