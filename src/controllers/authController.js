// src/controllers/authController.js
import { login } from "../services/authService";

const authController = {
  login: async (email, password) => {
    try {
      const { token, user } = await login(email, password);
      return { token, user };
    } catch (error) {
      throw new Error("Credenciales incorrectas");
    }
  },
};

export default authController;
