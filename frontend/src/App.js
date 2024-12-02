import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/Auth/privateRoute";

import "./reset.css";
import s from "./App.module.css";
import "./styles/fonts.css";

import Header from "./components/Header/Header";
import GameSolo from "./pages/GameSolo/GameSolo";

const App = () => {
  return (
    <Router>
      {" "}
      {/* Déplacement du Router ici */}
      <div className={s.root}>
        <Header />
        <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/gamesolo"
            element={
              <PrivateRoute>
                <GameSolo />
              </PrivateRoute>
            }
          />

         
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
