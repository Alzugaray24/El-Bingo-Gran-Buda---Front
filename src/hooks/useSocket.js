import { useDispatch } from "react-redux";
import io from "socket.io-client";
import React from "react";
import { setGames, setCurrentGame, addGame } from "../store/slices/gameSlice";

const socket = io("http://localhost:8080");

export const useSockets = () => {
  const dispatch = useDispatch();

  // Obtener la lista de juegos activos
  const getGames = () => {
    socket.emit("viewGames");
    socket.on("gamesList", (games) => {
      dispatch(setGames(games));
    });
  };

  // Función para unirse a un juego
  const joinGame = (gameId, userId) => {
    return new Promise((resolve, reject) => {
      // Enviar solicitud para unirse a un juego
      socket.emit("joinGame", gameId, userId);

      // Escuchar el evento "gameJoined" para recibir la confirmación de que el jugador se unió
      socket.on("gameJoined", (game) => {
        if (game) {
          dispatch(setCurrentGame(game)); // Establecer el juego actual
          resolve(true); // Resuelve la promesa indicando éxito
        } else {
          reject("No se pudo unir al juego"); // Rechaza la promesa si no se pudo unir
        }
      });

      // Escuchar un posible error en el servidor (opcional, pero recomendable)
      socket.on("joinError", (error) => {
        reject(error); // Rechazar la promesa con el mensaje de error
      });
    });
  };

  // Función para crear un nuevo juego
  const createGame = () => {
    socket.emit("createGame");
    socket.on("gameCreated", (game) => {
      dispatch(addGame(game));
    });
  };

  React.useEffect(() => {
    getGames();
    return () => socket.disconnect();
  }, []);

  return {
    getGames,
    joinGame,
    createGame,
  };
};
