import React from "react";
import ab from "./AddBranch.module.css";
import { Controller } from "react-hook-form";
import { FormControl, MenuItem, Select } from "@mui/material";

const AddBranch = ({
  onClose = () => {},
  stopPropagation = () => {},
  handleSubmit = () => {},
  handleFormSubmit = () => {},
  register = () => {},
  errors,
  city,
  control,
}) => {
  return (
    <div className={ab.add__branch_window} onClick={onClose}>
      <div className={ab.add__branch_wrapper} onClick={stopPropagation}>
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
