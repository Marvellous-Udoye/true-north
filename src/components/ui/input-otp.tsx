"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type OtpContextValue = {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
  slotsRef: React.MutableRefObject<HTMLInputElement[]>;
};

const OtpContext = React.createContext<OtpContextValue | null>(null);

const InputOTP = ({
  value,
  onChange,
  maxLength,
  children,
}: {
  value?: string;
  onChange?: (value: string) => void;
  maxLength: number;
  children: React.ReactNode;
}) => {
  const slotsRef = React.useRef<HTMLInputElement[]>([]);
  const [internalValue, setInternalValue] = React.useState("");
  const resolvedValue = value ?? internalValue;
  const handleChange = onChange ?? setInternalValue;

  return (
    <OtpContext.Provider
      value={{ value: resolvedValue, maxLength, onChange: handleChange, slotsRef }}
    >
      <div className="flex items-center gap-2">{children}</div>
    </OtpContext.Provider>
  );
};

const InputOTPGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-1", className)} {...props} />
);

const InputOTPSlot = ({
  index,
  className,
}: {
  index: number;
  className?: string;
}) => {
  const context = React.useContext(OtpContext);
  if (!context) {
    return null;
  }

  const { value, maxLength, onChange, slotsRef } = context;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value.replace(/\D/g, "");
    if (!next) {
      const nextValue =
        value.substring(0, index) + "" + value.substring(index + 1);
      onChange(nextValue);
      return;
    }

    const nextValue =
      value.substring(0, index) + next[0] + value.substring(index + 1);
    onChange(nextValue);

    if (index < maxLength - 1) {
      slotsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      slotsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;

    const nextValue = value.split("");
    text.split("").slice(0, maxLength - index).forEach((char, offset) => {
      nextValue[index + offset] = char;
    });
    onChange(nextValue.join("").slice(0, maxLength));
    const nextIndex = Math.min(index + text.length, maxLength - 1);
    slotsRef.current[nextIndex]?.focus();
  };

  return (
    <input
      ref={(el) => {
        if (el) slotsRef.current[index] = el;
      }}
      value={value[index] ?? ""}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      inputMode="numeric"
      autoComplete="one-time-code"
      className={cn(
        "size-11 sm:size-12 rounded-md border border-primary/10 bg-white text-center text-sm text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20",
        className
      )}
    />
  );
};

const InputOTPSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("mx-1 text-muted-foreground", className)} {...props}>
    -
  </span>
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
