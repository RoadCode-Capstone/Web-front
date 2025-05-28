import { ButtonProps } from "./Button";

interface ImageButtonProps extends Omit<ButtonProps, "label"> {
  src: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  disabled = false,
  onClick,
  type = "button",
  buttonStyle = "",
  src,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-[#F2C53D] flex items-center justify-center rounded-2xl h-12 px-8 ${buttonStyle}`}
    >
      <img src={src} className="h-full object-contain"></img>
    </button>
  );
};

export default ImageButton;
