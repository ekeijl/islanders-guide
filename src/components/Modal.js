import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./modal.css";
const variants = {
  enter: () => ({
    y: 0,
    opacity: 1
  }),
  exit: () => ({
    y: 50,
    opacity: 0
  })
};

const Modal = ({ show, onHide, children }) => (
  <AnimatePresence>
    {show && [
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key="shade"
        className="shade"
        onClick={onHide}
      />,
      <motion.div
        variants={variants}
        initial="exit"
        animate="enter"
        exit="exit"
        transition={{
          y: { type: "spring", stiffness: 1000, damping: 15, duration: 0.3 },
          opacity: { duration: 0.1 }
        }}
        key="modal"
        className="modal"
      >
        {children}
      </motion.div>
    ]}
  </AnimatePresence>
);

export default Modal;
