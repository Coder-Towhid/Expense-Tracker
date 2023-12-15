import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext"
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
