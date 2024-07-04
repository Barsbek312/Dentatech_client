import React, { useState, useEffect } from "react";
import mwe from "./ModalWindowEvent.module.css";
// import { createEvent } from "../../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../../redux/patient";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CreatePatient from "../../CreatePatient/CreatePatient";
import { addAdmission, getScheduleType } from "../../../redux/schedule";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { getPersonal } from "../../../redux/personal";

const ModalWindowEvent = ({ onClose, selectedDate = "", patientId = null }) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.user);
  const { patient } = useSelector((state) => state.patient);
  const { scheduleType } = useSelector((state) => state.schedule);
  const { personal } = useSelector((state) => state.personal);

  const [isCreatePatient, setIsCreatePatient] = useState(false);

  const formatDate = (date) => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const handleFormSubmit = async (data) => {
    const backgroundColorRandom = [
      "rgba(14, 165, 233, 0.7)",
      "rgba(244, 63, 94, 0.8)",
      "rgba(109, 40, 217, 0.7)",
      "rgba(245, 158, 11, 0.8)",
    ];
    if (patientId) {
      data["patientId"] = patientId;
    }
    data["isCanceled"] = false;
    data["referringStaffId"] = user.id;
    data["start"] = `${formatDate(data['date'])}T${data["start"]}:00.000Z`;
    data["end"] = `${formatDate(data['date'])}T${data["end"]}:00.000Z`;
    data["backgroundColor"] =
      backgroundColorRandom[
        Math.floor(Math.random() * backgroundColorRandom.length)
      ];
    delete data["date"];
    const res = await dispatch(addAdmission(data));
    if (res.type === "schedule/addAdmission/fulfilled") {
      dispatch(setErrorNotification(false));
      dispatch(setNotificationText("Прием был успешно создан"));
    } else {
      dispatch(setErrorNotification(true));
      dispatch(
        setNotificationText(
          res?.payload?.response?.data?.message ||
            "Прием не был создан, попробуйте еще раз"
        )
      );
    }
    dispatch(showNotification());
    removeNotification(dispatch);
    onClose();
  };

  useEffect(() => {
    if (user && user.branchId) {
      dispatch(getPatient(user.branchId));
      dispatch(getScheduleType());
      dispatch(getPersonal(user.clinicId));
    }
  }, []);

  const onClickCreatePatient = (event) => {
    setIsCreatePatient(true);
  };

  const onCloseCreatePatient = () => {
    setIsCreatePatient(false);
  };

  return (
    <>
      {isCreatePatient ? (
        <CreatePatient onClose={onCloseCreatePatient} />
      ) : (
        <div className={mwe.modal_overlay} onClick={onClose}>
          <div
            className={mwe.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
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
