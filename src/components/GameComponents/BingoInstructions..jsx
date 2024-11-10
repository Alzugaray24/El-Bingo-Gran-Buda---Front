import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const BingoInstructions = () => {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        component="h1"
        color="text.primary"
        sx={{ fontWeight: "bold", marginBottom: 3 }}
      >
        ¿Cómo ganar en el Bingo?
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        sx={{ marginBottom: 4 }}
      >
        Existen varias formas de ganar en el Bingo. Aquí te mostramos todas las
        formas posibles para que puedas estar preparado.
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              1. Fila Completa
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Marca todos los números en una fila de tu tarjeta de Bingo. Cuando
              consigas completar una fila horizontal, ¡habrás ganado!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <CheckCircle color="primary" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              2. Columna Completa
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Marca todos los números en una columna de tu tarjeta de Bingo.
              Cuando consigas completar una columna vertical, ¡habrás ganado!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <CheckCircle color="primary" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              3. Diagonal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Marca todos los números en una diagonal de tu tarjeta de Bingo.
              Una vez que completes una diagonal, ¡serás el ganador!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <CheckCircle color="primary" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              4. Esquinas
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Marca las cuatro esquinas de tu tarjeta de Bingo. Si logras
              completar las esquinas, ¡ganarás el juego!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <CheckCircle color="primary" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              padding: 3,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              5. Antidiagonal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Marca todos los números en la antidiagonal de tu tarjeta de Bingo.
              Cuando completes esta línea, ¡serás el ganador!
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <CheckCircle color="primary" />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        sx={{ marginTop: 4 }}
      >
        Recuerda, para ganar debes marcar todas las casillas de cualquiera de
        estas formas. ¡Mucha suerte!
      </Typography>
    </Box>
  );
};

export default BingoInstructions;
