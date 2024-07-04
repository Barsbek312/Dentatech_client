import React, { useEffect } from "react";
import ab from "./AddBranch.module.css";
import { Controller, useForm } from "react-hook-form";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCity } from "../../../redux/user";
import { createBranch, getBranchesByClinicId } from "../../../redux/branch";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";

const AddBranch = ({ onClose = () => {} }) => {
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

  return (
    <div className={ab.add__branch_window} onClick={onClose}>
      <div
        className={ab.add__branch_wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={ab.branch__name_wrapper}>
            <label htmlFor="input__branch_name">Название филиала:</label>
            <div>
              <input
                type="text"
                {...register("branch", {
                  required: "Название филиала является обязательным полем",
                })}
                placeholder={
                  errors["branch"]
                    ? errors["branch"].message
                    : "Напишите название филиала"
                }
                style={{
                  borderColor: errors["branch"] ? "red" : "#333333",
                }}
              />
            </div>
          </div>
          <div className={ab.street__wrapper}>
            <label htmlFor="input__street">Улица/дом/номер дома</label>
            <div>
              <input
                type="text"
                {...register("street", {
                  required: "Адрес является обязательным полем",
                })}
                placeholder={
                  errors["street"] ? errors["street"].message : "Напишите адрес"
                }
                style={{
                  borderColor: errors["street"] ? "red" : "#333333",
                }}
              />
            </div>
          </div>
          <div className={ab.city__wrapper}>
            <FormControl fullWidth size="small" error={errors["cityId"]}>
              <label htmlFor="input__city">Город</label>
              <Controller
                name="cityId"
                control={control}
                defaultValue={""}
                rules={{ required: "Город является обязательным полем" }}
                render={({ field, fieldState: { error } }) => (
                  <Select {...field} labelId="input__city" displayEmpty>
                    <MenuItem value="">
                      <em className={ab.placeholder}>Выберите город</em>
                    </MenuItem>
                    {city &&
                      city.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.city}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <button type="submit" className={ab.create__branch_btn}>
            Создать
          </button>
          <button
            type="button"
            onClick={onClose}
            className={ab.cancel__branch_btn}
          >
            Отменить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBranch;
