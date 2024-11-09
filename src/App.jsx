import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard"; // Supongamos que tienes una página de dashboard

function App() {
  return (
    <Router>
      <CssBaseline />{" "}
      {/* Este componente restablece los estilos predeterminados del navegador */}
      {/* Flexbox para centrar el contenido */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // 100% de la altura de la ventana del navegador
      >
        <Container maxWidth="sm">
          {" "}
          {/* Container para limitar el ancho */}
          <Routes>
            {/* Ruta para la página de login */}
            <Route path="/" element={<LoginPage />} />

            {/* Ruta para la página de dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Ruta para cualquier otra página que no se haya definido, muestra 404 */}
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
