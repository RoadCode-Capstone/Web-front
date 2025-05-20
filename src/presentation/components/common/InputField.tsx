import Icon from "./Icon";
import { IconProps } from "./Icon";

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  iconProps?: IconProps;
  containerStyle?: string;
  inputStyle?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  iconProps,
  containerStyle = "",
  inputStyle = "",
}) => {
  return (
    <div
      className={`flex items-center rounded-2xl bg-[#F5F5F5] h-18 gap-x-2 px-8 ${containerStyle}`}
    >
      {iconProps && <Icon {...iconProps} />}
      <input
        className={`w-full focus:outline-none ${inputStyle}`}
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default InputField;
