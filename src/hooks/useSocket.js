import { useDispatch } from "react-redux";
import io from "socket.io-client";
import React from "react";
import { setGames, setCurrentGame, addGame } from "../store/slices/gameSlice";

const socket = io("http://localhost:8080");

export const useSockets = () => {
  const dispatch = useDispatch();

  // Obtener todos los juegos
  const getGames = () => {
    socket.emit("viewGames");
    socket.on("gamesList", (games) => {
      dispatch(setGames(games));
    });
  };

  // Unirse a un juego
  const joinGame = (gameId, userId) => {
    return new Promise((resolve, reject) => {
      socket.emit("joinGame", gameId, userId);

      socket.on("gameJoined", (game) => {
        if (game) {
          dispatch(setCurrentGame(game));
          resolve(true);
        } else {
          reject("No se pudo unir al juego");
        }
      });

      socket.on("joinError", (error) => {
        reject(error);
      });
    });
  };

  // Crear un juego
  const createGame = () => {
    socket.emit("createGame");
    socket.on("gameCreated", (game) => {
      dispatch(addGame(game));
    });
  };

  // Iniciar el juego
  const startGame = (gameId) => {
    return new Promise((resolve, reject) => {
      console.log("click");
      socket.emit("startGame", gameId);

      socket.on("gameStarted", (game) => {
        console.log("el nuevo juego", game);
        dispatch(setCurrentGame(game)); // Actualizamos el estado del juego en Redux
        resolve(true); // Resolvemos la promesa si el juego comenzó correctamente
        socket.off("gameStarted"); // Limpiamos el listener después de la respuesta
        socket.off("error"); // Limpiamos el listener de error también
      });

      socket.on("error", (errorMessage) => {
        console.error("Error al iniciar el juego:", errorMessage);
        reject(errorMessage); // Rechazamos la promesa en caso de error
        socket.off("gameStarted"); // Limpiamos el listener de éxito también
        socket.off("error"); // Limpiamos el listener después de la respuesta
      });
    });
  };

  // Función para tirar una bola
  const drawBall = (gameId) => {
    return new Promise((resolve, reject) => {
      console.log("dentr", gameId);
      socket.emit("drawBall", gameId); // Emite el evento para sortear una bola

      // Funciones de éxito y error
      const onBallDrawn = ({ newBall, game }) => {
        console.log("Bola sorteada:", newBall);
        dispatch(setCurrentGame(game)); // Actualizamos el estado del juego en Redux
        resolve({ newBall, game }); // Resolvemos la promesa con los datos de la bola sorteada y el juego
      };

      const onError = (errorMessage) => {
        console.error("Error al sortear la bola:", errorMessage);
        reject(errorMessage); // Rechazamos la promesa en caso de error
      };

      // Usamos socket.once para que se ejecute solo una vez
      socket.once("ballDrawn", onBallDrawn);
      socket.once("error", onError);

      // Limpiamos los listeners al completar la promesa (por seguridad)
      // `once` se encargará de eliminarlos después de ejecutarse
    });
  };

  // Función para marcar una bola
  const markBall = (gameId, userId, ballNumber) => {
    return new Promise((resolve, reject) => {
      console.log("clickkkk");
      console.log(gameId, userId, ballNumber);
      // Emitimos el evento para marcar la bola al servidor
      socket.emit("markBall", gameId, userId, ballNumber);

      // Manejamos la respuesta del servidor
      socket.on("ballMarked", (game) => {
        // Cuando el servidor confirma que la bola fue marcada
        console.log("Bola marcada correctamente:", game);
        dispatch(setCurrentGame(game)); // Actualizamos el estado del juego en Redux
        resolve(game); // Resolvemos la promesa con los datos del juego actualizado
      });

      // Manejamos cualquier error que ocurra
      socket.on("error", (errorMessage) => {
        console.error("Error al marcar la bola:", errorMessage);
        reject(errorMessage); // Rechazamos la promesa si ocurre un error
      });
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
    startGame, // Exponemos la función para iniciar el juego
    drawBall, // Exponemos la función para tirar una bola
    markBall, // Exponemos la función para marcar una bola
  };
};
