import React, { FC } from "react";
interface Input {
  children: React.ReactNode;
}
const Input: FC<Input> = ({ children, ...props }) => {
  return <input {...props}>{children}</input>;
};

export default Input;
