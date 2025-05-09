import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Purchases.css";
import EditPurchaseModal from "./Modals/EditPurchaseModal";
import EditButton from "../../components/Buttons/EditButton/EditButton";
import SeeMore from "../../components/Buttons/SeeMore/SeeMore";
import DeleteButton from "../../components/Buttons/DeleteButton/DeleteButton";
import { FaInfoCircle, FaEdit } from "react-icons/fa";

function Compras() {
    const [compras, setCompras] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [itensCompra, setItensCompra] = useState([]);
    const [editCompra, setEditCompra] = useState(null);
    const [abrirEditar, setAbrirEditar] = useState(false);
    const [compraSelecionada, setCompraSelecionada] = useState(null);

    const fetchCompras = async () => {
        try {
            const response = await axios.get("http://localhost:3333/purchases");
            setCompras(response.data);
        } catch (error) {
            console.error("Erro ao buscar compras:", error);
        }
    };

    useEffect(() => {
        fetchCompras();
    }, []);

    const abrirModal = (compra) => {
        setItensCompra(compra.items || []);
        setCompraSelecionada(compra);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setItensCompra([]);
        setCompraSelecionada(null);
    };
    const deletarCompra = async (id) => {
        const confirm = window.confirm("Tem certeza que deseja deletar esta compra?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3333/purchases/${id}`);
            alert("Compra deletada com sucesso!");
            fetchCompras();
        } catch (error) {
            console.error("Erro ao deletar compra:", error);
            alert("Erro ao deletar compra.");
        }
    };

    const abrirEditarCompra = (compra) => {
        setEditCompra(compra);
        setAbrirEditar(true);
    };

    return (
        <div className="compras-container">
            <h2>Área de Compras</h2>
            <div className="compras-grid">
                <div className="grid-header">
                    <span>Fornecedor</span>
                    <span>Pagamento</span>
                    <span>Data</span>
                    <span>Total</span>
                    <span>Ações</span>
                </div>
                {compras.map((compra) => (
                    <div key={compra.id} className="grid-row">
                        <span data-label="Fornecedor">{compra.supplier_name || "N/A"}</span>
                        <span data-label="Pagamento">{compra.payment_method || "N/A"}</span>
                        <span data-label="Data">
                            {compra.created_at ? new Date(compra.created_at).toLocaleDateString("pt-BR") : "N/A"}
                        </span>
                        <span data-label="Total">
                            {(compra.items?.reduce((acc, item) => acc + item.qty_total * item.unit_price, 0) || 0)
                                .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                        <span data-label="Ações">
                            <div className="action-buttons">
                                <EditButton icon={FaEdit} onClick={() => abrirEditarCompra(compra)} tooltip="Editar Compra" />
                                <SeeMore icon={FaInfoCircle} onClick={() => abrirModal(compra)} tooltip="Ver Compra" />
                                <DeleteButton onClick={() => deletarCompra(compra.id)} tooltip="Deletar Compra" />                            </div>
                        </span>
                    </div>
                ))}
            </div>

            {abrirEditar && (
                <EditPurchaseModal
                    compra={editCompra}
                    onClose={() => setAbrirEditar(false)}
                    onUpdated={fetchCompras}
                />
            )}

            {modalOpen && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Detalhes da Compra</h3>

                        <div className="compra-info">
                            <p><strong>Fornecedor:</strong> {compraSelecionada?.supplier_name || "N/A"}</p>
                            <p><strong>Pagamento:</strong> {compraSelecionada?.payment_method || "N/A"}</p>
                            <p><strong>Data de Criação:</strong> {compraSelecionada?.created_at ? new Date(compraSelecionada.created_at).toLocaleString("pt-BR") : "N/A"}</p>
                            <p><strong>Última Atualização:</strong> {compraSelecionada?.updated_at ? new Date(compraSelecionada.updated_at).toLocaleString("pt-BR") : "N/A"}</p>
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
                                {itensCompra.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product?.name || "N/A"}</td>
                                        <td>{item.product?.description || "Sem descrição"}</td>
                                        <td>{item.qty_total}</td>
                                        <td>{Number(item.unit_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                        <td>{(item.qty_total * item.unit_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan="4"><strong>Total da Compra</strong></td>
                                    <td>
                                        <strong>
                                            {itensCompra.reduce((acc, item) => acc + item.qty_total * item.unit_price, 0)
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

export default Compras;
