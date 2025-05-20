interface ButtonProps {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonStyle?: string;
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  label,
  onClick,
  type = "button",
  buttonStyle = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-[#F2C53D] text-white flex items-center justify-center rounded-2xl h-16 px-8 ${buttonStyle}`}
    >
      {label}
    </button>
  );
};

export default Button;
