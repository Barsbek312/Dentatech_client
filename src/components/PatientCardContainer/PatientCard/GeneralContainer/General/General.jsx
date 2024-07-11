import React from "react";
import g from "./General.module.css";
import {
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

const General = ({
  isEdit,
  handleSubmit,
  changeGeneralInfo,
  onClickChangeGeneralInfo,
  onClickCancel,
  patientCard,
  treatingDentist,
  control,
  patientStatus,
  patientType,
  where,
  district,
  city,
  errors
}) => {
  return (
    <div className="container">
      <div className={g.general__wrapper}>
        <div className={g.change__wrapper}>
          {isEdit ? (
            <Button
              onClick={handleSubmit(changeGeneralInfo)}
              style={{
                backgroundColor: "#272A68",
              }}
              variant="contained"
            >
              Сохранить
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={onClickChangeGeneralInfo}
              style={{
                backgroundColor: "#272A68",
              }}
            >
              Изменить
            </Button>
          )}
          {isEdit && (
            <Button
              variant="contained"
              onClick={onClickCancel}
              style={{
                backgroundColor: "#272A68",
              }}
            >
              Отменить
            </Button>
          )}
        </div>
        <div></div>
        <div className={g.main__info}>
          <div className={g.main__info_inputs}>
            <Controller
              name="surname"
              control={control}
              defaultValue={patientCard && patientCard["surname"]}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={"Фамилия"}
                  size="small"
                  value={
                    !isEdit
                      ? patientCard && patientCard["surname"]
                      : field.value
                  }
                  inputProps={{
                    readOnly: !isEdit,
                  }}
                  InputLabelProps={{ shrink: true }}
                  focused={isEdit ? undefined : false}
                  style={{
                    borderColor: "#333333",
                  }}
                ></TextField>
              )}
            />
            <Controller
              name="name"
              control={control}
              defaultValue={patientCard && patientCard["name"]}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={"Имя"}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={
                    !isEdit ? patientCard && patientCard["name"] : field.value
                  }
                  inputProps={{
                    readOnly: !isEdit,
                  }}
                  focused={isEdit ? undefined : false}
                ></TextField>
              )}
            />
            <Controller
              name="patronymic"
              control={control}
              defaultValue={patientCard && patientCard["patronymic"]}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={"Отчество"}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={
                    !isEdit
                      ? patientCard && patientCard["patronymic"]
                      : field.value
                  }
                  inputProps={{
                    readOnly: !isEdit,
                  }}
                  focused={isEdit ? undefined : false}
                ></TextField>
              )}
            />
          </div>
          <div className={g.birth_of_date__wrapper}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="birthDate"
                control={control}
                defaultValue={patientCard && patientCard["birthDate"]}
                render={({ field, fieldState: { error } }) => (
                  <DateField
                    {...field}
                    label="Дата рождения"
                    InputLabelProps={{ shrink: true }}
                    format="DD-MM-YYYY"
                    size="small"
                    value={
                      isEdit
                        ? field.value ||
                          (patientCard && dayjs(patientCard["birthDate"])) ||
                          null
                        : (patientCard && dayjs(patientCard["birthDate"])) ||
                          null
                    }
                    inputProps={{
                      readOnly: !isEdit,
                    }}
                    focused={isEdit ? undefined : false}
                  />
                )}
              />
            </LocalizationProvider>
            {isEdit ? (
              <Controller
                name="cityId"
                control={control}
                defaultValue={patientCard && patientCard["cityId"]}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    labelId={g.select_label_position}
                    label={"Город"}
                    size="small"
                    style={{ width: "30%" }}
                    value={field.value}
                  >
                    {patientCard &&
                      city &&
                      city.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.city}
                          </MenuItem>
                        );
                      })}
                  </Select>
                )}
              />
            ) : (
              <TextField
                label={"Город"}
                InputLabelProps={{ shrink: true }}
                size="small"
                value={
                  patientCard &&
                  patientCard["city"] &&
                  patientCard["city"]["city"]
                }
                inputProps={{
                  readOnly: true,
                }}
                style={{ width: "30%" }}
                focused={false}
              ></TextField>
            )}
            {isEdit ? (
              <Controller
                name="districtId"
                control={control}
                defaultValue={patientCard && patientCard["districtId"]}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    labelId={g.select_label_position}
                    label={"Район"}
                    value={field.value}
                    size="small"
                    style={{ width: "30%" }}
                  >
                    {patientCard &&
                      district &&
                      district.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.district}
                          </MenuItem>
                        );
                      })}
                  </Select>
                )}
              />
            ) : (
              <TextField
                label={"Район"}
                InputLabelProps={{ shrink: true }}
                size="small"
                value={
                  patientCard &&
                  patientCard["district"] &&
                  patientCard["district"]["district"]
                }
                inputProps={{
                  readOnly: true,
                }}
                style={{ width: "30%" }}
                focused={false}
              ></TextField>
            )}
          </div>
          <div className={g.habitation__wrapper}>
            <Controller
              name="street"
              control={control}
              defaultValue={patientCard && patientCard["street"]}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={"Улица"}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={
                    !isEdit ? patientCard && patientCard["street"] : field.value
                  }
                  inputProps={{
                    readOnly: !isEdit,
                  }}
                  style={{ width: "30%" }}
                  focused={isEdit ? undefined : false}
                ></TextField>
              )}
            />
            {isEdit ? (
              <FormControl fullWidth size="small">
                <InputLabel id={g.select_label_isMale}>Пол</InputLabel>
                <Controller
                  name="isMale"
                  control={control}
                  defaultValue={patientCard && patientCard["isMale"].toString()}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      labelId={g.select_label_isMale}
                      label={"Пол"}
                      value={
                        field.value ||
                        (patientCard && patientCard["isMale"].toString()) ||
                        null
                      }
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <MenuItem value={"true"}>Мужской</MenuItem>
                      <MenuItem value={"false"}>Женский</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            ) : (
              <TextField
                label={"Пол"}
                InputLabelProps={{ shrink: true }}
                size="small"
                value={
                  (patientCard && patientCard["isMale"] && "Мужской") ||
                  "Женский"
                }
                inputProps={{
                  readOnly: true,
                }}
                style={{ width: "30%" }}
                focused={false}
              ></TextField>
            )}
          </div>
          <div className={g.reception__wrapper + " " + g.common__wrapper}>
            <div className={g.reception__wrapper_first}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Первый прием"
                  format="DD-MM-YYYY"
                  size="small"
                  inputProps={{
                    readOnly: true,
                  }}
                  value={
                    patientCard &&
                    patientCard["firstPatientReception"] &&
                    patientCard["firstPatientReception"]["end"] &&
                    dayjs(patientCard["firstPatientReception"]["end"])
                  }
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                />
                <DateField
                  label="Последний прием"
                  format="DD-MM-YYYY"
                  size="small"
                  inputProps={{
                    readOnly: true,
                  }}
                  value={
                    patientCard &&
                    patientCard["lastPatientReception"] &&
                    patientCard["lastPatientReception"]["end"] &&
                    dayjs(patientCard["lastPatientReception"]["end"])
                  }
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                />
              </LocalizationProvider>
              <TextField
                label={"Лечащие врачи"}
                size="small"
                inputProps={{
                  readOnly: true,
                }}
                value={treatingDentist}
                InputLabelProps={{ shrink: true }}
                focused={false}
              ></TextField>
            </div>
            <div className={g.reception__wrapper_third}>
              {isEdit ? (
                <Controller
                  name="where"
                  control={control}
                  defaultValue={patientCard && patientCard["where"]}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      labelId={g.select_label_position}
                      label={"Откуда узнал"}
                      value={field.value}
                      size="small"
                      style={{ width: "30%" }}
                    >
                      {patientCard &&
                        where.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  )}
                />
              ) : (
                <TextField
                  label={"Откуда узнал"}
                  size="small"
                  value={patientCard && patientCard["where"]}
                  inputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                ></TextField>
              )}
              {isEdit ? (
                <Controller
                  name="patientTypeId"
                  control={control}
                  defaultValue={patientCard && patientCard["patientTypeId"]}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      labelId={g.select_label_position}
                      label={"Тип пациента"}
                      value={field.value}
                      size="small"
                      style={{ width: "30%" }}
                    >
                      {patientCard &&
                        patientType &&
                        patientType.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.patientType}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  )}
                />
              ) : (
                <TextField
                  label={"Тип пациента"}
                  size="small"
                  value={
                    patientCard &&
                    patientCard["patientType"] &&
                    patientCard["patientType"]["patientType"]
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                ></TextField>
              )}
              {isEdit ? (
                <Controller
                  name="patientStatusId"
                  control={control}
                  defaultValue={patientCard && patientCard["patientStatusId"]}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      labelId={g.select_label_position}
                      label={"Статус пациента"}
                      value={field.value}
                      size="small"
                      style={{ width: "30%" }}
                    >
                      {patientCard &&
                        patientStatus &&
                        patientStatus.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.id}>
                              {item.patientStatus}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  )}
                />
              ) : (
                <TextField
                  label={"Статус пациента"}
                  size="small"
                  value={
                    patientCard &&
                    patientCard["patientStatus"] &&
                    patientCard["patientStatus"]["patientStatus"]
                  }
                  inputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                ></TextField>
              )}
            </div>
            <div className={g.reception__wrapper_third}></div>
            <div className={g.reception__wrapper_second}>
              <Controller
                name="description"
                control={control}
                defaultValue={patientCard && patientCard["description"]}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={"Комментарий"}
                    size="full"
                    value={
                      !isEdit
                        ? patientCard && patientCard["description"]
                        : field.value
                    }
                    inputProps={{
                      readOnly: !isEdit,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    focused={isEdit ? undefined : false}
                  ></TextField>
                )}
              />
            </div>
          </div>
        </div>
        <div className={g.contacts}>
          <h3>Контакты</h3>
          <div className={g.main__info_inputs}>
            {isEdit ? (
              <div style={{ width: "30%" }}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={patientCard && patientCard["phone"]}
                  render={({ field, fieldState: { error } }) => (
                    <PhoneInput
                      {...field}
                      label={"Номер телефона"}
                      size="small"
                      country={"kg"}
                      value={
                        isEdit
                          ? field.value ||
                            (patientCard && patientCard["phone"]) ||
                            null
                          : (patientCard && patientCard["phone"]) || null
                      }
                      inputProps={{
                        readOnly: !isEdit,
                      }}
                      InputLabelProps={{ shrink: true }}
                      focused={isEdit ? undefined : false}
                    />
                  )}
                />
              </div>
            ) : (
              <TextField
                label="Номер телефона"
                size="small"
                value={patientCard && patientCard["phone"]}
                inputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                focused={false}
              ></TextField>
            )}
            <div>
              <Controller
                name="email"
                control={control}
                defaultValue={patientCard && patientCard["email"]}
                rules={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label={"E-mail"}
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : null}
                    value={
                      isEdit ? field.value : patientCard && patientCard["email"]
                    }
                    inputProps={{
                      readOnly: !isEdit,
                    }}
                    InputLabelProps={{ shrink: true }}
                    focused={isEdit ? undefined : false}
                    style={{ width: "100%" }}
                  ></TextField>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
