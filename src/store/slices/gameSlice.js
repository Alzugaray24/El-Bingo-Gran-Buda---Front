// src/store/slices/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [], // Aquí podrías agregar la lógica de tu tablero de Bingo
  calledNumbers: [],
  isGameActive: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameActive = true;
      state.board = generateBoard(); // Esta función debería generar el tablero de bingo
    },
    stopGame: (state) => {
      state.isGameActive = false;
      state.board = [];
      state.calledNumbers = [];
    },
    callNumber: (state, action) => {
      state.calledNumbers.push(action.payload);
    },
  },
});

export const { startGame, stopGame, callNumber } = gameSlice.actions;

export default gameSlice.reducer;

function generateBoard() {
  // Lógica para generar el tablero de bingo
  return Array(25)
    .fill(null)
    .map(() => Math.floor(Math.random() * 75) + 1);
}
