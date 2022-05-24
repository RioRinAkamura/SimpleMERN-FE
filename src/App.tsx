import React from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import About from "./components/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

