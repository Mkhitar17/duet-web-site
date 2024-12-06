import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

export default function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
  customStyles = {}, 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
      style={customStyles}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired, 
  onClick: PropTypes.func, 
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool, 
  customStyles: PropTypes.object, 
};

Button.defaultProps = {
  onClick: () => {},
  type: "button",
  disabled: false,
  customStyles: {},
};
