// src/components/FadeInWrapper.jsx
import { motion } from "framer-motion";

const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const fadeInTransition = {
    duration: 0.4,
    ease: "easeOut",
};

export default function FadeInWrapper({ children, delay = 0 }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ ...fadeInTransition, delay }}
        >
            {children}
        </motion.div>
    );
}
