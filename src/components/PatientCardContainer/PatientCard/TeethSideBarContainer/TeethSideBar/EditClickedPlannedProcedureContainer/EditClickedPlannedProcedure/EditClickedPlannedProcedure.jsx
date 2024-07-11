import React from "react";
import tmw from "./../../../../ToothModalWindowContainer/ToothModalWindow/ToothModalWindow.module.css";
import { Controller } from "react-hook-form";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const EditClickedPlannedProcedure = ({
  close,
  plannedProcedure,
  onClickOverModalWindow,
  stopPropagation,
  errors,
  control,
  procedure,
  handleSubmit,
  handleFormSubmit,
  handleClickOnDeleteProcedure,
}) => {
  return (
    <div className={tmw.modal__window_wrapper} onClick={onClickOverModalWindow}>
      <div className={tmw.modal__window} onClick={stopPropagation}>
        <h2>Изменить процедуру</h2>
        <div className={tmw.main}>
          <FormControl fullWidth size="small">
            <InputLabel id={"planned_procedure_id"}>
              {errors["procedureId"]
                ? errors["procedureId"].message
                : "Процедура"}
            </InputLabel>
            <Controller
              name="procedureId"
              control={control}
              defaultValue={
                (plannedProcedure &&
                  plannedProcedure.procedure &&
                  plannedProcedure.procedure.id) ||
                ""
              }
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  labelId={"planned_procedure_id"}
                  label={error ? error.message : "Процедура"}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {procedure &&
                    procedure.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.procedure}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <button onClick={handleSubmit(handleFormSubmit)}>Change</button>
        <button
          onClick={handleClickOnDeleteProcedure(plannedProcedure.id || null)}
        >
          Delete
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default EditClickedPlannedProcedure;
