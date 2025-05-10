import React, { useEffect, useState } from "react";
import axios from "axios";
import FadeInWrapper from "../../components/Effects/FadeInWrapper";
import { FaInfoCircle } from "react-icons/fa";
import "./Products.css";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import EditProductModal from "./Modals/EditProductModal";
import SeeMore from "../../components/Buttons/SeeMore/SeeMore";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import AddProductModal from "./Modals/AddProductModal";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import { toast, ToastContainer } from 'react-toastify';


function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [readOnly, setReadOnly] = useState(false);
    const [modalAdicionar, setModalAdicionar] = useState(false);

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
        setProdutoSelecionado(produto);
        setModalEditar(true);
    };

    const abrirModalVisualizar = (produto) => {
        setProdutoSelecionado(produto);
        setReadOnly(true);
        setModalEditar(true);
    };

    const fecharModalEditar = () => {
        setModalEditar(false);
        setProdutoSelecionado(null);
        setReadOnly(false);
    };

    const handleDeleteProduto = async (id) => {
        const confirmacao = window.confirm("Tem certeza que deseja deletar este produto?");
        if (!confirmacao) return;

        try {
            await axios.delete(`http://localhost:3333/products/${id}`);
            fetchProdutos();
            toast.success("Produto deletado com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Erro ao tentar deletar o produto.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const formatarPreco = (valor) => {
        const precoNumerico = parseFloat(valor);
        if (isNaN(precoNumerico)) {
            return "R$ 0,00";
        }

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(precoNumerico);
    };

    return (
        <div className="produtos-container">
            <h2>Produtos</h2>

            <div className="adicionar-wrapper">
                <AddButton onClick={() => setModalAdicionar(true)} tooltip="Adicionar Produto" />
            </div>

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
                                <span data-label="Preço">{formatarPreco(produto.price)}</span>
                                <span data-label="Ações" className="acoes-coluna">
                                    <EditButton onClick={() => abrirModalEditar(produto)} tooltip="Editar Produto" />
                                    <SeeMore icon={FaInfoCircle} onClick={() => abrirModalVisualizar(produto)} tooltip="Ver Produto" />
                                    <DeleteButton onClick={() => handleDeleteProduto(produto.id)} tooltip="Deletar Produto" />
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

            {modalAdicionar && (
                <AddProductModal
                    onClose={() => setModalAdicionar(false)}
                    onAdd={fetchProdutos}
                />
            )}
            <ToastContainer />
        </div>
    );
}

export default Produtos;
