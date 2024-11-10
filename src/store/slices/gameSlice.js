import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [], // Lista de juegos activos
  currentGame: null, // Juego actual
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload; // Establece la lista de juegos
    },
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload; // Establece el juego actual
    },
    resetGames: (state) => {
      state.games = []; // Reinicia la lista de juegos a un arreglo vacío
    },
    addGame: (state, action) => {
      console.log("added");
      state.games.push(action.payload); // Agrega un nuevo juego a la lista
    },
  },
});

export const { setGames, setCurrentGame, resetGames, addGame } =
  gameSlice.actions;
export default gameSlice.reducer;
