import React from "react";
import mwct from "./ModalWindowChangeTime.module.css";
import { useForm } from "react-hook-form";

const ModalWindowChangeTime = ({
  cancelHandler = () => {},
  stopPropagation = () => {},
  register = () => {},
  handleSubmit = () => {},
  handleSubmitForm = () => {},
  errors,
}) => {
  return (
    <div className={mwct.modal_overlay} onClick={cancelHandler}>
      <div className={mwct.modal_content} onClick={stopPropagation}>
        <h2>Время:</h2>
        <div>
          <label>Start Time:</label>
          <input
            {...register("start", {
              required: "Начало является обязательным полем",
            })}
            type="time"
            style={{ borderColor: errors["start"] ? "red" : "#333333" }}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="time"
            {...register("end", {
              required: "Конец является обязательным полем",
            })}
            style={{ borderColor: errors["end"] ? "red" : "#333333" }}
          />
        </div>
        <button onClick={handleSubmit(handleSubmitForm)}>Change</button>
        <button onClick={cancelHandler}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalWindowChangeTime;
