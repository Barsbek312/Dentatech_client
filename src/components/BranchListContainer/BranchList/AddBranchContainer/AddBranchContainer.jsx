import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBranch, getBranchesByClinicId } from "../../../../redux/branch";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";
import { getCity } from "../../../../redux/user";
import AddBranch from "./AddBranch/AddBranch";

const AddBranchContainer = ({ onClose = () => {} }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user, isAuth } = useSelector((state) => state.user);
  const { city } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();

    if (user && isAuth && user.clinicId) {
      data["clinicId"] = user.clinicId;

      const res = await dispatch(createBranch(data));

      if (res.type === "branch/create-branch/fulfilled") {
        dispatch(getBranchesByClinicId(user.clinicId));
        dispatch(setErrorNotification(false));
        dispatch(setNotificationText("Филиал успешно добавлен"));
      } else {
        dispatch(setErrorNotification(true));
        dispatch(setNotificationText("Филиал не был добавлен"));
      }

      dispatch(showNotification());
      removeNotification(dispatch);

      onClose();
    }
  };

  useEffect(() => {
    dispatch(getCity());
  }, []);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <AddBranch
      onClose={onClose}
      stopPropagation={stopPropagation}
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      register={register}
      errors={errors}
      city={city}
      control={control}
    />
  );
};

export default AddBranchContainer;
