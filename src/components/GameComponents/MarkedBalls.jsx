import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const MarkedBalls = ({ player }) => {
  const { markedBalls } = player;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Bolas Marcadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
        }}
      >
        {markedBalls.length > 0 ? (
          markedBalls.map((ball, index) => (
            <Chip
              key={index}
              label={ball}
              color="success"
              sx={{ fontSize: 14 }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Aún no has marcado bolas.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MarkedBalls;
