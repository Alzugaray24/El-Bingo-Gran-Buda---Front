import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CountdownTimer from "./CountdownTimer"; // Asumiendo que tienes un componente de cuenta regresiva

const Lobby = ({
  gameStatus,
  isGameStarted,
  countdown,
  players,
  totalBalls,
  drawnBalls,
  handleStartGame,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Mostrar el estado del juego */}
      <Typography variant="h5" color="text.primary" gutterBottom>
        {gameStatus === "esperando"
          ? "Esperando a que se unan jugadores..."
          : "¡El juego está en espera!"}
      </Typography>

      {/* Mostrar jugadores */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6" color="text.primary">
          Jugadores ({players.length} / 1){" "}
          {/* Ejemplo, cambiar el 4 por el límite real de jugadores */}
        </Typography>
        {players.map((player) => (
          <Typography
            key={player.userId}
            variant="body1"
            color="text.secondary"
          >
            {player.userId}
          </Typography>
        ))}
      </Box>

      {/* Si el juego no ha comenzado, mostrar el tiempo de cuenta regresiva y el botón para iniciar */}
      {!isGameStarted ? (
        <>
          {countdown > 0 ? (
            <CountdownTimer countdown={countdown} />
          ) : (
            <Typography variant="h6" color="text.secondary" gutterBottom>
              El juego comenzará pronto...
            </Typography>
          )}
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartGame}
              disabled={isGameStarted} // Desactivar si el juego ya ha comenzado o no hay suficientes jugadores
            >
              {isGameStarted ? "Juego en curso" : "Iniciar juego"}
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            {`Total de bolas: ${totalBalls}`}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom>
            {`Bolas sorteadas: ${drawnBalls.length}`}
          </Typography>
        </Box>
      )}

      {/* Si el juego no está en curso, mostrar un spinner de carga */}
      {gameStatus === "esperando" && !isGameStarted && (
        <CircularProgress sx={{ marginTop: 3 }} />
      )}
    </Box>
  );
};

export default Lobby;
