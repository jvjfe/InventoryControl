import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const modalVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
};

const modalTransition = {
    type: "tween",
    duration: 0.5,
};

function AddProductModal({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: 0,
        price: 0,
        status: "Ativo",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleStatus = () => {
        setFormData((prev) => ({
            ...prev,
            status: prev.status === "Ativo" ? "Inativo" : "Ativo",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            stock: parseInt(formData.stock),
            price: parseFloat(formData.price),
        };

        if (isNaN(payload.stock) || isNaN(payload.price)) {
            alert("Estoque e preço devem ser números válidos!");
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post("http://localhost:3333/products", payload);
            onAdd(); // Atualiza a lista de produtos após adicionar
            onClose(); // Fecha o modal após salvar
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className="modal-overlay"
            initial="initial"
            animate="in"
            exit="out"
            variants={modalVariants}
            transition={modalTransition}
            onClick={() => onClose()}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Adicionar Produto</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Descrição:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
                        />
                    </label>

                    <div className="status-toggle">
                        <span>Status:</span>
                        <button
                            type="button"
                            className={`status-btn ${formData.status.toLowerCase()}`}
                            onClick={toggleStatus}
                        >
                            {formData.status}
                        </button>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="salvar-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Salvando..." : "Salvar"}
                        </button>
                        <button
                            type="button"
                            className="cancelar-btn"
                            onClick={() => onClose()}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default AddProductModal;
