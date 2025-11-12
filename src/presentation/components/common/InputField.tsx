import { HTMLInputTypeAttribute, ChangeEventHandler } from "react";

export interface InputFieldProps {
  id: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputField(props: InputFieldProps) {
  return (
    <div
      className="flex py-6 px-[30px] w-full
   bg-[#F9F9F9] border-1 border-black rounded-2xl
   font-light text-base "
    >
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className="outline-none w-full "
      />
    </div>
  );
}
