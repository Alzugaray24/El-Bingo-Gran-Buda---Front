// src/index.js (o src/main.jsx)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Importa PersistGate
import store, { persistor } from "./store/index.js"; // Importa persistor
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Espera a que se carguen los datos */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
