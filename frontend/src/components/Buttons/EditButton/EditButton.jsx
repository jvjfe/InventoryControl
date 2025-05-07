import React from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import "./EditButton.css";

function EditButton({ onClick, tooltip }) {
    return (
        <div className="edit-button-wrapper">
            <motion.button
                className="edit-button"
                onClick={onClick}
                whileHover={{ scale: 1.2, color: "#006400" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <FaEdit />
            </motion.button>
            <span className="edit-tooltip">{tooltip}</span>
        </div>
    );
}

export default EditButton;
