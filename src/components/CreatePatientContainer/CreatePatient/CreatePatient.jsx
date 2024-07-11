import React from "react";
import cp from "./CreatePatient.module.css";
import "./CreatePatient.css";
import { Controller } from "react-hook-form";
import { FormControl, Select, MenuItem } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreatePatient = ({
  onClose,
  stopPropagation,
  register,
  errors,
  control,
  arrCities,
  district,
  where,
  patientType,
  patientStatus,
  handleSubmit,
  handleFormSubmit,
}) => {
  return (
    <div className={cp.modal_overlay} onClick={onClose}>
      <div className={cp.modal_content} onClick={stopPropagation}>
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
        <button onClick={onClose} className={cp.cancel__patient_btn}>
          Отменить
        </button>
      </div>
    </div>
  );
};

export default CreatePatient;
