import React, { useEffect, useState } from "react";
import a from "./Auth.module.css";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { NavLink } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";
import Continuation from "./Continuation/Continuation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

const Auth = ({
  handleSubmit,
  handleFormSubmit,
  isContinued,
  handleClickOnBack,
  register,
  errors,
  control,
  isVisibilePassword,
  handleClickOnPasswordVisibility,
  isVisibilePasswordAgain,
  handleClickOnPasswordVisibilityAgain,
  arrCities,
  arrPositions,
  textError
}) => {
  return (
    <main className={a.auth__main}>
      <div className="container">
        <div className={a.auth__wrapper}>
          <form className={a.form} onSubmit={handleSubmit(handleFormSubmit)}>
            {isContinued && (
              <div className={a.back_to_begin}>
                <span onClick={handleClickOnBack}>Назад</span>
              </div>
            )}
            {isContinued ? (
              <Continuation
                register={register}
                errors={errors}
                isVisibilePassword={isVisibilePassword}
                handleClickOnPasswordVisibility={
                  handleClickOnPasswordVisibility
                }
                isVisibilePasswordAgain={isVisibilePasswordAgain}
                handleClickOnPasswordVisibilityAgain={
                  handleClickOnPasswordVisibilityAgain
                }
              />
            ) : (
              <>
                <div className={a.name__wrapper}>
                  <label htmlFor="field__name">Имя</label>
                  <input
                    {...register("name", {
                      required: "Имя является обязательным полем",
                    })}
                    type="text"
                    id="field__name"
                    placeholder={
                      errors["name"] ? errors["name"].message : "Имя"
                    }
                    style={{
                      borderColor: errors["name"]
                        ? "red"
                        : "rgba(196, 196, 196, 0.50)",
                    }}
                  />
                </div>
                <div className={a.surname__wrapper}>
                  <label htmlFor="field__surename">Фамилия</label>
                  <input
                    {...register("surname", {
                      required: "Фамилия является обязательным полем",
                    })}
                    type="text"
                    id="field__surename"
                    placeholder={
                      errors["surname"] ? errors["surname"].message : "Фамилия"
                    }
                    style={{
                      borderColor: errors["surname"]
                        ? "red"
                        : "rgba(196, 196, 196, 0.50)",
                    }}
                  />
                </div>
                <div className={a.phone__wrapper}>
                  <label htmlFor="field__phone">Телефон</label>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={""}
                    rules={{ required: "Телефон является обязательным полем" }}
                    render={({ field, fieldState: { error } }) => (
                      <PhoneInput
                        {...field}
                        id="field__phone"
                        country={"kg"}
                        inputStyle={{
                          border: error
                            ? "1px solid red"
                            : "0.5px solid #333333",
                          borderRadius: "5px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          height: "auto !important",
                        }}
                      />
                    )}
                  />
                </div>
                <div className={a.position__wrapper}>
                  <FormControl fullWidth size="small" error={errors["isMale"]}>
                    <label htmlFor={a.select_label_position}>Пол</label>
                    <Controller
                      name="isMale"
                      control={control}
                      defaultValue={""}
                      rules={{ required: "Пол является обязательным полем" }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={a.select_label_position}
                          displayEmpty
                        >
                          <MenuItem value={""}>
                            <em className={a.placeholder}>Выберите пол</em>
                          </MenuItem>
                          <MenuItem value={true}>Мужской</MenuItem>
                          <MenuItem value={false}>Женский</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div className={a.birthday__wrapper}>
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
                <div className={a.surname__wrapper}>
                  <label htmlFor="field__clinic">Клиника</label>
                  <input
                    {...register("clinic", {
                      required: "Клиника является обязательным полем",
                    })}
                    type="text"
                    id="field__clinic"
                    placeholder={
                      errors["clinic"]
                        ? errors["clinic"].message
                        : "Название клиники"
                    }
                    style={{
                      borderColor: errors["clinic"]
                        ? "red"
                        : "rgba(196, 196, 196, 0.50)",
                    }}
                  />
                </div>
                <div className={a.surname__wrapper}>
                  <label htmlFor="field__branch">Филиал(название)</label>
                  <input
                    {...register("branch", {
                      required: "Филиал является обязательным полем",
                    })}
                    type="text"
                    id="field__branch"
                    placeholder={
                      errors["branch"] ? errors["branch"].message : "Название"
                    }
                    style={{
                      borderColor: errors["branch"]
                        ? "red"
                        : "rgba(196, 196, 196, 0.50)",
                    }}
                  />
                </div>
                <div className={a.city__wrapper}>
                  <FormControl fullWidth size="small" error={errors["cityId"]}>
                    <label htmlFor={a.select_label_position}>Город</label>
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
                            labelId={a.select_label_position}
                            displayEmpty
                          >
                            <MenuItem value={""}>
                              <em>Выберите город</em>
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
                <div className={a.surname__wrapper}>
                  <label htmlFor="field__street">Адрес</label>
                  <input
                    {...register("street", {
                      required: "Адрес является обязательным полем",
                    })}
                    type="text"
                    id="field__street"
                    placeholder={
                      errors["street"] ? errors["street"].message : "Адрес"
                    }
                    style={{
                      borderColor: errors["street"]
                        ? "red"
                        : "rgba(196, 196, 196, 0.50)",
                    }}
                  />
                </div>
                <div className={a.position__wrapper}>
                  <FormControl
                    fullWidth
                    size="small"
                    error={errors["staffPositionId"]}
                  >
                    <label htmlFor={a.select_label_position}>Должность</label>
                    <Controller
                      name="staffPositionId"
                      control={control}
                      defaultValue={""}
                      rules={{
                        required: "Позиция является обязательным полем",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Select
                            {...field}
                            labelId={a.select_label_position}
                            displayEmpty
                          >
                            <MenuItem value={""}>
                              <em>Выбрите вашу должность</em>
                            </MenuItem>
                            {arrPositions &&
                              arrPositions.map((position) => (
                                <MenuItem key={position.id} value={position.id}>
                                  {position.staffPosition}
                                </MenuItem>
                              ))}
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </div>
              </>
            )}
            <p className={a.text_error}>{textError}</p>
            {!isContinued ? (
              <button type="submit" className={a.button}>
                Продолжить
              </button>
            ) : (
              <button type="submit" className={a.button}>
                Зарегистрироваться
              </button>
            )}
          </form>
          <div className={a.login}>
            <NavLink to="/login">У вас уже есть аккаунт?</NavLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
