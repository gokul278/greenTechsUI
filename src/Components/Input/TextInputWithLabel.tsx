import { cn } from "@/lib/utils";
import { InputText } from "primereact/inputtext";
import React from "react";

interface TextInputWithLabelProps {
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  readonly?: boolean;
  bgColor?: string;
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  name,
  label,
  placeholder,
  className,
  value,
  onChange,
  type = "text",
  required = false,
  readonly = false,
  bgColor = "#fff",
}) => {
  return (
    <div className={`w-full`}>
      {
        label.length > 0 && (
      <label htmlFor={name} className="font-bold text-gray-700 mb-2 block">
        {label}
      </label>
        )
      }
      <InputText
        id={name}
        name={name}
        style={{
          boxShadow:
            "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
          border: "none",
          borderRadius: 10,
          backgroundColor: bgColor,  
        }}
        className={cn(
          "w-full h-10 lg:h-11 text-sm rounded-2xl focus:border-none",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        readOnly={readonly}
      />
    </div>
  );
};

export default TextInputWithLabel;
