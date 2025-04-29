import React from 'react';

const Button = ({ onClick, icon, label, theme = 'light', disabled = false }) => {
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: theme === 'light' ? '#191970' : '#FF8C00',
    color: '#FFFFFF',
    border: 'none',
    margin: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      data-testid="button"
    >
      {icon && <span data-testid="button-icon">{icon}</span>}
      {label && <span data-testid="button-label">{label}</span>}
    </button>
  );
};

export default Button;