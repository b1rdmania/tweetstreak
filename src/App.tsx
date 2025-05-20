import { Suspense, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginScreen from "./components/LoginScreen";
import routes from "tempo-routes";
import { ActivityProvider } from "./context/ActivityContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("twitterActivityLoggedIn") === "true";
  });

  const handleLogin = () => {
    // In a real app, this would authenticate with Twitter
    // For the MVP, we'll just set a flag in localStorage
    localStorage.setItem("twitterActivityLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem("twitterActivityLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <ActivityProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home
                    userName="Demo User"
                    userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=demo"
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginScreen onLogin={handleLogin} />
                )
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ActivityProvider>
  );
}

export default App;
