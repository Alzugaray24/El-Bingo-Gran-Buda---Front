// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./game/Home";
import GameDetail from "./game/GameDetail";
import { useSelector } from "react-redux";

function App() {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <Router>
      <CssBaseline />{" "}
      {/* Este componente restablece los estilos predeterminados del navegador */}
      {/* Flexbox para centrar el contenido */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Container maxWidth="sm">
          <Routes>
            {/* Ruta para la página de login */}
            <Route path="/login" element={<LoginPage />} />
            {/* Ruta para la página de registro */}
            <Route path="/register" element={<RegisterPage />} />
            {/* Ruta para la página de inicio */}
            <Route path="/home" element={<Home />} />
            {/* Ruta para la partida */}
            <Route
              path="/game/:gameId"
              element={<GameDetail userId={userId} />}
            />
            {/* Ruta 404 */}
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
