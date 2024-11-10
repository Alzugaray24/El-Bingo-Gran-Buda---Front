// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Reemplaza con tu URL de backend

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response);
  return response.data;
};

// Función de register
export const register = async (email, fullName, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    fullName,
    password,
  });
  return response.data;
};
