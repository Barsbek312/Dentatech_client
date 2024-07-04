import React from "react";
import a from "./ModalWindowConfirmAction.module.css";

const ModalWindowConfirmAction = ({ close = () => {}, confirm = () => {} }) => {
  return (
    <div className={a.modal__window_wrapper} onClick={close}>
      <div
        className={a.modal__window_content}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Вы уверены, что хотите это сделать?</h3>
        <button onClick={confirm}>Продолжить</button>
        <button onClick={close}>Отменить</button>
      </div>
    </div>
  );
};

export default ModalWindowConfirmAction;
