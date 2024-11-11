import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import { useSockets } from "../../hooks/useSocket";

const DrawnBalls = ({ game }) => {
  const { drawBall } = useSockets();
  const { drawnBalls, _id } = game;
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);

  const handleDrawBall = async () => {
    setLoading(true);
    try {
      await drawBall(_id);
      setLoading(false);
    } catch (error) {
      console.error("Error al sortear la bola:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        handleDrawBall();
        setTimeLeft(5);
      } else {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, _id]);

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

      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <Typography variant="h6" color="text.primary">
            Siguiente bola en: {timeLeft} segundos
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DrawnBalls;
