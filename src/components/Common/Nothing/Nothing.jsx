import React from "react";
import n from "./Nothing.module.css";

const Nothing = ({ text }) => {
  return (
    <div className={n.text_wrapper}>
      <strong>{text}</strong>
    </div>
  );
};

export default Nothing;
