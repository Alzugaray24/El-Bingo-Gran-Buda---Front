import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, setAuthError } from "../store/slices/authSlice";
import { resetGames } from "../store/slices/gameSlice";
import authController from "../controllers/authController";
import LoginForm from "../components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const { token, userId } = await authController.login(email, password);

      // Guardar el token en localStorage
      localStorage.setItem("token", token);

      // Guardar los datos del usuario en Redux
      dispatch(setAuthData({ token, userId }));

      navigate("/home");
    } catch (err) {
      setError(err.message);
      dispatch(setAuthError(err.message));
    }
  };

  // Función para resetear los juegos
  const handleResetGames = () => {
    dispatch(resetGames());
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} error={error} />
      {/* <Button
        variant="outlined"
        size="small"
        onClick={handleResetGames}
        style={{ marginTop: "10px" }}
      >
        Reset Juegos
      </Button> */}
    </div>
  );
};

export default LoginPage;
