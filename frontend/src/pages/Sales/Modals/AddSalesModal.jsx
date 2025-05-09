import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddSalesModal.css";

function AddSalesModal({ onClose, onAdded }) {
    const [produtos, setProdutos] = useState([]);
    const [clientName, setClientName] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3333/products")
            .then((res) => setProdutos(res.data))
            .catch((err) => console.error("Erro ao carregar produtos", err));
    }, []);

    const adicionarItem = () => {
        setSelectedItems([...selectedItems, { product_id: "", qty_total: 1, unit_price: 0 }]);
    };

    const atualizarItem = (index, key, value) => {
        const updated = [...selectedItems];
        updated[index][key] = value;
        setSelectedItems(updated);
    };

    const enviarVenda = () => {
        setErrorMessage("");  // Resetando as mensagens de erro antes da nova validação

        // Validação dos campos obrigatórios
        if (clientName.trim() === "") {
            setErrorMessage("O nome do cliente é obrigatório.");
            return;
        }
        if (paymentMethod.trim() === "") {
            setErrorMessage("O método de pagamento é obrigatório.");
            return;
        }
        if (selectedItems.length === 0) {
            setErrorMessage("Adicione ao menos um produto.");
            return;
        }
        if (selectedItems.some((item) => item.product_id === "")) {
            setErrorMessage("Todos os produtos devem estar selecionados.");
            return;
        }

        // Envio da venda
        axios.post("http://localhost:3333/sales", {
            customer_name: clientName,
            payment_method: paymentMethod,
            items: selectedItems,
        })
            .then(() => {
                onAdded();
                onClose();
            })
            .catch((err) => {
                console.error("Erro ao adicionar venda", err);
                setErrorMessage("Erro ao adicionar venda.");
            });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Nova Venda</h3>

                <label>Cliente:</label>
                <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Nome do cliente"
                />

                <label>Método de Pagamento:</label>
                <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Ex: Dinheiro, Cartão"
                />

                <h4>Produtos:</h4>
                {selectedItems.map((item, index) => (
                    <div key={index} className="item-group">
                        <select
                            value={item.product_id}
                            onChange={(e) => atualizarItem(index, "product_id", e.target.value)}
                        >
                            <option value="">Selecione um produto</option>
                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.id}>{produto.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={item.qty_total}
                            onChange={(e) =>
                                atualizarItem(index, "qty_total", Math.max(1, parseInt(e.target.value) || 1))
                            }
                            min={1}
                        />
                        <input
                            type="number"
                            value={item.unit_price}
                            onChange={(e) =>
                                atualizarItem(index, "unit_price", Math.max(0, parseFloat(e.target.value) || 0))
                            }
                            min={0}
                            step="0.01"
                        />
                    </div>
                ))}

                <button className="button-addItem" onClick={adicionarItem}>Adicionar Produto</button>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="modal-buttons">
                    <button className="save-btn" onClick={enviarVenda}>Salvar Venda</button>
                    <button className="cancel-btn" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default AddSalesModal;
