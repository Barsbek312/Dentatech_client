import React, { useEffect, useRef, useState } from "react";
import p from "./Personal.module.css";
// import searchIcon from './../../assets/images/personal__images/search.svg';
import { Controller, useForm } from "react-hook-form";
import copy from "./../../assets/images/personal__images/copy.svg";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { createUser, getPositions } from "../../redux/user";
import Notification from "../Common/Notification/Notification";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getBranchesByClinicId } from "../../redux/branch";
import eye_vis from "./../../assets/images/login__images/eye-off-line.svg";
import add_staff_img from "./../../assets/images/common__images/add.svg";
import personal_card_img from "./../../assets/images/common__images/user-card.svg";
import dayjs from "dayjs";
import { getPersonal } from "../../redux/personal";
import "./PersonalForm.css";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../redux/notification";
import { useNavigate } from "react-router-dom";

const Personal = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrPositions, setArrPositions] = useState([]);
  const { user, positions } = useSelector((state) => state.user);
  const { branches } = useSelector((state) => state.branch);
  const { personal } = useSelector((state) => state.personal);
  const [personalList, setPersonalList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isVisibilePassword, setIsVisibilePassword] = useState(false);
  // const [listOfPersonalBlocks, setListOfPersonalBlocks] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOnPasswordVisibility = () => {
    setIsVisibilePassword(!isVisibilePassword);
  };

  useEffect(() => {
    const getAllBranches = async (clinicId) => {
      await dispatch(getPersonal(clinicId));
      await dispatch(getPositions());
      const res = await dispatch(getBranchesByClinicId(clinicId));
    };

    if (user && user.branchId && user.clinicId) {
      getAllBranches(user.clinicId);
    }
  }, [user]);

  useEffect(() => {
    setArrPositions(positions);
  }, [positions]);

  useEffect(() => {
    if (user && user.personal && counter === 0) {
      setCounter((prevCounter) => (prevCounter += 1));
      const events = user.personal;
      let personal = [];
      for (let i in events) {
        personal.push(events[i].name + " " + events[i].surname);
      }

      setPersonalList(personal);
    }
  }, [user]);

  const [isShow, setIsShow] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const wrapperOfModalWindow = useRef(null);
  const modalWindow = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmitAddPersonal = async (data, event) => {
    event.preventDefault();
    data["isAdmin"] = data["isAdmin"] === "true";
    data["staffStatusId"] = 1;
    try {
      const res = await dispatch(createUser({ ...data, isRegister: false }));
      if (res.type === "user/register/fulfilled") {
        dispatch(setErrorNotification(false));
        dispatch(setNotificationText("Персонал успешно добавлен"));
      }
    } catch (err) {
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Добавить персонал не удалось"));
    }
    dispatch(showNotification());
    removeNotification(dispatch);
    setIsShow(false);
  };

  const handleClickContainer = () => {
    setIsShow(false);
  };

  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  const handleChangeSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  const renderPesonal = (listOfPersonal) => {
    if (user && user.id) {
      return (
        listOfPersonal &&
        listOfPersonal
          .filter(
            (item) =>
              item.id !== user.id &&
              (item?.["name"]
                .toLowerCase()
                .includes(inputValue.toLowerCase()) ||
                item?.["surname"]
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()))
          )
          .map((item) => {
            return (
              <li className={p.staff__list_item}>
                <div className={p.staff__info_wrapper}>
                  <h2 className="ellipsis_line_1">
                    {(item?.name &&
                      item?.surname &&
                      `${item.name} ${item.surname}`) ||
                      "Unknown"}
                  </h2>
                  <span>
                    {(item &&
                      item["staffPosition"] &&
                      item["staffPosition"]?.["staffPosition"]) ||
                      "Unknown"}
                  </span>
                </div>
                <div>
                  <div
                    className={p.personal__card_wrapper}
                    onClick={() => navigate(`/profile/${item.id}`)}
                  >
                    <img src={personal_card_img} alt="patient-card-logo" />
                  </div>
                </div>
              </li>
            );
          })
      );
    }
  };

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
                  onClick={() => {
                    setIsShow(false);
                    reset();
                  }}
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
                        onClick={() => setIsShow(true)}
                      >
                        <img src={add_staff_img} alt="add-staff-logo" />
                      </div>
                      <span onClick={() => setIsShow(true)}>
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
