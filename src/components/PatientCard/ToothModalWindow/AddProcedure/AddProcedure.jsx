import React from "react";
import ap from "./../AddProcedure/AddProcedure.module.css";
import { Controller, Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { createProcedure } from "../../../../redux/procedure";

const AddProcedure = ({ setIsShowProcedureModalWindow }) => {
  const {
    register,
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

  return (
    <div
      className={ap.modal__window_wrapper}
      onClick={() => setIsShowProcedureModalWindow(false)}
    >
      <div className={ap.modal__window} onClick={(e) => e.stopPropagation()}>
        <h2>Добавить процедуру</h2>
        <div>
          <FormControl error={errors["procedure"]} fullWidth size="small">
            <Controller
              name="procedure"
              control={control}
              defaultValue={""}
              rules={{ required: "Процедура является обязательным полем" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={error && error.message}
                  placeholder={error ? error.message : "Процедура"}
                  {...field}
                  label={"Процедура"}
                  size="small"
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <Controller
              name="description"
              control={control}
              defaultValue={""}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  multiline
                  placeholder={"Описание"}
                  {...field}
                  label={"Описание"}
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth size="small" error={errors["price"]}>
            <Controller
              name="price"
              control={control}
              defaultValue={""}
              rules={{ required: "Цена является обязательным полем" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={error && error.message}
                  type="number"
                  placeholder={error ? error.message : "Процедура"}
                  {...field}
                  label={"Цена"}
                  size="small"
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth size="small" error={errors["procedureTypeId"]}>
            <InputLabel id={"planned_procedure_type_id"}>
              Тип процедуры
            </InputLabel>
            <Controller
              name="procedureTypeId"
              control={control}
              defaultValue={""}
              rules={{ required: "Тип процедуры является обязательным полем" }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  labelId="planned_procedure_type_id"
                  label={error ? error.message : "Тип процедуры"}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {procedureType &&
                    procedureType.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.procedureType}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <button onClick={handleSubmit(handleFormSubmit)}>Create</button>
        <button onClick={() => setIsShowProcedureModalWindow(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProcedure;
