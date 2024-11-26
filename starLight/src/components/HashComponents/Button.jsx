import "./Button.css";

const Button = ({ text, type, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={!disabled ? `Button Button_${type}` : `Button Button_disabled`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
