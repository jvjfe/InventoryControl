import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sales.css";
import FadeInWrapper from "../../components/Effects/FadeInWrapper";
import EditSaleModal from "./Modals/EditSalesModal";
import AddSalesModal from "./Modals/AddSalesModal";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import SeeMore from "../../components/Buttons/SeeMore/SeeMore";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import AddButton from "../../components/Buttons/AddButton/AddButton";
import { FaInfoCircle, FaEdit } from "react-icons/fa";

function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [itensVenda, setItensVenda] = useState([]);
    const [editVenda, setEditVenda] = useState(null);
    const [abrirEditar, setAbrirEditar] = useState(false);
    const [vendaSelecionada, setVendaSelecionada] = useState(null);

    const fetchVendas = async () => {
        try {
            const response = await axios.get("http://localhost:3333/sales");
            setVendas(response.data);
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
        }
    };

    useEffect(() => {
        fetchVendas();
    }, []);

    const abrirModal = (venda) => {
        setItensVenda(venda.items || []);
        setVendaSelecionada(venda);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setItensVenda([]);
        setVendaSelecionada(null);
    };

    const abrirEditarVenda = (venda) => {
        setEditVenda(venda);
        setAbrirEditar(true);
    };

    const deletarVenda = async (id) => {
        const confirm = window.confirm("Tem certeza que deseja deletar esta venda?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3333/sales/${id}`);
            alert("Venda deletada com sucesso!");
            fetchVendas();
        } catch (error) {
            console.error("Erro ao deletar venda:", error);
            alert("Erro ao deletar venda.");
        }
    };

    return (
        <div className="vendas-container">
            <h2>Área de Vendas</h2>
            <div className="adicionar-venda-btn" >
                <AddButton onClick={() => setAddModalOpen(true)} tooltip="Adicionar Venda" />
            </div>

            <div className="vendas-grid">
                <div className="grid-header">
                    <span>Cliente</span>
                    <span>Pagamento</span>
                    <span>Data</span>
                    <span>Total</span>
                    <span>Ações</span>
                </div>
                {vendas.map((venda, i) => (
                    <FadeInWrapper key={venda.id} delay={i * 0.05}>
                        <div key={venda.id} className="grid-row">
                            <span data-label="Cliente">{venda.customer_name || "N/A"}</span>
                            <span data-label="Pagamento">{venda.payment_method || "N/A"}</span>
                            <span data-label="Data">
                                {venda.created_at ? new Date(venda.created_at).toLocaleDateString("pt-BR") : "N/A"}
                            </span>
                            <span data-label="Total">
                                {(venda.items?.reduce((acc, item) => acc + item.qty_total * item.unit_price, 0) || 0)
                                    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                            <span data-label="Ações">
                                <div className="action-buttons">
                                    <EditButton icon={FaEdit} onClick={() => abrirEditarVenda(venda)} tooltip="Editar Venda" />
                                    <SeeMore icon={FaInfoCircle} onClick={() => abrirModal(venda)} tooltip="Ver Venda" />
                                    <DeleteButton onClick={() => deletarVenda(venda.id)} tooltip="Deletar Venda" /> {/* Botão de deletar */}
                                </div>
                            </span>
                        </div>
                    </FadeInWrapper>
                ))}
            </div>

            {abrirEditar && (
                <EditSaleModal
                    venda={editVenda}
                    onClose={() => setAbrirEditar(false)}
                    onUpdated={fetchVendas}
                />
            )}

            {addModalOpen && (
                <AddSalesModal
                    onClose={() => setAddModalOpen(false)}
                    onAdded={fetchVendas}
                />
            )}

            {modalOpen && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Itens Vendidos</h3>

                        <div className="venda-info">
                            <p><strong>Cliente:</strong> {vendaSelecionada?.customer_name || "N/A"}</p>
                            <p><strong>Pagamento:</strong> {vendaSelecionada?.payment_method || "N/A"}</p>
                            <p><strong>Data de Criação:</strong> {vendaSelecionada?.created_at ? new Date(vendaSelecionada.created_at).toLocaleString("pt-BR") : "N/A"}</p>
                            <p><strong>Última Atualização:</strong> {vendaSelecionada?.updated_at ? new Date(vendaSelecionada.updated_at).toLocaleString("pt-BR") : "N/A"}</p>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Descrição</th>
                                    <th>Quantidade</th>
                                    <th>Preço Unitário</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensVenda.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product?.name || "N/A"}</td>
                                        <td>{item.product?.description || "Sem descrição"}</td>
                                        <td>{item.qty_total}</td>
                                        <td>{Number(item.unit_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                        <td>{(item.qty_total * item.unit_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="4"><strong>Total da Venda</strong></td>
                                    <td>
                                        <strong>
                                            {itensVenda.reduce((acc, item) => acc + item.qty_total * item.unit_price, 0)
                                                .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button className="fechar-btn" onClick={fecharModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Vendas;
