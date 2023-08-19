import React from "react";
import "./button.scss";
import loading from "./btn-items/loading.svg";
interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  children: string;
  isLoading?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

export const Button = ({
  primary = true,
  children,
  isLoading = false,
  isSubmit = false,
  ...props
}: ButtonProps) => {
  const mode = primary ? "button-primary" : "button-secondary";
  // const bcg = primary? '#FF7010' : null
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={["button", mode].join(" ")}
      {...props}
    >
      {isLoading ? (
        <img className="button-loading" src={loading} alt="Загрузка..." />
      ) : null}

      {children}
    </button>
  );
};
