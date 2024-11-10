// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthError } from "../store/slices/authSlice";
import authController from "../controllers/authController";
import RegisterForm from "../components/Forms/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (email, fullName, password) => {
    try {
      await authController.register(email, fullName, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      dispatch(setAuthError(err.message));
    }
  };

  return <RegisterForm onRegister={handleRegister} error={error} />;
};

export default RegisterPage;
