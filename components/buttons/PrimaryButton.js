import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

export default function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
  customStyles = {}, // For inline styling if needed
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

// Define PropTypes for type-checking
Button.propTypes = {
  text: PropTypes.string.isRequired, // Button text
  onClick: PropTypes.func, // Click handler function
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Button type
  disabled: PropTypes.bool, // Disable button
  customStyles: PropTypes.object, // Inline styles for extra customization
};

// Default Props
Button.defaultProps = {
  onClick: () => {},
  type: "button",
  disabled: false,
  customStyles: {},
};
