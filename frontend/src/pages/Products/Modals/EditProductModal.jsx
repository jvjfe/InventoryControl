import React, { useState } from "react";
import "./EditProductModal.css";
import axios from "axios";

function EditProductModal({ product, onClose, onUpdate, readOnly }) {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        status: product.status === "Ativo" ? "Ativo" : "Inativo",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleStatus = () => {
        if (!readOnly) {
            setFormData(prev => ({
                ...prev,
                status: prev.status === "Ativo" ? "Inativo" : "Ativo"
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3333/products/${product.id}`, formData);
            onUpdate(); // Atualiza a lista principal
            onClose();  // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>{readOnly ? "Visualizar Produto" : "Editar Produto"}</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={readOnly}
                        />
                    </label>

                    <label>
                        Descrição:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            disabled={readOnly}
                        />
                    </label>

                    <label>
                        Estoque:
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            disabled={readOnly}
                        />
                    </label>

                    <label>
                        Preço:
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            disabled={readOnly}
                        />
                    </label>

                    <div className="status-toggle">
                        <span>Status:</span>
                        <button
                            type="button"
                            className={formData.status === "Ativo" ? "status-btn ativo" : "status-btn inativo"}
                            onClick={toggleStatus}
                            disabled={readOnly}
                        >
                            {formData.status}
                        </button>
                    </div>

                    <div className="modal-actions">
                        {!readOnly && (
                            <button type="submit" className="salvar-btn">Salvar</button>
                        )}
                        <button type="button" onClick={onClose} className="cancelar-btn">
                            {readOnly ? "Fechar" : "Cancelar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;
