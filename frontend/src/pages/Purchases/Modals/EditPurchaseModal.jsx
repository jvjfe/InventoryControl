import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditPurchaseModal.css";
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";

function EditPurchaseModal({ compra, onClose, onUpdated }) {
    const [supplierName, setSupplierName] = useState(compra.supplier_name);
    const [paymentMethod, setPaymentMethod] = useState(compra.payment_method);
    const [items, setItems] = useState(compra.items);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3333/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        setItems([...items, { product_id: "", qty_total: 1, unit_price: 0 }]);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const handleSave = async () => {
        try {
            const payload = {
                supplier_name: supplierName,
                payment_method: paymentMethod,
                items: items.map(item => ({
                    product_id: item.product_id,
                    qty_total: Number(item.qty_total),
                    unit_price: Number(item.unit_price),
                })),
            };

            await axios.put(`http://localhost:3333/purchases/${compra.id}`, payload);
            onClose(); 
            onUpdated(); 
        } catch (error) {
            console.error("Erro ao atualizar compra:", error);
        }
    };

    return (
        <div className="edit-purchase-modal-overlay" onClick={onClose}>
            <div className="edit-purchase-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Compra</h2>

                <form className="edit-purchase-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <label>
                        Fornecedor:
                        <input
                            value={supplierName}
                            onChange={e => setSupplierName(e.target.value)}
                        />
                    </label>

                    <label>
                        Método de Pagamento:
                        <input
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </label>

                    <div className="purchase-items-section">
                        <h4>Itens:</h4>
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
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select
                                                value={item.product_id}
                                                onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
                                            >
                                                <option value="">Selecione</option>
                                                {products.map((prod) => (
                                                    <option key={prod.id} value={prod.id}>
                                                        {prod.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.qty_total}
                                                onChange={(e) => handleItemChange(index, "qty_total", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={item.unit_price}
                                                onChange={(e) => handleItemChange(index, "unit_price", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <DeleteButton type="button" onClick={() => handleRemoveItem(index)} tooltip="Deletar Compra"/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" className="button-addItem" onClick={handleAddItem}>Adicionar Item</button>
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">Salvar</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPurchaseModal;
