// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import authReducer from "./slices/authSlice"; // Asegúrate de importar authSlice

const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
  },
});

export default store;
