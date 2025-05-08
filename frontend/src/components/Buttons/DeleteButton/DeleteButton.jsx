import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import "./DeleteButton.css";

function DeleteButton({ onClick, tooltip }) {
    return (
        <div className="delete-button-wrapper">
            <motion.button
                className="delete-button"
                onClick={onClick}
                whileHover={{ scale: 1.2, color: "#8B0000" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <FaTrash />
            </motion.button>
            <span className="delete-tooltip">{tooltip}</span>
        </div>
    );
}

export default DeleteButton;
