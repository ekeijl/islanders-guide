import React from "react";
import { motion } from "framer-motion";
const Info = ({ value, title }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className="info"
  >
    <p>Base value: {value}</p>
    <p>{title}</p>
  </motion.div>
);

export default Info;
