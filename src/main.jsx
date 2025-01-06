import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/request/pickup-part-import" />} />
        <Route path="/system-request/dashboard" element={<Dashboard />} />
        <Route path="/request/pickup-part-import" element={<Request />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
