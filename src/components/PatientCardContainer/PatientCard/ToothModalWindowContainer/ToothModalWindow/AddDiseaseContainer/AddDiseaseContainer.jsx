import React from "react";
import AddDisease from "./AddDisease/AddDisease";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createDisease } from "./../../../../../../redux/disease";

const AddDiseaseContainer = ({ setIsShowDiseaseModalWindow = () => {} }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);

  const handleFormSubmit = async (data) => {
    if (isAuth) {
      data["clinicId"] = user.clinicId;
      const res = await dispatch(createDisease(data));
      setIsShowDiseaseModalWindow(false);
    }
  };

  const close = () => setIsShowDiseaseModalWindow(false);
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <AddDisease
      close={close}
      stopPropagation={stopPropagation}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default AddDiseaseContainer;
