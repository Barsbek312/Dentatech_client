import React from "react";
import tmw from "./ToothModalWindow.module.css";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import AddDiseaseContainer from "./AddDiseaseContainer/AddDiseaseContainer";
import AddProcedureContainer from "./AddProcedureContainer/AddProcedureContainer";

const ToothModalWindow = ({
  title,
  isTreatmentPlan,
  onClickOverModalWindow,
  isShowDiseaseModalWindow,
  setIsShowDiseaseModalWindow,
  isShowProcedureModalWindow,
  setIsShowProcedureModalWindow,
  stopPropagation,
  errors,
  control,
  onClickShowDiseaseModalWindow,
  disease,
  availableProcedure,
  handleProcedureChange,
  handleSubmit,
  handleFormSubmit,
  close
}) => {
  return (
    <div className={tmw.modal__window_wrapper} onClick={onClickOverModalWindow}>
      {(isShowDiseaseModalWindow && (
        <AddDiseaseContainer setIsShowDiseaseModalWindow={setIsShowDiseaseModalWindow} />
      )) ||
        (isShowProcedureModalWindow && (
          <AddProcedureContainer
            setIsShowProcedureModalWindow={setIsShowProcedureModalWindow}
          />
        )) || (
          <div className={tmw.modal__window} onClick={stopPropagation}>
            <h2>{title}</h2>
            <div className={tmw.main}>
              {isTreatmentPlan && (
                <div className={tmw.disease__wrapper}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={"planned_disease_id"}>
                      {errors["diseaseId"]
                        ? errors["diseaseId"].message
                        : "Болезнь"}
                    </InputLabel>
                    <Controller
                      name="diseaseId"
                      control={control}
                      defaultValue={""}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={"planned_disease_id"}
                          label={error ? error.message : "Болезнь"}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          <MenuItem
                            key={0}
                            value={0}
                            onClick={onClickShowDiseaseModalWindow}
                          >
                            Добавить
                          </MenuItem>
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
              )}
              <div className={tmw.procedure__wrapper}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors["procedureId"]}
                >
                  <Controller
                    name="procedureId"
                    defaultValue={[]}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Autocomplete
                        {...field}
                        id="tags-outlined"
                        multiple
                        options={availableProcedure}
                        getOptionLabel={(option) => option.procedure}
                        filterSelectedOptions
                        size="small"
                        onChange={handleProcedureChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={error ? error.message : "Процедура"}
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
              </div>
            </div>
            <button onClick={handleSubmit(handleFormSubmit)}>Create</button>
            <button onClick={close}>Cancel</button>
          </div>
        )}
    </div>
  );
};

export default ToothModalWindow;
