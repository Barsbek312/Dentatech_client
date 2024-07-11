import React from "react";
import mwe from "./ModalWindowDescriptionEvent.module.css";
import { Controller } from "react-hook-form";
import { FormControl, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CreatePatientContainer from "../../../CreatePatientContainer/CreatePatientContainer";

const ModalWindowDescriptionEvent = ({
  onCloseEvent = () => {},
  reception = {},
  isTreatmentPlan,
  isCreatePatient,
  errors,
  onClickDeleteReception = () => {},
  handleFormSubmit = () => {},
  handleSubmit = () => {},
  register = () => {},
  control,
  scheduleType,
  patient,
  onClickCreatePatient = () => {},
  user,
  personal,
  stopPropagation = () => {},
  onCloseCreatePatient = () => {},
}) => {
  return (
    <>
      {isCreatePatient ? (
        <CreatePatientContainer onClose={onCloseCreatePatient} />
      ) : (
        <div className={mwe.modal_overlay} onClick={onCloseEvent}>
          <div className={mwe.modal_content} onClick={stopPropagation}>
            <div>
              <div className={mwe.staff__wrapper}>
                <FormControl
                  size="small"
                  fullWidth
                  error={errors["attendingStaffId"]}
                >
                  <label htmlFor={mwe.patient__label}>Доктор</label>
                  <Controller
                    name="attendingStaffId"
                    control={control}
                    defaultValue={reception && reception["attendingStaffId"]}
                    rules={{
                      required: "Доктор является обязательным полем",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <Select
                        {...field}
                        labelId={mwe.staff__label}
                        displayEmpty
                      >
                        <MenuItem value={""} key={-1}>
                          <em>Выберите стоматолога</em>
                        </MenuItem>
                        {user && (
                          <MenuItem key={user.id} value={user.id}>
                            Вы
                          </MenuItem>
                        )}
                        {user &&
                          personal &&
                          personal
                            .filter((item) => item.id !== user.id)
                            .map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.surname} {item.name}
                              </MenuItem>
                            ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </div>
              <div className={mwe.patient__wrapper}>
                {!isTreatmentPlan && (
                  <FormControl
                    size="small"
                    fullWidth
                    error={errors["patientId"]}
                  >
                    <label htmlFor={mwe.patient__label}>Пациент</label>
                    <Controller
                      name="patientId"
                      control={control}
                      defaultValue={
                        reception &&
                        reception["patient"] &&
                        reception["patient"]["id"]
                      }
                      rules={{
                        required: "Пациент является обязательным полем",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={mwe.patient__label}
                          displayEmpty
                        >
                          <MenuItem value={""}>
                            <em className={mwe.placeholder}>
                              Выберите пациента
                            </em>
                          </MenuItem>
                          <MenuItem
                            key={0}
                            value={"Создать"}
                            onClick={onClickCreatePatient}
                          >
                            Создать
                          </MenuItem>
                          {patient &&
                            patient.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.surname} {item.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                )}
              </div>
              <div className={mwe.statusSchedule__wrapper}>
                <FormControl
                  size="small"
                  fullWidth
                  error={errors["receptionTypeId"]}
                >
                  <label htmlFor={mwe.status_schedule_label}>Тип приема</label>
                  <Controller
                    name="receptionTypeId"
                    control={control}
                    defaultValue={reception && reception["receptionTypeId"]}
                    rules={{ required: "Тип является обязательным полем" }}
                    render={({ field, fieldState: { error } }) => (
                      <Select
                        {...field}
                        labelId={mwe.status_schedule_label}
                        displayEmpty
                      >
                        <MenuItem value={""}>
                          <em className={mwe.placeholder}>
                            Выберите тип приема
                          </em>
                        </MenuItem>
                        {scheduleType &&
                          scheduleType.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.receptionType}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </div>

              <div className={mwe.date__reception_wrapper}>
                <label>Date</label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={
                    (reception &&
                      reception["start"] &&
                      dayjs(reception["start"])) ||
                    null
                  }
                  rules={{
                    required: "Дата является обязательным полем",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="en-gb"
                    >
                      <DatePicker
                        {...field}
                        control={control}
                        slotProps={{
                          textField: {
                            error: !!error,
                            size: "small",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
              <div>
                <label>Start Time:</label>
                <input
                  {...register("start", {
                    required: "Начало является обязательным полем",
                  })}
                  type="time"
                  defaultValue={
                    reception &&
                    reception["start"] &&
                    reception["start"].split("T")[1].slice(0, 5)
                  }
                  style={{
                    borderColor: errors["start"] ? "red" : "#333333",
                  }}
                />
              </div>
              <div>
                <label>End Time:</label>
                <input
                  {...register("end", {
                    required: "Конец является обязательным полем",
                  })}
                  type="time"
                  defaultValue={
                    reception &&
                    reception["end"] &&
                    reception["end"].split("T")[1].slice(0, 5)
                  }
                  style={{
                    borderColor: errors["end"] ? "red" : "#333333",
                  }}
                />
              </div>

              <div>
                <label>Description:</label>
                <textarea
                  style={{ resize: "none" }}
                  {...register("description")}
                  defaultValue={reception && reception["description"]}
                />
              </div>
            </div>
            <button
              className={mwe.form__btn + " " + mwe.form__btn_create}
              onClick={handleSubmit(handleFormSubmit)}
            >
              Change
            </button>
            <button
              className={mwe.form__btn}
              onClick={onClickDeleteReception(reception && reception.id)}
            >
              Delete
            </button>
            <button className={mwe.form__btn} onClick={onCloseEvent}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWindowDescriptionEvent;
