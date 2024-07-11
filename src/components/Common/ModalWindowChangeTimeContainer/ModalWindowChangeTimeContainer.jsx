import React from "react";
import { useForm } from "react-hook-form";
import ModalWindowChangeTime from "./ModalWindowChangeTime/ModalWindowChangeTime";

const ModalWindowChangeTimeContainer = ({ confirmHandler, cancelHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data) => {
    confirmHandler(data.start, data.end);
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <ModalWindowChangeTime
      cancelHandler={cancelHandler}
      stopPropagation={stopPropagation}
      register={register}
      handleSubmit={handleSubmit}
      handleSubmitForm={handleSubmitForm}
      errors={errors}
    />
  );
};

export default ModalWindowChangeTimeContainer;
