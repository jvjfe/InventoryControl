import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard";
import Compras from "./pages/Compras/Compras.js";
import Vendas from "./pages/Vendas";
import PageWrapper from "./components/PageWrapper.js";
import Produtos from "./pages/Produtos/Produtos.js";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/compras" element={<PageWrapper><Compras /></PageWrapper>} />
        <Route path="/vendas" element={<PageWrapper><Vendas /></PageWrapper>} />
        <Route path="/produtos" element={<PageWrapper><Produtos /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Controle de Estoque e Gestão</h1>
          <nav className="nav">
            <Link to="/">Dashboard</Link>
            <Link to="/compras">Compras</Link>
            <Link to="/vendas">Vendas</Link>
            <Link to="/produtos">Produtos</Link>
          </nav>
        </header>

        <main className="main">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
