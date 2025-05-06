import React, { useEffect, useState } from "react";
import "./Compras.css";

function Compras() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/compras")
            .then((res) => res.json())
            .then((data) => setCompras(data))
            .catch((err) => console.error("Erro ao buscar compras:", err));
    }, []);

    return (
        <div className="compras-container">
            <h2>Área de Compras</h2>
            <div className="compras-grid">
                <div className="grid-header">
                    <span>ID</span>
                    <span>Produto</span>
                    <span>Quantidade</span>
                    <span>Data</span>
                    <span>Fornecedor</span>
                </div>
                {compras.map((compra) => (
                    <div key={compra.id} className="grid-row">
                        <span data-label="ID">{compra.id}</span>
                        <span data-label="Produto">{compra.produto}</span>
                        <span data-label="Quantidade">{compra.quantidade}</span>
                        <span data-label="Data">{new Date(compra.data).toLocaleDateString()}</span>
                        <span data-label="Fornecedor">{compra.fornecedor}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Compras;
