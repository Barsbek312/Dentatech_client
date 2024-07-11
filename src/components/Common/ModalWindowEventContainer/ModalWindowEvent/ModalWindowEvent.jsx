import React from "react";
import mwe from "./ModalWindowEvent.module.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CreatePatientContainer from "../../../CreatePatientContainer/CreatePatientContainer";

const ModalWindowEvent = ({
  onClose,
  selectedDate = "",
  patientId = null,
  isCreatePatient,
  onCloseCreatePatient,
  stopPropagation,
  errors,
  control,
  onClickCreatePatient,
  patient,
  user,
  personal,
  scheduleType,
  handleSubmit,
  handleFormSubmit,
  register,
}) => {
  return (
    <>
      {isCreatePatient ? (
        <CreatePatientContainer onClose={onCloseCreatePatient} />
      ) : (
        <div className={mwe.modal_overlay} onClick={onClose}>
          <div className={mwe.modal_content} onClick={stopPropagation}>
            <div>
              {!patientId && (
                <div className={mwe.patient__wrapper}>
                  <FormControl
                    size="small"
                    fullWidth
                    error={errors["patientId"]}
                  >
                    <label htmlFor={mwe.patient__label}>Пациент</label>
                    <Controller
                      name="patientId"
                      control={control}
                      defaultValue={""}
                      rules={{
                        required: "Пациент является обязательным полем",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={mwe.patient__label}
                          displayEmpty
                        >
                          <MenuItem value={""} key={-1}>
                            <em>Выберите пациента</em>
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
                </div>
              )}
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
                    defaultValue={""}
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
                    rules={{ required: "Тип является обязательным полем" }}
                    render={({ field, fieldState: { error } }) => (
                      <Select
                        {...field}
                        defaultValue={""}
                        labelId={mwe.status_schedule_label}
                        displayEmpty
                      >
                        <MenuItem value={""} key={0}>
                          <em>Выберите тип приема</em>
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
                  defaultValue={selectedDate ? dayjs(selectedDate) : null}
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
                <label>Start Time</label>
                <input
                  {...register("start", {
                    required: "Начало является обязательным полем",
                  })}
                  type="time"
                  style={{
                    borderColor: errors["start"] ? "red" : "#333333",
                  }}
                />
              </div>
              <div>
                <label>End Time</label>
                <input
                  {...register("end", {
                    required: "Конец является обязательным полем",
                  })}
                  type="time"
                  style={{
                    borderColor: errors["end"] ? "red" : "#333333",
                  }}
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  style={{ resize: "none" }}
                  {...register("description")}
                />
              </div>
            </div>
            <button
              className={mwe.add__reception_btn}
              onClick={handleSubmit(handleFormSubmit)}
            >
              Create
            </button>
            <button className={mwe.cancel__reception_btn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWindowEvent;
