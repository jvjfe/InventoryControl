import React from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import "./AddButton.css";

function AddButton({ onClick, tooltip }) {
    return (
        <div className="add-button-wrapper">
            <motion.button
                className="add-button"
                onClick={onClick}
                whileHover={{ scale: 1.2, color: "#28a745" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <FaPlus />
            </motion.button>
            <span className="add-tooltip">{tooltip}</span>
        </div>
    );
}

export default AddButton;
