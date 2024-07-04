import { useEffect, useState } from "react";
import cp from "./CreatePatient.module.css";
import "./CreatePatient.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  getDistrict,
  getPatientStatus,
  getPatientType,
} from "../../redux/patient";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCity } from "../../redux/user";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../redux/notification";

const CreatePatient = ({ onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { district, patientStatus, patientType } = useSelector(
    (state) => state.patient
  );
  const { user, city } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [arrCities, setArrCities] = useState([]);
  const [where, setWhere] = useState([
    "По рекомендации знакомых",
    "Щит на улице",
    "Телевидение",
    "Флаер",
    "Интернет",
  ]);

  useEffect(() => {
    dispatch(getDistrict());
    dispatch(getPatientStatus());
    dispatch(getPatientType());
  }, []);

  const handleFormSubmit = async (data) => {
    if (user && user.clinicId) {
      data["clinicId"] = user.clinicId;
      data["birthDate"] = new Date(data["birthDate"]).toISOString();
      const res = await dispatch(createPatient(data));
      if (res.payload.status === 201) {
        dispatch(setNotificationText("Пациент был успешно создан"));
        dispatch(setErrorNotification(false));
        dispatch(showNotification());
        removeNotification(dispatch);
      }
      onClose();
    } else {
      dispatch(setNotificationText("Вышла ошибка: попробуйте позже"));
      dispatch(setErrorNotification(true));
      dispatch(showNotification());
      removeNotification(dispatch);
    }
  };

  useEffect(() => {
    const fetchCity = async () => {
      await dispatch(getCity());
    };
    fetchCity();
  }, []);

  useEffect(() => {
    setArrCities(city);
  }, [city]);

  return (
    <div className={cp.modal_overlay} onClick={onClose}>
      <div className={cp.modal_content} onClick={(e) => e.stopPropagation()}>
        <div>
          <div>
            <label>Имя Пациента:</label>
            <input
              {...register("name", {
                required: "Имя является обязательным полем",
              })}
              type="text"
              placeholder={errors["name"] ? errors["name"].message : "Имя"}
              style={{
                borderColor: errors["name"] ? "red" : "#333333",
              }}
            />
          </div>
          <div>
            <label>Фамилия Пациента:</label>
            <input
              {...register("surname", {
                required: "Фамилия является обязательным полем",
              })}
              type="text"
              placeholder={
                errors["surname"] ? errors["surname"].message : "Фамилия"
              }
              style={{
                borderColor: errors["surname"] ? "red" : "#333333",
              }}
            />
          </div>
          <div>
            <label>Отчество Пациента:</label>
            <input
              {...register("patronymic")}
              type="text"
              placeholder="Отчество"
            />
          </div>
          <div className={cp.position__wrapper}>
            <FormControl fullWidth size="small" error={errors["isMale"]}>
              <label>Пол:</label>
              <Controller
                name="isMale"
                control={control}
                defaultValue={""}
                rules={{ required: "Пол является обязательным полем" }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    labelId={cp.select_label_position}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em className={cp.placeholder}>Выберите пол</em>
                    </MenuItem>
                    <MenuItem value={true}>Мужской</MenuItem>
                    <MenuItem value={false}>Женский</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <div className={cp.birthday__wrapper}>
            <label htmlFor="">Дата рождения</label>
            <Controller
              name="birthDate"
              control={control}
              defaultValue={null}
              rules={{
                required: "Дата рождения является обязательным полем",
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
            <label htmlFor="">Почта</label>
            <input
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder={errors["email"] ? errors["email"].message : "Почта"}
              style={{
                borderColor: errors["email"] ? "red" : "#333333",
              }}
              type="text"
            />
          </div>
          <div className={cp.phone__input}>
            <label htmlFor="field__phone">Телефон</label>
            <Controller
              name="phone"
              control={control}
              defaultValue={""}
              render={({ field, fieldState: { error } }) => (
                <PhoneInput
                  {...field}
                  id="field__phone"
                  country={"kg"}
                  inputStyle={{
                    border: error ? "1px solid red" : "0.5px solid #333333",
                    borderRadius: "5px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    height: "auto !important",
                  }}
                />
              )}
            />
          </div>
          <div className={cp.city__wrapper}>
            <FormControl fullWidth size="small" error={errors["cityId"]}>
              <label>Город</label>
              <Controller
                name="cityId"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Город является обязательным полем",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      labelId={cp.select_label_position}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em className={cp.placeholder}>Выберите город</em>
                      </MenuItem>
                      {arrCities &&
                        arrCities.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.city}
                          </MenuItem>
                        ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </div>
          <div>
            <FormControl size="small" fullWidth error={errors["districtId"]}>
              <label>Район</label>
              <Controller
                name="districtId"
                control={control}
                defaultValue={""}
                rules={{ required: "Район является обязательным полем" }}
                render={({ field, fieldState: { error } }) => (
                  <Select {...field} labelId={cp.district__label} displayEmpty>
                    <MenuItem value="">
                      <em className={cp.placeholder}>Выберите район</em>
                    </MenuItem>
                    {district &&
                      district.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.district}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <div>
            <label htmlFor="field__patient_address">Адрес Пациента:</label>
            <input
              {...register("street")}
              type="text"
              id="field__patient_address"
              placeholder="Адрес пациента"
            />
          </div>
          <div>
            <FormControl size="small" fullWidth>
              <label>Откуда узнал</label>
              <Controller
                name="where"
                control={control}
                defaultValue={""}
                render={({ field, fieldState: { error } }) => (
                  <Select {...field} labelId={cp.district__label} displayEmpty>
                    <MenuItem value="">
                      <em className={cp.placeholder}>
                        Выберите откуда узнал пациент
                      </em>
                    </MenuItem>
                    {where &&
                      where.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <div>
            <FormControl size="small" fullWidth error={errors["patientTypeId"]}>
              <label>Тип Пациента:</label>
              <Controller
                name="patientTypeId"
                control={control}
                defaultValue={""}
                rules={{
                  required: "'Тип Пациента' является обязательным полем",
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select {...field} labelId={cp.district__label} displayEmpty>
                    <MenuItem value="">
                      <em className={cp.placeholder}>Выберите тип пациента</em>
                    </MenuItem>
                    {patientType &&
                      patientType.map((item, index) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.patientType}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <div>
            <label>Статус Пациента:</label>
            <FormControl
              size="small"
              fullWidth
              error={errors["patientStatusId"]}
            >
              <Controller
                name="patientStatusId"
                control={control}
                defaultValue={""}
                rules={{
                  required: "'Статус Пациента' является обязательным полем",
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select {...field} labelId={cp.district__label} displayEmpty>
                    <MenuItem value="">
                      <em className={cp.placeholder}>
                        Выберите статус пациента
                      </em>
                    </MenuItem>
                    {patientStatus &&
                      patientStatus.map((item, index) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.patientStatus}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </div>
        <button
          onClick={handleSubmit(handleFormSubmit)}
          className={cp.create__patient_btn}
        >
          Создать
        </button>
        <button onClick={onClose} className={cp.cancel__patient_btn}>Отменить</button>
      </div>
    </div>
  );
};

export default CreatePatient;
