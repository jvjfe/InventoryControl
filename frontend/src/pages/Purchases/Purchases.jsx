import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Purchases.css";
import SeeMore from "../../components/Buttons/SeeMore/SeeMore";
import { FaInfoCircle } from "react-icons/fa";

function Compras() {
    const [compras, setCompras] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [itensCompra, setItensCompra] = useState([]);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await axios.get("http://localhost:3333/purchases");
                setCompras(response.data);
            } catch (error) {
                console.error("Erro ao buscar compras:", error);
            }
        };

        fetchCompras();
    }, []);

    const abrirModal = (itens) => {
        setItensCompra(itens);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setItensCompra([]);
    };

    return (
        <div className="compras-container">
            <h2>Área de Compras</h2>
            <div className="compras-grid">
                <div className="grid-header">
                    <span>Fornecedor</span>
                    <span>Pagamento</span>
                    <span>Data</span>
                    <span>Ações</span>
                </div>
                {compras.map((compra) => (
                    <div key={compra.id} className="grid-row">
                        <span data-label="Fornecedor">{compra.supplier_name}</span>
                        <span data-label="Pagamento">{compra.payment_method}</span>
                        <span data-label="Data">{new Date(compra.created_at).toLocaleDateString()}</span>
                        <span data-label="Ações">
                        <SeeMore icon={FaInfoCircle} onClick={() => abrirModal(compra.items)} tooltip="Ver Itens" />
                        </span>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Itens Comprados</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Descrição</th>
                                    <th>Quantidade</th>
                                    <th>Preço Unitário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensCompra.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product?.name || "N/A"}</td>
                                        <td>{item.product?.description || "Sem descrição"}</td>
                                        <td>{item.qty_total}</td>
                                        <td>R$ {Number(item.unit_price).toFixed(2)}</td>
                                    </tr>
                                ))}
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
