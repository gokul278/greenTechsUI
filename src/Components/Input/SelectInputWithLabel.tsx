import React from "react";
import { cn } from "@/lib/utils";
import { Dropdown } from "primereact/dropdown";

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: Option[];
  value?: string | number;
  onChange?: (e: any) => void; // PrimeReact dropdown change event
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  bgColor?: string;
}

const SelectInputWithLabel: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  required = false,
  disabled = false,
  bgColor = "#fff",
}) => {
  return (
    <div className="w-full">
      {label.length > 0 && (
        <label htmlFor={name} className="font-bold text-gray-700 mb-2 block">
          {label} {required && "*"}
        </label>
      )}
      <Dropdown
        id={name}
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full h-10 lg:h-11 text-sm rounded-2xl px-0 focus:border-none",
          className
        )}
        style={{
          backgroundColor: bgColor,
          border: "none",
          borderRadius: 10,
          boxShadow:
            "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
        }}
        required={required}
      />
    </div>
  );
};

export default SelectInputWithLabel;
