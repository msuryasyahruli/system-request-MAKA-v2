import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Delivery from "./pages/Delivery";
import Pickup from "./pages/Pickup";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/request" />} />
        <Route path="/system-request/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/request/pickup-part-import" element={<Pickup />} />
        <Route path="/request/delivery-part" element={<Delivery />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
