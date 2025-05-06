import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Compras from "./pages/Purchases/Purchases.jsx";
import Vendas from "./pages/Sales/Sales.jsx";
import PageWrapper from "./components/Effects/PageWrapper.jsx";
import Produtos from "./pages/Products/Products.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/purchases" element={<PageWrapper><Compras /></PageWrapper>} />
        <Route path="/sales" element={<PageWrapper><Vendas /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Produtos /></PageWrapper>} />
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
            <Link to="/purchases">Compras</Link>
            <Link to="/sales">Vendas</Link>
            <Link to="/products">Produtos</Link>
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
