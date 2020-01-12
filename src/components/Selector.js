import React from "react";
import Select from "react-select";
import { primary, secondary, font } from "../data/theme.json";

const white = styles => ({ ...styles, color: font });

const selectStyles = {
  control: styles => ({
    ...styles,
    border: "none",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: "3rem"
  }),
  valueContainer: styles => ({
    ...styles,
    padding: ".5rem 1rem",
    fontWeight: 800
  }),
  input: white,
  clearIndicator: white,
  indicatorSeparator: white,
  dropdownIndicator: white,
  singleValue: white,
  placeholder: styles => ({
    ...styles,
    color: "#ccc",
    fontWeight: 300
  }),
  menu: styles => ({
    ...styles,
    zIndex: 998,
    backgroundColor: primary
  }),
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    zIndex: 999,
    backgroundColor: isSelected || isFocused ? primary : secondary
  })
};

const Selector = props => (
  <Select
    placeholder="Select a building..."
    hideSelectedOptions={false}
    isClearable
    styles={selectStyles}
    {...props}
  />
);

export default Selector;
