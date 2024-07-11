import React from "react";
import tmw from "./../../../../ToothModalWindowContainer/ToothModalWindow/ToothModalWindow.module.css";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const EditClickedPlannedDisease = ({
  close = () => {},
  diagnosis,
  onClickOverModalWindow,
  stopPropagation,
  errors,
  control,
  disease,
  handleSubmit,
  handleFormSubmit,
  handleClickOnDeleteDiagnosis,
}) => {
  return (
    <div className={tmw.modal__window_wrapper} onClick={onClickOverModalWindow}>
      <div className={tmw.modal__window} onClick={stopPropagation}>
        <h2>Изменить диагноз</h2>
        <div className={tmw.main}>
          <FormControl fullWidth size="small">
            <InputLabel id={"planned_disease_id"}>
              {errors["diseaseId"] ? errors["diseaseId"].message : "Болезнь"}
            </InputLabel>
            <Controller
              name="diseaseId"
              control={control}
              defaultValue={
                (diagnosis && diagnosis.diseases && diagnosis.diseases.id) || ""
              }
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  labelId={"planned_disease_id"}
                  label={error ? error.message : "Болезнь"}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {disease &&
                    disease.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.disease}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <button onClick={handleSubmit(handleFormSubmit)}>Change</button>
        <button onClick={handleClickOnDeleteDiagnosis(diagnosis.id)}>
          Delete
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default EditClickedPlannedDisease;
