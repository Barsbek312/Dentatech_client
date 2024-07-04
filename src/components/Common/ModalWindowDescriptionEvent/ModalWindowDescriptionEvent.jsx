import React, { useState, useEffect } from "react";
import mwe from "./ModalWindowDescriptionEvent.module.css";
// import { createEvent } from "../../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getPatient } from "../../../redux/patient";
import { deleteReception, getScheduleType } from "../../../redux/schedule";
import CreatePatient from "../../CreatePatient/CreatePatient";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getPersonal } from "../../../redux/personal";

const ModalWindowDescriptionEvent = ({
  onCloseEvent = () => {},
  reception = {},
  onDeleteReception = () => {},
  onUpdateReception = () => {},
  isTreatmentPlan,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { patient } = useSelector((state) => state.patient);
  const { scheduleType } = useSelector((state) => state.schedule);
  const { personal } = useSelector((state) => state.personal);

  const [isCreatePatient, setIsCreatePatient] = useState(false);

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

  const isEmptyObj = (data) => {
    for (const prop in data) {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        return false;
      }
    }
    return true;
  };

  const formatDate = (date) => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const handleFormSubmit = (data) => {
    data["start"] = `${formatDate(data["date"])}T${data["start"]}:00.000Z`;
    data["end"] = `${formatDate(data["date"])}T${data["end"]}:00.000Z`;
    delete data["date"];
    for (let i in data) {
      data[i] = data[i] === reception[i] ? null : data[i]; // Если значения ключа такая же как и была до изменения, то не добавлять его в data
      data[i] === null && delete data[i]; // TextField будет null если он не изменялся и соответственно, не нуждается в добавлении в data
    }
    if (isEmptyObj(data)) {
      data = null;
    } else {
      data["id"] = reception.id;
    }
    onUpdateReception(data);
  };

  return (
    <>
      {isCreatePatient ? (
        <CreatePatient onClose={onCloseCreatePatient} />
      ) : (
        <div className={mwe.modal_overlay} onClick={onCloseEvent}>
          <div
            className={mwe.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
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
                    defaultValue={
                      reception &&
                      reception["attendingStaffId"]
                    }
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
              onClick={() => onDeleteReception(reception && reception.id)}
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
