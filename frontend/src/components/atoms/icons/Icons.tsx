import React, { FC } from "react";
import * as icons from "../../../assets/icons/*.svg";
interface Icons {
  isLogo?: boolean;
  isPerson?: boolean;
}
const Icons: FC<Icons> = (...props) => {
  console.log();
  return (
    <>
      {Object.keys(props[0]) ? (
        <img className="icon" src={icons} alt="Иконка локации"></img>
      ) : (
        false
      )}
    </>
  );
};

export default Icons;
