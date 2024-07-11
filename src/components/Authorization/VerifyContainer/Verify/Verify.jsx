import React from "react";
import v from "./Verify.module.css";

const Verify = ({token, handleConfirmClick, email}) => {
  return (
    <main className={v.verify__main}>
      <div>
        <h2 className={v.verify__title}>Подтвердите адрес электронной почты</h2>
        <p className={v.verify__email}>{email}</p>
        <button onClick={handleConfirmClick(token)} className={v.verify__button}>
          Подтвердить
        </button>
      </div>
    </main>
  );
};

export default Verify;
