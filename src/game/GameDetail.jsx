import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSockets } from "../hooks/useSocket";
import { setGameStatus } from "../store/slices/gameSlice";
import BingoCard from "../components/GameComponents/BingoCard";
import MarkedBalls from "../components/GameComponents/MarkedBalls";
import DrawnBalls from "../components/GameComponents/DrawnBalls";
import Lobby from "../components/GameComponents/Lobby";
import BingoInstructions from "../components/GameComponents/BingoInstructions."; // Importar el componente

const GameDetail = ({ userId }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { gameId } = useParams();
  const { startGame } = useSockets();
  const dispatch = useDispatch();

  const game = useSelector((state) => state.game.currentGame);

  console.log(game);

  if (!game) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const { players, gameStatus } = game;
  const player = players.find((player) => player.userId === userId);

  console.log(userId);

  const handleStartGame = async () => {
    try {
      const success = await startGame(gameId);
      if (success) {
        setIsGameStarted(true);
        dispatch(setGameStatus("en curso"));
      }
    } catch (error) {
      console.error("Error al iniciar el juego:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        borderRadius: 4,
        boxShadow: 5,
        maxWidth: 500,
        margin: "auto",
        background: "linear-gradient(to right, #2196F3, #64B5F6)",
      }}
    >
      {gameStatus === "en curso" && player ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 4,
            width: "100%",
          }}
        >
          <Typography variant="h5" color="text.primary" gutterBottom>
            Bingo 75
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <BingoCard player={player} gameId={gameId} userId={userId} />
          </Box>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <MarkedBalls player={player} />
            <DrawnBalls game={game} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Lobby
            gameStatus={gameStatus}
            isGameStarted={isGameStarted}
            countdown={game.countdown}
            players={players}
            totalBalls={game.totalBalls}
            drawnBalls={game.drawnBalls}
            handleStartGame={handleStartGame}
          />
        </Box>
      )}
    </Box>
  );
};

export default GameDetail;
