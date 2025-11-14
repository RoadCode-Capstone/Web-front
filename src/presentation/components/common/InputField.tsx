import { HTMLInputTypeAttribute, ChangeEventHandler } from "react";
import { cn } from "@/utils/tailwind";

export interface InputFieldProps {
  id: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  style?: string;
}

export default function InputField(props: InputFieldProps) {
  return (
    <div
      className={cn(
        "flex py-6 px-[30px] w-full\
   bg-[#F9F9F9] border border-black rounded-2xl\
   font-light text-base \
   focus-within:outline-3\
    focus-within:outline-point",
        props.style
      )}
    >
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className="outline-none w-full bg-transparent"
      />
    </div>
  );
}
