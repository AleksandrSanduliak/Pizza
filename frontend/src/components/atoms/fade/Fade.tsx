import React, { FC } from "react";
import "./fade.scss";
import { stopBubling } from "../../../utils/funcs/stopBubling";

const Fade: FC<fade> = ({ isClicked }) => {
  return <div className={`fade ${isClicked ? "active" : ""}`}></div>;
};

export default Fade;
