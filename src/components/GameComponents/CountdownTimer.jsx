import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

const CountdownTimer = ({ countdown }) => {
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    // Si el tiempo de cuenta regresiva es mayor que 0, configurar un temporizador
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // Disminuir el tiempo restante en 1 cada segundo
      }, 1000);

      // Limpiar el intervalo cuando el componente se desmonte o cuando el tiempo llegue a 0
      return () => clearInterval(timer);
    }

    // Si el tiempo llega a 0, ya no hay más cuenta regresiva
    return () => {};
  }, [timeLeft]);

  // Formatear el tiempo en minutos y segundos
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" color="text.primary">
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Tiempo restante
      </Typography>
    </Box>
  );
};

export default CountdownTimer;
