import { cn } from "@/lib/utils";
import { InputNumber, type InputNumberValueChangeEvent,  } from "primereact/inputnumber";
import React from "react";

interface NumberInputWithLabelProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  value?: number | null;
  onValueChange?: (e: InputNumberValueChangeEvent) => void; // updated type
  // Optional: keep a plain input onChange but mark e as possibly undefined
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readonly?: boolean;
  bgColor?: string;
  min?: number;
  max?: number;
  step?: number;
  mode?: "decimal" | "currency";
  currency?: string;
  locale?: string;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  prefix?: string;
  suffix?: string;
}

const NumberInputWithLabel: React.FC<NumberInputWithLabelProps> = ({
  name,
  label,
  placeholder,
  className,
  value = null,
  onChange,
  onValueChange,
  required = false,
  readonly = false,
  bgColor = "#fff",
  min,
  max,
  step,
  mode = "decimal",
  currency,
  locale,
  useGrouping,
  minFractionDigits,
  maxFractionDigits,
  prefix,
  suffix,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="font-bold text-gray-700 mb-2 block">
        {label}
      </label>

      <InputNumber
        inputId={name}
        name={name}
        value={value}
        onValueChange={(e: InputNumberValueChangeEvent) => {
          onValueChange?.(e);
          // e.originalEvent is optional; guard it before using
          if (onChange && e.originalEvent) {
            onChange(e.originalEvent as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        placeholder={placeholder}
        required={required}
        readOnly={readonly}
        min={min}
        max={max}
        step={step}
        mode={mode}
        currency={currency}
        locale={locale}
        useGrouping={useGrouping}
        minFractionDigits={minFractionDigits}
        maxFractionDigits={maxFractionDigits}
        prefix={prefix}
        suffix={suffix}
        inputStyle={{
          boxShadow:
            "inset 7px 7px 7px rgba(153,153,153,0.25), inset -7px -7px 7px rgba(235,235,235,0.25)",
          border: "none",
          borderRadius: 10,
          backgroundColor: bgColor,
        }}
        style={{fontSize:"0.8rem"}}
        className={cn(
          "w-full h-10 lg:h-11 text-xs rounded-2xl focus:border-none",
          className
        )}
      />
    </div>
  );
};

export default NumberInputWithLabel;
