import React from "react";
import { motion } from "framer-motion";

import "./button.css";

const Button = ({ type = "default", children, ...other }) => (
  <motion.button
    whileTap={{ scale: 0.8 }}
    className={"button-" + type}
    {...other}
  >
    {children}
  </motion.button>
);

export default Button;
