import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Para redirigir al login

const RegisterForm = ({ onRegister, error }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, fullName, password);
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <Box
      maxWidth="400px"
      margin="auto"
      padding={4}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Typography variant="h5" gutterBottom align="center">
        Crear cuenta
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrarse
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="body2">
              ¿Ya tienes cuenta?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={handleLoginRedirect}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterForm;
