import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSockets } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

const BingoCard = ({ player, gameId, userId }) => {
  const { card, markedBalls } = player;
  const { markBall, checkWinCondition, endGame } = useSockets();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const isBallMarked = (number) => markedBalls.includes(number);

  const handleMarkBall = (number) => {
    if (!isBallMarked(number)) {
      markBall(gameId, userId, number)
        .then(() => {
          console.log(`Bola ${number} marcada exitosamente.`);
        })
        .catch((error) => {
          setErrorMessage(error);
          setOpenSnackbar(true);
        });
    }
  };

  const handleBingo = () => {
    checkWinCondition(gameId, userId)
      .then((result) => {
        if (result.winner) {
          setDialogMessage("¡Felicidades! Has ganado el Bingo.");
          setOpenDialog(true);

          endGame(gameId)
            .then(() => {
              console.log("aca perro");
              navigate("/home");
            })
            .catch((error) => {
              console.error("Error al finalizar el juego:", error);
            });
        } else {
          setDialogMessage(
            "Lo siento, no cumples con las reglas del juego. Descalificado."
          );
          setOpenDialog(true);
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error al verificar el Bingo:", error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
                    borderRadius: "50%",
                    boxShadow: 1,
                    "&:hover": {
                      backgroundColor: isBallMarked(number)
                        ? "darkgreen"
                        : "lightgray",
                    },
                  }}
                  onClick={() => handleMarkBall(number)}
                >
                  {number}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Resultado del Juego</DialogTitle>
        <DialogContent>
          <Typography variant="h6" color="text.primary" align="center">
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BingoCard;
