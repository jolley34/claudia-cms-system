import Cookies from "js-cookie";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import api from "./services/api";
import { GlobalStyles } from "./styles/GlobalStyles";
import { GoogleUser } from "./types/types";

function App() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  const handleLoginSuccess = (userData: GoogleUser) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    Cookies.remove("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <AppRoutes
          user={user}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
        />
      </Router>
    </div>
  );
}

export default App;
