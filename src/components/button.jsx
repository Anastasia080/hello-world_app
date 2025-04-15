import React, {Children} from 'react';

// Компонент кнопки
const Button = ({ onClick, label,theme, disabled = false }) => {
  return (
    <button
      onClick={onClick} // Обработчик клика
      disabled={disabled} // Состояние кнопки (активна/неактивна)
      theme={theme}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: theme === 'light' ? '#191970' : '#FF8C00',
        color: '#FFFFFF',
        border: 'none',
        margin: '5px',
      }}
    >
      {label}
    </button>
  );
};

export default Button;

