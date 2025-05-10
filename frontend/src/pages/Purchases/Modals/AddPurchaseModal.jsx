import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddPurchaseModal.css";
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";

function AddPurchaseModal({ onClose, onCreated }) {
    const [fornecedor, setFornecedor] = useState("");
    const [pagamento, setPagamento] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://localhost:3333/products");
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProdutos();
    }, []);

    const adicionarItem = () => {
        setItens([...itens, { product_id: "", qty_total: 1, unit_price: 0 }]);
    };

    const atualizarItem = (index, campo, valor) => {
        const novosItens = [...itens];
        novosItens[index][campo] = valor;
        setItens(novosItens);
    };

    const removerItem = (index) => {
        const novosItens = itens.filter((_, i) => i !== index);
        setItens(novosItens);
    };

    const criarCompra = async () => {
        // Validação dos campos de Fornecedor e Pagamento
        if (!fornecedor.trim() || !pagamento.trim()) {
            alert("Por favor, preencha os campos de Fornecedor e Pagamento.");
            return;
        }

        // Verifica se ao menos um item foi adicionado
        if (itens.length === 0) {
            alert("Adicione pelo menos um item à compra.");
            return;
        }

        // Validação de cada item
        for (let i = 0; i < itens.length; i++) {
            const item = itens[i];
            if (!item.product_id) {
                alert(`Selecione um produto para o item ${i + 1}.`);
                return;
            }
            if (!item.qty_total || item.qty_total < 1) {
                alert(`Verifique a quantidade do item ${i + 1}.`);
                return;
            }
            if (item.unit_price === null || item.unit_price < 0) {
                alert(`Verifique o preço unitário do item ${i + 1}.`);
                return;
            }
        }

        try {
            await axios.post("http://localhost:3333/purchases", {
                supplier_name: fornecedor,
                payment_method: pagamento,
                items: itens
            });
            alert("Compra criada com sucesso!");
            onCreated();
            onClose();
        } catch (error) {
            console.error("Erro ao criar compra:", error);
            alert("Erro ao criar compra.");
        }
    };

    return (
        <div className="edit-purchase-modal-overlay" onClick={onClose}>
            <div className="edit-purchase-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Nova Compra</h2>
                <form className="edit-purchase-form">
                    <label>
                        Fornecedor:
                        <input
                            value={fornecedor}
                            onChange={(e) => setFornecedor(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Pagamento:
                        <input
                            value={pagamento}
                            onChange={(e) => setPagamento(e.target.value)}
                            required
                        />
                    </label>

                    <div className="purchase-items-section">
                        <h3>Itens</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Preço Unitário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itens.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select
                                                value={item.product_id}
                                                onChange={(e) =>
                                                    atualizarItem(index, "product_id", e.target.value)
                                                }
                                                required
                                            >
                                                <option value="">Selecione o Produto</option>
                                                {produtos.map((p) => (
                                                    <option key={p.id} value={p.id}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.qty_total}
                                                onChange={(e) =>
                                                    atualizarItem(index, "qty_total", parseInt(e.target.value, 10))
                                                }
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={item.unit_price}
                                                onChange={(e) =>
                                                    atualizarItem(index, "unit_price", parseFloat(e.target.value))
                                                }
                                                required
                                            />
                                        </td>
                                        <td>
                                            <DeleteButton
                                                type="button"
                                                className="cancel-btn"
                                                onClick={() => removerItem(index)}
                                                tooltip="Deletar Compra"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            className="button-addItem"
                            onClick={adicionarItem}
                        >
                            Adicionar Item
                        </button>
                    </div>

                    <div className="modal-buttons">
                        <button type="button" className="save-btn" onClick={criarCompra}>
                            Salvar Compra
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPurchaseModal;
