import React from "react";
import classnames from "classnames";
import "./checkbox.css";
import { motion } from "framer-motion";

const Checkbox = ({ label, isChecked, disabled, onCheck }) => {
  const toggle = e => onCheck(!isChecked);

  let classes = classnames("checkbox", {
    "is-checked": isChecked,
    "is-disabled": disabled
  });
  return (
    <motion.div whileTap={{ scale: 0.8 }} className={classes}>
      <label>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          disabled={disabled}
          onChange={toggle}
        />
        {label}
      </label>
    </motion.div>
  );
};

export default Checkbox;
