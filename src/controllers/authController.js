// src/controllers/authController.js
import { login, register } from "../services/authService";

const authController = {
  login: async (email, password) => {
    try {
      // Suponiendo que el backend devuelve { token, user, userId }
      const { token, user, userId } = await login(email, password);

      // Retornamos el token, el user y el userId
      return { token, user, userId };
    } catch (error) {
      throw new Error("Credenciales incorrectas");
    }
  },

  register: async (email, fullName, password) => {
    try {
      const { token, user } = await register(email, fullName, password); // Llamada al servicio de registro
      return { token, user };
    } catch (error) {
      throw new Error("Hubo un error en el registro. Intenta de nuevo.");
    }
  },
};

export default authController;
