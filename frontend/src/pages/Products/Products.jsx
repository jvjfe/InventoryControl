import React, { useEffect, useState } from "react";
import axios from "axios";
import FadeInWrapper from "../../components/Effects/FadeInWrapper";
import { FaInfoCircle } from "react-icons/fa";
import "./Products.css";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import EditProductModal from "./Modals/EditProductModal";
import SeeMore from "../../components/Buttons/SeeMore/SeeMore";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [readOnly, setReadOnly] = useState(false); // novo estado

    const fetchProdutos = async () => {
        try {
            const response = await axios.get("http://localhost:3333/Products/");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const abrirModalEditar = (produto) => {
        const produtoComStockInt = {
            ...produto,
            stock: parseInt(produto.stock, 10)
        };
        setReadOnly(false); // modo edição
        setProdutoSelecionado(produtoComStockInt);
        setModalEditar(true);
    };

    const abrirModalVisualizar = (produto) => {
        const produtoComStockInt = {
            ...produto,
            stock: parseInt(produto.stock, 10)
        };
        setReadOnly(true); // modo visualização
        setProdutoSelecionado(produtoComStockInt);
        setModalEditar(true);
    };

    const fecharModalEditar = () => {
        setModalEditar(false);
        setProdutoSelecionado(null);
        setReadOnly(false);
    };

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
                    <span>Ações</span>
                </div>
                {produtos.map((produto, i) => (
                <React.Fragment key={produto.id}>
                    <FadeInWrapper key={produto.id} delay={i * 0.05}>
                        <div className="grid-row">
                            <span data-label="Nome">{produto.name}</span>
                            <span data-label="Descrição">{produto.description}</span>
                            <span data-label="Status">{produto.status}</span>
                            <span data-label="Estoque">{produto.stock}</span>
                            <span data-label="Preço">R$ {Number(produto.price).toFixed(2)}</span>
                            <span data-label="Ações" className="acoes-coluna">
                                <EditButton onClick={() => abrirModalEditar(produto)} tooltip="Editar Produto" />    
                                <SeeMore icon={FaInfoCircle} onClick={() => abrirModalVisualizar(produto)} tooltip="Ver Produto" />
                            </span>
                        </div>
                    </FadeInWrapper>
                </React.Fragment>
            ))}

            </div>

            {modalEditar && produtoSelecionado && (
                <EditProductModal
                    product={produtoSelecionado}
                    onClose={fecharModalEditar}
                    onUpdate={fetchProdutos}
                    readOnly={readOnly}
                />
            )}
        </div>
    );
}

export default Produtos;
