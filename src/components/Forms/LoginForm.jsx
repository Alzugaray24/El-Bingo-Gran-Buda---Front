import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Box
      maxWidth="400px"
      margin="auto"
      padding={2}
      borderRadius={1}
      boxShadow={3}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
