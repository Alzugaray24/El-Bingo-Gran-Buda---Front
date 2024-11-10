import React, { useState } from "react";
import { Box, Typography, Chip, Button, CircularProgress } from "@mui/material";
import { useSockets } from "../../hooks/useSocket";

const DrawnBalls = ({ game }) => {
  const { drawBall } = useSockets(); // Accedemos a la función drawBall desde el hook
  const { drawnBalls, _id } = game; // Extraemos las bolas sorteadas y el gameId
  const [loading, setLoading] = useState(false); // Estado para manejar la carga mientras se sortea una bola

  const handleDrawBall = async () => {
    setLoading(true); // Establecemos el estado de carga en true
    try {
      await drawBall(_id); // Llamamos a la función drawBall para sortear la bola
      setLoading(false); // Desactivamos el estado de carga al completar la acción
    } catch (error) {
      console.error("Error al sortear la bola:", error);
      setLoading(false); // Desactivamos el estado de carga en caso de error
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Bolas Sorteadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
        }}
      >
        {drawnBalls.length > 0 ? (
          drawnBalls.map((ball, index) => (
            <Chip
              key={index}
              label={ball}
              color="primary"
              sx={{ fontSize: 14 }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Aún no se han sorteado bolas.
          </Typography>
        )}
      </Box>

      {/* Botón para sortear una bola */}
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDrawBall}
          disabled={loading} // Deshabilitar el botón mientras se está sorteando una bola
        >
          {loading ? (
            <CircularProgress size={24} color="secondary" /> // Mostrar un spinner mientras se espera la respuesta
          ) : (
            "Sortea una Bola"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default DrawnBalls;
