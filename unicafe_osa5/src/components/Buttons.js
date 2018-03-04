import React from "react";
import Button from "./Button";

let Buttons = props => {
  return (
    <p>
      <Button handleClick={() => props.handleGood()} title="Good" />
      <Button handleClick={() => props.handleNeutral()} title="Neutral" />
      <Button handleClick={() => props.handleBad()} title="Bad" />
    </p>
  );
};

export default Buttons;