import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditSalesModal.css";
import DeleteButton from "../../../components/Buttons/DeleteButton/DeleteButton";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditSaleModal({ venda, onClose, onUpdated }) {
    const [customerName, setCustomerName] = useState(venda.customer_name);
    const [paymentMethod, setPaymentMethod] = useState(venda.payment_method);
    const [items, setItems] = useState(venda.items);
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

        if (venda) {
            fetchProducts();
            setCustomerName(venda.customer_name);
            setPaymentMethod(venda.payment_method);
            setItems(venda.items);
        }
    }, [venda]);

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];

        if (field === "qty_total") {
            const productId = updatedItems[index].product_id;
            const product = products.find((p) => p.id === productId);
            const numericValue = Number(value);

            if (numericValue < 1) {
                toast.error("Quantidade mínima é 1");
                return;
            }

            if (product) {
                const originalItem = venda.items.find((vItem) => vItem.product_id === productId);
                const originalQty = originalItem ? originalItem.qty_total : 0;
                const difference = numericValue - originalQty;

                if (difference > product.stock) {
                    toast.error(`Estoque insuficiente de ${product.name}. Máximo disponível: ${product.stock + originalQty}`);
                    return;
                }
            }

            updatedItems[index][field] = numericValue;
        } else {
            updatedItems[index][field] = value;
        }

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
        for (const item of items) {
            const product = products.find((prod) => prod.id === item.product_id);
            const originalItem = venda.items.find((vItem) => vItem.product_id === item.product_id);
            const originalQty = originalItem ? originalItem.qty_total : 0;
            const newQty = Number(item.qty_total);
            const difference = newQty - originalQty;

            if (product && difference > product.stock) {
                toast.error(`Estoque insuficiente para ${product.name}. Disponível: ${product.stock}, Tentando adicionar: ${difference}`);
                return;
            }
        }

        try {
            const payload = {
                customer_name: customerName,
                payment_method: paymentMethod,
                items: items.map(item => ({
                    product_id: item.product_id,
                    qty_total: Number(item.qty_total),
                    unit_price: Number(item.unit_price),
                })),
            };

            await axios.put(`http://localhost:3333/sales/${venda.id}`, payload);
            onClose();
            onUpdated();
            toast.success("Venda atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar venda:", error);
            toast.error("Erro ao atualizar a venda.");
        }
    };

    return (
        <div className="edit-sale-modal-overlay" onClick={onClose}>
            <div className="edit-sale-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Venda</h2>

                <form className="edit-sale-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <label>
                        Cliente:
                        <input
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                        />
                    </label>

                    <label>
                        Método de Pagamento:
                        <input
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </label>

                    <div className="sale-items-section">
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
                                            <DeleteButton type="button" onClick={() => handleRemoveItem(index)} tooltip="Deletar Item" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={handleAddItem}>Adicionar Item</button>
                    </div>

                    <button className="salvar-btn" type="submit">Salvar</button>
                </form>
            </div>

            {/* ToastContainer precisa estar presente no componente para renderizar as notificações */}
            <ToastContainer />
        </div>
    );
}

export default EditSaleModal;
