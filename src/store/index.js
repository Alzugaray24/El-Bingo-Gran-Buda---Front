// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import gameReducer from "./slices/gameSlice";
import authReducer from "./slices/authSlice";

const gamePersistConfig = {
  key: "game",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const store = configureStore({
  reducer: {
    game: persistReducer(gamePersistConfig, gameReducer),
    auth: persistReducer(authPersistConfig, authReducer),
  },
});

const persistor = persistStore(store);

export { persistor };
export default store;
