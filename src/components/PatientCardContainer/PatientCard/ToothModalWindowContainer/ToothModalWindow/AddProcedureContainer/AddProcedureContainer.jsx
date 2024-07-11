import React from "react";
import AddProcedure from "./AddProcedure/AddProcedure";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createProcedure } from "../../../../../../redux/procedure";

const AddProcedureContainer = ({ setIsShowProcedureModalWindow }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  const { procedureType } = useSelector((state) => state.procedure);

  const handleFormSubmit = async (data) => {
    if (isAuth) {
      data["clinicId"] = user.clinicId;
      data["price"] = +data["price"];
      const res = await dispatch(createProcedure(data));
      setIsShowProcedureModalWindow(false);
    }
  };

  const stopPropagation = (e) => e.stopPropagation();
  const close = () => setIsShowProcedureModalWindow(false);

  return (
    <AddProcedure
      close={close}
      stopPropagation={stopPropagation}
      errors={errors}
      control={control}
      procedureType={procedureType}
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default AddProcedureContainer;
