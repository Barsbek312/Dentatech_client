import React from "react";
import ad from "./AddDisease.module.css";
import { Controller } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";

const AddDisease = ({
  close,
  stopPropagation,
  errors,
  control,
  handleSubmit,
  handleFormSubmit
}) => {
  return (
    <div className={ad.add__disease_wrapper} onClick={close}>
      <div className={ad.add__disease} onClick={stopPropagation}>
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
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default AddDisease;