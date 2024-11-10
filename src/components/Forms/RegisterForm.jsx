import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const RegisterForm = ({ onRegister, error }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, fullName, password);
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
          label="Nombre completo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
