import React from "react";
import ad from "./AddDisease.module.css";
import { Controller, useForm } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createDisease } from "./../../../../redux/disease";

const AddDisease = ({ setIsShowDiseaseModalWindow = () => {} }) => {
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
  return (
    <div
      className={ad.add__disease_wrapper}
      onClick={() => setIsShowDiseaseModalWindow(false)}
    >
      <div className={ad.add__disease} onClick={(e) => e.stopPropagation()}>
        <h2>Добавить болезнь</h2>
        <div>
          <FormControl fullWidth size="small" error={errors["disease"]}>
            <Controller
              name="disease"
              control={control}
              defaultValue={""}
              rules={{ required: "Болезнь является обязательным полем" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={errors.disease}
                  placeholder={
                    errors.disease ? errors.disease.message : "Болезнь"
                  }
                  {...field}
                  label={"Болезнь"}
                  size="small"
                />
              )}
            />
          </FormControl>
        </div>
        <button onClick={handleSubmit(handleFormSubmit)}>Create</button>
        <button onClick={() => setIsShowDiseaseModalWindow(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddDisease;
