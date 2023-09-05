import { FC } from "react";
import "./fade.scss";

const Fade: FC<fade> = ({ isClicked }) => {
  console.log("fade render");
  return <div className={`fade ${isClicked ? "active" : ""}`}></div>;
};

export default Fade;
