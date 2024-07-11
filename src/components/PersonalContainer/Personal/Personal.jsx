import React from "react";
import p from "./Personal.module.css";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { FormControl, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import eye_vis from "./../../../assets/images/login__images/eye-off-line.svg";
import add_staff_img from "./../../../assets/images/common__images/add.svg";
import "./PersonalForm.css";

const Personal = ({
  isShow,
  wrapperOfModalWindow,
  handleClickContainer,
  modalWindow,
  handleClickModal,
  handleSubmit,
  onSubmitAddPersonal,
  register,
  errors,
  control,
  branches,
  arrPositions,
  onClickCancelAddPersonal,
  user,
  onClickAddPersonal,
  handleChangeSearchInput,
  inputValue,
  renderPesonal,
  personal,
  isVisibilePassword,
  handleClickOnPasswordVisibility
}) => {
  return (
    <main>
      <div className="container">
        <div
          className={p.add__personal_wrapper}
          style={{ display: isShow ? "flex" : "none" }}
          ref={wrapperOfModalWindow}
          onClick={handleClickContainer}
        >
          <div
            className={p.add__personal}
            ref={modalWindow}
            onClick={handleClickModal}
          >
            <form onSubmit={handleSubmit(onSubmitAddPersonal)}>
              <div>
                <div className={p.name__wrapper}>
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
                      borderColor: errors["name"] ? "red" : "#333333",
                    }}
                  />
                </div>
                <div className={p.surname__wrapper}>
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
                      borderColor: errors["surname"] ? "red" : "#333333",
                    }}
                  />
                </div>
                <div className={p.phone__wrapper}>
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
                <div className={p.isMale__wrapper}>
                  <FormControl fullWidth size="small" error={errors["isMale"]}>
                    <label htmlFor="">Пол</label>
                    <Controller
                      name="isMale"
                      control={control}
                      defaultValue={""}
                      rules={{ required: "Пол является обязательным полем" }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={p.select_label_isMale}
                          className={p.item__wrapper}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em className={p.placeholder}>Выберите пол</em>
                          </MenuItem>
                          <MenuItem value={true}>Мужской</MenuItem>
                          <MenuItem value={false}>Женский</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div className={p.birthday__wrapper}>
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
                <div className={p.branch__wrapper}>
                  <FormControl
                    fullWidth
                    size="small"
                    error={errors["branchId"]}
                  >
                    <label htmlFor={p.select_label_position}>Филиал</label>
                    <Controller
                      name="branchId"
                      control={control}
                      defaultValue={""}
                      rules={{ required: "Филиал является обязательным полем" }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={p.select_label_position}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em className={p.placeholder}>Выберите пол</em>
                          </MenuItem>
                          {branches &&
                            branches.map((branch) => (
                              <MenuItem value={branch.id} key={branch.id}>
                                {branch.branch}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div className={p.isAdmin__wrapper}>
                  <FormControl fullWidth size="small" error={errors["isAdmin"]}>
                    <label htmlFor={p.select_label_isAdmin}>Статус</label>
                    <Controller
                      name="isAdmin"
                      control={control}
                      defaultValue={""}
                      rules={{ required: "Статус является обязательным полем" }}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={p.select_label_isAdmin}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em className={p.placeholder}>Выберите пол</em>
                          </MenuItem>
                          <MenuItem value={"true"}>Админ</MenuItem>
                          <MenuItem value={"false"}>Не админ</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </div>
                <div className={p.position__wrapper}>
                  <FormControl
                    fullWidth
                    size="small"
                    error={errors["staffPositionId"]}
                  >
                    <label htmlFor={p.select_label_position}>Должность</label>
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
                            labelId={p.select_label_position}
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em className={p.placeholder}>Выберите пол</em>
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
                <div className={p.email__wrapper}>
                  <label htmlFor="">Почта</label>
                  <input
                    {...register("email", {
                      required: "Почта является обязательным полем",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    placeholder={
                      errors["email"] ? errors["email"].message : "Почта"
                    }
                    style={{
                      borderColor: errors["email"] ? "red" : "#333333",
                    }}
                    type="text"
                  />
                </div>
                <div className={p.password__wrapper}>
                  <label htmlFor="field__password">Пароль</label>
                  <input
                    {...register("password", {
                      required: "Пароль является обязательным полем",
                    })}
                    type={isVisibilePassword ? "text" : "password"}
                    id="field__password"
                    placeholder={
                      errors["password"]
                        ? errors["password"].message
                        : "Придумайте пароль работнику"
                    }
                    autoComplete="on"
                    style={{
                      borderColor: errors["password"] ? "red" : "#333333",
                    }}
                  />
                  <div
                    className={p.password__visibility_wrapper}
                    onClick={handleClickOnPasswordVisibility}
                  >
                    <img src={eye_vis} alt="password-visibility" />
                  </div>
                </div>
                <button
                  type="submit"
                  className={
                    p.add__personal_button + " " + p.add__personal__button_first
                  }
                >
                  Добавить
                </button>
                <button
                  type="button"
                  className={p.add__personal_button}
                  onClick={onClickCancelAddPersonal}
                >
                  Отменить
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={p.header}>
          <h2>Персонал</h2>
        </div>
        <div className={p.me_wrapper}>
          <div>
            <span>Вы</span>
          </div>
          <div>
            <h2 className="ellipsis_line_1">
              {(user &&
                user.surname &&
                user.name &&
                `${user.name} ${user.surname}`) ||
                "Unknown"}
            </h2>
          </div>
        </div>
        <div className={p.main}>
          <div className={p.main_header}>
            <div className={p.left_wrapper}>
              <div className={p.left}>
                <span>Все</span>
                <div className={p.add__staff_wrapper}>
                  {user && user.isAdmin && (
                    <>
                      <div
                        className={p.add__logo_wrapper}
                        onClick={onClickAddPersonal}
                      >
                        <img src={add_staff_img} alt="add-staff-logo" />
                      </div>
                      <span onClick={onClickAddPersonal}>
                        Добавить в персонал
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className={p.pos_wrapper}>
                <span>Должность</span>
              </div>
            </div>
            <div className={p.search_wrapper}>
              <div className={p.search}>
                <input
                  type="text"
                  onChange={handleChangeSearchInput}
                  value={inputValue}
                />
              </div>
            </div>
          </div>
          <div className={p.main_body}>
            <ul className={p.main__body_list}>{renderPesonal(personal)}</ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Personal;
