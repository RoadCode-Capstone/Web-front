import { ButtonProps } from "./Button";
import Icon, { IconProps } from "./Icon";

interface IconButtonProps extends Omit<ButtonProps, "label"> {
  iconProps: IconProps;
}

const IconButton: React.FC<IconButtonProps> = ({
  disabled = false,
  onClick,
  type = "button",
  buttonStyle = "",
  iconProps,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-transparent flex items-center justify-center ${buttonStyle}`}
    >
      <Icon
        name={iconProps.name}
        size={iconProps.size}
        color={iconProps.color}
        containerStyle={iconProps.containerStyle}
      />
    </button>
  );
};

export default IconButton;
