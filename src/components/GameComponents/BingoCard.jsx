import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSockets } from "../../hooks/useSocket";

const BingoCard = ({ player, gameId, userId }) => {
  const { card, markedBalls } = player;
  const { markBall, checkWinCondition } = useSockets(); // Traemos la función checkWinCondition

  // Función para determinar si un número está marcado
  const isBallMarked = (number) => markedBalls.includes(number);

  // Función para marcar una bola
  const handleMarkBall = (number) => {
    if (!isBallMarked(number)) {
      markBall(gameId, userId, number) // Llamada a la función markBall del hook
        .then(() => {
          console.log(`Bola ${number} marcada exitosamente.`);
        })
        .catch((error) => {
          console.error("Error al marcar la bola:", error);
        });
    }
  };

  // Función para manejar la verificación de BINGO
  const handleBingo = () => {
    checkWinCondition(gameId, userId) // Llamada a la función checkWinCondition para verificar si el jugador ha ganado
      .then((result) => {
        if (result) {
          alert("¡Felicidades! Has ganado el Bingo.");
        } else {
          alert("Lo siento, aún no has ganado. Sigue jugando.");
        }
      })
      .catch((error) => {
        console.error("Error al verificar el Bingo:", error);
      });
  };

  return (
    <Box sx={{ width: 500, textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Tu tarjeta de Bingo
      </Typography>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        {card.map((row, rowIndex) => (
          <Grid
            container
            item
            spacing={1}
            justifyContent="center"
            key={rowIndex}
          >
            {row.map((number) => (
              <Grid item key={number}>
                <Button
                  variant="outlined"
                  sx={{
                    width: 40,
                    height: 40,
                    fontSize: 14,
                    backgroundColor: isBallMarked(number)
                      ? "green"
                      : "transparent",
                    color: isBallMarked(number) ? "white" : "black",
                    borderRadius: "50%", // Hace los botones circulares
                    boxShadow: 1, // Agrega una sombra leve para mejorar la apariencia
                    "&:hover": {
                      backgroundColor: isBallMarked(number)
                        ? "darkgreen"
                        : "lightgray",
                    },
                  }}
                  onClick={() => handleMarkBall(number)} // Llamada a handleMarkBall
                >
                  {number}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Botón BINGO estilizado */}
      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "12px 24px",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 3,
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "green",
              boxShadow: 6,
            },
          }}
          onClick={handleBingo}
        >
          BINGO
        </Button>
      </Box>
    </Box>
  );
};

export default BingoCard;
