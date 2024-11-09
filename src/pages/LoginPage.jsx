// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, setAuthError } from "../store/slices/authSlice";
import authController from "../controllers/authController";
import LoginForm from "../components/Forms/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log("hola");

  const handleLogin = async (email, password) => {
    try {
      const { token, user } = await authController.login(email, password);
      dispatch(setAuthData({ token, user }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      dispatch(setAuthError(err.message));
    }
  };

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return <LoginForm onLogin={handleLogin} error={error} />;
};

export default LoginPage;
