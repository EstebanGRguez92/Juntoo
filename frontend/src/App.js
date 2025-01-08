import React from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginRegister from "./pages/LoginRegister";
import Activities from "./pages/Activities";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <LoginRegister /> },
    {
      path: "/activities",
      element: (
        <ProtectedRoute>
          <Activities />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div>
      <NavBar />
      {routes}
    </div>
  );
};

export default App;
