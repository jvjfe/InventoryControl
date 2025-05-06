import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sales.css";
import SeeMore from "../../components/Buttons/SeeMore/SeeMore";
import { FaInfoCircle } from "react-icons/fa";

function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [itensVenda, setItensVenda] = useState([]);

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await axios.get("http://localhost:3333/sales");
                setVendas(response.data);
            } catch (error) {
                console.error("Erro ao buscar vendas:", error);
            }
        };

        fetchVendas();
    }, []);

    const abrirModal = (itens) => {
        setItensVenda(itens);
        setModalOpen(true);
    };

    const fecharModal = () => {
        setModalOpen(false);
        setItensVenda([]);
    };

    return (
        <div className="compras-container">
            <h2>Área de Vendas</h2>
            <div className="compras-grid">
                <div className="grid-header">
                    <span>Cliente</span>
                    <span>Pagamento</span>
                    <span>Data</span>
                    <span>Ações</span>
                </div>
                {vendas.map((venda) => (
                    <div key={venda.id} className="grid-row">
                        <span data-label="Cliente">{venda.customer_name}</span>
                        <span data-label="Pagamento">{venda.payment_method}</span>
                        <span data-label="Data">{new Date(venda.created_at).toLocaleDateString()}</span>
                        <span data-label="Ações">
                        <SeeMore icon={FaInfoCircle} onClick={() => abrirModal(venda.items)} tooltip="Ver Itens" />
                        </span>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Itens Vendidos</h3>
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
                                {itensVenda.map((item, index) => (
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

export default Vendas;
