import React from "react";
import "./button.scss";
import loading from "./btn-items/loading.svg";

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  children: string | React.ReactNode;
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
  console.log("button render");
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={["button", mode].join(" ")}
      {...props}
    >
      {isLoading && (
        <img
          loading="lazy"
          className={`button-loading-img  ${isLoading ? "button-loading" : ""}`}
          src={loading}
          alt="Загрузка..."
        />
      )}
      {children}
    </button>
  );
};
