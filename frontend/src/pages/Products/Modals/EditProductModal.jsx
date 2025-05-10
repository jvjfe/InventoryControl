import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./EditProductModal.css";
import axios from "axios";

const modalVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
};

const modalTransition = {
    type: "tween",
    duration: 0.5,
};

function EditProductModal({ product, onClose, onUpdate, readOnly }) {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        status: product.status === "Ativo" ? "Ativo" : "Inativo",
    });
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                onClose(); // Fechar o modal após o fade-out
            }, 500); // Tempo de duração do fade-out
        }
    }, [isClosing, onClose]);

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
            onUpdate();
            setIsClosing(true);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    return (
        <motion.div
            className="modal-overlay"
            initial="initial"
            animate={isClosing ? "out" : "in"} // Mudar para "out" quando o modal for fechado
            exit="out"
            variants={modalVariants}
            transition={modalTransition}
            onClick={() => setIsClosing(true)} // Fechar o modal ao clicar no fundo
        >
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

                    {/* Campos extras somente no modo readOnly */}
                    {readOnly && (
                        <div className="extra-info">
                            <label>
                                ID:
                                <input type="text" value={product.id} disabled />
                            </label>
                            <label>
                                Criado em:
                                <input type="text" value={new Date(product.created_at).toLocaleString()} disabled />
                            </label>
                            <label>
                                Atualizado em:
                                <input type="text" value={new Date(product.updated_at).toLocaleString()} disabled />
                            </label>
                        </div>
                    )}

                    <div className="modal-actions">
                        {!readOnly && (
                            <button type="submit" className="salvar-btn">Salvar</button>
                        )}
                        <button type="button" onClick={() => setIsClosing(true)} className="cancelar-btn">
                            {readOnly ? "Fechar" : "Cancelar"}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default EditProductModal;
