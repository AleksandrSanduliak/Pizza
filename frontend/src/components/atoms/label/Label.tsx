import React, { FC } from "react";
import cl from "./label.module.scss";
type Label = {
  children: React.ReactNode;
  htmlFor: string;
};
const Label: FC<Label> = ({ children, htmlFor }) => {
  console.log("label render");
  return (
    <label htmlFor={htmlFor} className={cl.label}>
      {children}
    </label>
  );
};

export default Label;
