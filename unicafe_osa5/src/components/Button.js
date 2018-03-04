import React from "react";

let Button = ({ handleClick, title }) => {
  return <button onClick={handleClick}>{title}</button>;
};

export default Button;