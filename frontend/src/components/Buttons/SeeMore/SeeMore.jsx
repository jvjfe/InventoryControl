import React from "react";
import { motion } from "framer-motion";
import "./SeeMore.css";

function SeeMore({ icon: Icon, onClick, tooltip }) {
    return (
        <div className="see-more-wrapper">
            <motion.button
                className="see-more-btn"
                onClick={onClick}
                whileHover={{ scale: 1.2, color: "#004aad" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Icon />
            </motion.button>
            <span className="see-more-tooltip">{tooltip}</span>
        </div>
    );
}

export default SeeMore;
