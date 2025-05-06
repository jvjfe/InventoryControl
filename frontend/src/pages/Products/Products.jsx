import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

function Produtos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://localhost:3333/Products/");
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div className="produtos-container">
            <h2>Área de Produtos</h2>
            <div className="produtos-grid">
                <div className="grid-header">
                    <span>Nome</span>
                    <span>Descrição</span>
                    <span>Status</span>
                    <span>Estoque</span>
                    <span>Preço</span>
                </div>
                {produtos.map((produto) => (
                    <div key={produto.id} className="grid-row">
                        <span data-label="Nome">{produto.name}</span>
                        <span data-label="Descrição">{produto.description}</span>
                        <span data-label="Status">{produto.status}</span>
                        <span data-label="Estoque">{produto.stock}</span>
                        <span data-label="Preço">R$ {Number(produto.price).toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Produtos;
