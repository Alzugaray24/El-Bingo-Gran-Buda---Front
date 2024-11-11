import { useDispatch } from "react-redux";
import io from "socket.io-client";
import React from "react";
import { setGames, setCurrentGame, addGame } from "../store/slices/gameSlice";

const socket = io("http://localhost:8080");

export const useSockets = () => {
  const dispatch = useDispatch();

  const getGames = () => {
    socket.emit("viewGames");
    socket.on("gamesList", (games) => {
      dispatch(setGames(games));
    });
  };

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

  const createGame = () => {
    socket.emit("createGame");
    socket.on("gameCreated", (game) => {
      dispatch(addGame(game));
    });
  };

  const startGame = (gameId) => {
    return new Promise((resolve, reject) => {
      console.log("click");
      socket.emit("startGame", gameId);

      socket.on("gameStarted", (game) => {
        console.log("el nuevo juego", game);
        dispatch(setCurrentGame(game));
        resolve(true);
        socket.off("gameStarted");
        socket.off("error");
      });

      socket.on("error", (errorMessage) => {
        console.error("Error al iniciar el juego:", errorMessage);
        reject(errorMessage);
        socket.off("gameStarted");
        socket.off("error");
      });
    });
  };

  const drawBall = (gameId) => {
    return new Promise((resolve, reject) => {
      console.log("dentr", gameId);
      socket.emit("drawBall", gameId);

      const onBallDrawn = ({ newBall, game }) => {
        console.log("Bola sorteada:", newBall);
        dispatch(setCurrentGame(game));
        resolve({ newBall, game });
      };

      const onError = (errorMessage) => {
        console.error("Error al sortear la bola:", errorMessage);
        reject(errorMessage);
      };

      socket.once("ballDrawn", onBallDrawn);
      socket.once("error", onError);
    });
  };

  const markBall = (gameId, userId, ballNumber) => {
    return new Promise((resolve, reject) => {
      console.log("clickkkk");
      console.log(gameId, userId, ballNumber);
      socket.emit("markBall", gameId, userId, ballNumber);

      socket.on("ballMarked", (game) => {
        console.log("Bola marcada correctamente:", game);
        dispatch(setCurrentGame(game));
        resolve(game);
      });

      socket.on("error", (errorMessage) => {
        console.error("Error al marcar la bola:", errorMessage);
        reject(errorMessage);
      });
    });
  };

  const checkWinCondition = (gameId, userId) => {
    return new Promise((resolve, reject) => {
      console.log("Verificando condición de victoria...");
      socket.emit("checkWinCondition", gameId, userId);

      socket.on("winConditionChecked", async (result) => {
        if (result.winner) {
          console.log("¡Has ganado!", result);
          dispatch(setCurrentGame(result.game));
          resolve(result);
        } else {
          console.log("Has sido descalificado");
          dispatch(setCurrentGame(result.game));
          resolve({
            message: "Descalificado, no cumples con la condición de victoria",
            result,
          });
        }
      });

      socket.on("error", (errorMessage) => {
        console.error(
          "Error al verificar la condición de victoria:",
          errorMessage
        );
        reject(errorMessage);
      });
    });
  };

  const endGame = (gameId, userId) => {
    return new Promise((resolve, reject) => {
      socket.emit("endGame", gameId, userId);

      socket.on("gameEnded", (result) => {
        if (result.success) {
          console.log("El juego ha terminado exitosamente");
          resolve(result);
        } else {
          console.error("Hubo un error al terminar el juego");
          reject("Error al terminar el juego");
        }
      });

      socket.on("error", (errorMessage) => {
        console.error("Error al terminar el juego:", errorMessage);
        reject(errorMessage);
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
    startGame,
    drawBall,
    markBall,
    checkWinCondition,
    endGame,
  };
};
