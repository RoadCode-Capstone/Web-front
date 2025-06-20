import { ChangeEventHandler } from "react";
import Icon from "./Icon";
import { IconProps } from "./Icon";

interface InputFieldProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  iconProps?: IconProps;
  containerStyle?: string;
  inputStyle?: string;
  disabled?: boolean;
  value?: string;
  onActionChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputField = (props: InputFieldProps) => {
  return (
    <div
      className={`flex items-center rounded-2xl bg-[#F5F5F5] h-18 gap-x-2 px-8 ${props.containerStyle}`}
    >
      {props.iconProps && <Icon {...props.iconProps} />}
      <input
        className={`w-full focus:outline-none ${props.inputStyle}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled ?? false}
        onChange={props.onActionChange}
      ></input>
    </div>
  );
};

export default InputField;
