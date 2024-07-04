import React, { useEffect, useRef, useState } from "react";
import pr from "./Profile.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { useForm } from "react-hook-form";
import eye_vis from "./../../assets/images/login__images/eye-off-line.svg";
import { changePassword } from "../../redux/user";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../redux/notification";
import change_ava_img from "./../../assets/images/common__images/change_black.svg";
import { getStaffPatientList } from "../../redux/patient";
import { getStaffProfile } from "../../redux/personal";
import Nothing from "../Common/Nothing/Nothing";

const Profile = () => {
  const { user, isAuth } = useSelector((state) => state.user);
  const { staffPatientList } = useSelector((state) => state.patient);
  const { profileStaff } = useSelector((state) => state.personal);

  const dispath = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [isShow, setIsShow] = useState(false);
  const wrapperOfModalWindow = useRef(null);
  const modalWindow = useRef(null);
  const [isVisibilePasswordOld, setIsVisibilePasswordOld] = useState(false);
  const [isVisibilePasswordNew, setIsVisibilePasswordNew] = useState(false);
  const [categoryPatientList, setCategoryPatientList] = useState(null);
  const [isShowAllPatientList, setIsShowAllPatientList] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(null);

  useEffect(() => {
    if (param && param.id && !profileLoaded && user) {
      if (param.id === "me" && isAuth) {
        setShowProfile(user);
      } else {
        dispath(getStaffProfile(param.id));
      }
      setProfileLoaded(true);
    }
  }, [param, isAuth, profileLoaded, user]);

  useEffect(() => {
    if (param && param.id !== "me") {
      setShowProfile(profileStaff);
    } else {
      setShowProfile(user);
    }
  }, [param, profileStaff]);

  useEffect(() => {
    if (showProfile && showProfile.id) {
      dispath(getStaffPatientList(showProfile.id));
    }
  }, [showProfile]);

  const handleClickOnPasswordVisibility = () => {
    setIsVisibilePasswordOld(!isVisibilePasswordOld);
  };

  const handleClickOnPasswordVisibilityAgain = () => {
    setIsVisibilePasswordNew(!isVisibilePasswordNew);
  };

  const handleClickContainer = () => {
    setIsShow(false);
  };

  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (staffPatientList) {
      const newCategoryPatientList = {
        waiting: [],
        active: [],
        finished: [],
      };
      staffPatientList.forEach((item) => {
        if (item.patientStatusId === 1) {
          newCategoryPatientList.waiting.push(item);
        } else if (item.patientStatusId === 2) {
          newCategoryPatientList.active.push(item);
        } else if (item.patientStatusId === 3) {
          newCategoryPatientList.finished.push(item);
        }
      });
      setCategoryPatientList(newCategoryPatientList);
    }
  }, [staffPatientList]);

  const onSubmitChangePassword = async (data, event) => {
    event.preventDefault();
    if (isAuth && user) {
      const res = await dispath(changePassword({ id: user.id, data }));
      if (res.type === "user/changePassowrd/fulfilled") {
        dispath(setErrorNotification(false));
        dispath(
          setNotificationText(
            res?.payload?.data?.message || "Пароль был успешно изменен"
          )
        );
        setIsShow(false);
      } else {
        dispath(setErrorNotification(true));
        dispath(
          setNotificationText(
            res?.payload?.response?.data?.message || "Пароль не был изменен"
          )
        );
      }
      dispath(showNotification());
      removeNotification(dispath);
    }
  };

  return (
    <main>
      <div className={`${pr.profile__container} container`}>
        <div
          className={pr.change__password_wrapper}
          style={{ display: isShow ? "flex" : "none" }}
          ref={wrapperOfModalWindow}
          onClick={handleClickContainer}
        >
          <div
            className={pr.change__password}
            ref={modalWindow}
            onClick={handleClickModal}
          >
            <form onSubmit={handleSubmit(onSubmitChangePassword)}>
              <div>
                <div className={pr.password__wrapper}>
                  <label htmlFor="field__old_password">
                    Используемый пароль
                  </label>
                  <input
                    {...register("oldPassword", {
                      required:
                        "Используемый пароль является обязательным полем",
                    })}
                    type={isVisibilePasswordOld ? "text" : "password"}
                    id="field__old_password"
                    placeholder={
                      errors["oldPassword"]
                        ? errors["oldPassword"].message
                        : "Введите используемый пароль"
                    }
                    style={{
                      borderColor: errors["oldPassword"]
                        ? "red"
                        : "#333333",
                    }}
                    autoComplete="on"
                  />
                  <div
                    className={pr.password__visibility_wrapper}
                    onClick={handleClickOnPasswordVisibility}
                  >
                    <img src={eye_vis} alt="password-visibility" />
                  </div>
                </div>
                <div className={pr.password__wrapper}>
                  <label htmlFor="field__new_password">Новый пароль</label>
                  <input
                    {...register("newPassword", {
                      required: "Новый пароль является обязательным полем",
                    })}
                    type={isVisibilePasswordNew ? "text" : "password"}
                    id="field__new_password"
                    placeholder={
                      errors["newPassword"]
                        ? errors["newPassword"].message
                        : "Введите новый пароль"
                    }
                    style={{
                      borderColor: errors["newPassword"]
                        ? "red"
                        : "#333333",
                    }}
                    autoComplete="on"
                  />
                  <div
                    className={pr.password__visibility_wrapper}
                    onClick={handleClickOnPasswordVisibilityAgain}
                  >
                    <img src={eye_vis} alt="password-visibility" />
                  </div>
                </div>
                <button type="submit" className={pr.change__password_button}>
                  Изменить
                </button>
                <button
                  type="button"
                  className={pr.change__password_button}
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
        <div className={pr.main__wrapper}>
          <div className={pr.header}>
            <h2>Профиль</h2>
          </div>
          <div className={pr.main}>
            <div className={pr.main_info}>
              <div className={pr.ava_wrapper}>
                <div className={pr.ava}>
                  <img src="" alt="ava" />
                </div>
                <div>
                  {param && param?.id === "me" && (
                    <button className={pr.change__ava_btn}>
                      Редактировать
                      <img src={change_ava_img} alt="change-ava" />
                    </button>
                  )}
                </div>
              </div>
              <div className={pr.text_info}>
                <div className={pr.full_name}>
                  <div>
                    <div>
                      <span>Имя</span>
                    </div>
                    <div>
                      <h1 className="ellipsis_line_1">
                        {(showProfile && showProfile.name) || "Unknown"}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Фамилия</span>
                    </div>
                    <div>
                      <h1 className="ellipsis_line_1">
                        {(showProfile && showProfile.surname) || "Unknown"}
                      </h1>
                    </div>
                  </div>
                  <form>
                    <div className={pr.password__wrapper}>
                      {param && param?.id === "me" && (
                        <>
                          <div>
                            <span>Пароль</span>
                          </div>
                          <div className={pr.password__info}>
                            <input
                              type="password"
                              value={"12345678"}
                              disabled
                              autocomplete="on"
                            />
                            <img
                              src={change_ava_img}
                              alt="change-password"
                              onClick={() => setIsShow(true)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </form>
                </div>
                <div className={pr.add_info}>
                  <div>
                    <div>
                      <span>Почта</span>
                    </div>
                    <div>
                      <h1 className="ellipsis_line_1">
                        {(showProfile && showProfile.email) || "Unknown"}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>Номер</span>
                    </div>
                    <div>
                      <h1 className="ellipsis_line_1">
                        {(showProfile && showProfile.phone) || "Unknown"}
                      </h1>
                    </div>
                  </div>
                  {/* <form action="">
                    <div>
                      {param && param?.id === "me" && (
                        <>
                          <div>
                            <span>Пароль</span>
                          </div>
                          <div className={pr.password__info}>
                            <input
                              type="password"
                              value={"12345678"}
                              disabled
                              autocomplete="on"
                            />
                            <img
                              src={change_ava_img}
                              alt="change-password"
                              onClick={() => setIsShow(true)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
            <div className={pr.dentist_patient}>
              <h3>Пациенты</h3>
              <div className={pr.patient__category_wrapper}>
                {categoryPatientList &&
                categoryPatientList.active.length === 0 &&
                categoryPatientList.waiting.length === 0 &&
                categoryPatientList.finished.length === 0 ? (
                  <Nothing text={"У вас пока нет пациентов"} />
                ) : (
                  <>
                    {categoryPatientList &&
                      categoryPatientList["active"].length > 0 && (
                        <div className={pr.category_wrapper}>
                          <span className={pr.patient_category}>
                            В процессе
                          </span>
                          <ul className={pr.patient_list}>
                            {(isShowAllPatientList
                              ? categoryPatientList.active
                              : categoryPatientList.active.slice(0, 2)
                            ).map((item) => (
                              <li
                                className={pr.patient__list_item}
                                onClick={() =>
                                  navigate(`/patient-card/${item.id}`)
                                }
                                key={item.id}
                              >
                                <div>
                                  <h2 className="ellipsis_line_3">
                                    {(item?.name &&
                                      item?.surname &&
                                      `${item.name} ${item.surname}`) ||
                                      "Unknown"}
                                  </h2>
                                  <span className="ellipisi_line_2">
                                    {(item?.phone && item.phone) || "Unknown"}
                                  </span>
                                </div>
                              </li>
                            ))}
                            {!isShowAllPatientList &&
                              (categoryPatientList.active.length > 2 ||
                                categoryPatientList.waiting.length > 2 ||
                                categoryPatientList.finished.length > 2) && (
                                <div className={pr.list__border_wrapper}>
                                  <div></div>
                                  {categoryPatientList &&
                                    categoryPatientList["finished"].length ===
                                      0 &&
                                    categoryPatientList["waiting"].length ===
                                      0 && (
                                      <span
                                        onClick={() =>
                                          setIsShowAllPatientList(true)
                                        }
                                      >
                                        Еще
                                      </span>
                                    )}
                                </div>
                              )}
                          </ul>
                        </div>
                      )}
                    {categoryPatientList &&
                      categoryPatientList["finished"].length > 0 && (
                        <div className={pr.category_wrapper}>
                          <span className={pr.patient_category}>
                            Выполненные
                          </span>
                          <ul className={pr.patient_list}>
                            {(isShowAllPatientList
                              ? categoryPatientList.finished
                              : categoryPatientList.finished.slice(0, 2)
                            ).map((item) => (
                              <li
                                className={pr.patient__list_item}
                                onClick={() =>
                                  navigate(`/patient-card/${item.id}`)
                                }
                                key={item.id}
                              >
                                <div>
                                  <h2 className="ellipsis_line_3">
                                    {(item?.name &&
                                      item?.surname &&
                                      `${item.name} ${item.surname}`) ||
                                      "Unknown"}
                                  </h2>
                                  <span className="ellipisi_line_2">
                                    {(item?.phone && item.phone) || "Unknown"}
                                  </span>
                                </div>
                              </li>
                            ))}
                            {!isShowAllPatientList &&
                              (categoryPatientList.active.length > 2 ||
                                categoryPatientList.waiting.length > 2 ||
                                categoryPatientList.finished.length > 2) && (
                                <div className={pr.list__border_wrapper}>
                                  <div></div>
                                  {categoryPatientList &&
                                    categoryPatientList["waiting"].length ===
                                      0 && (
                                      <span
                                        onClick={() =>
                                          setIsShowAllPatientList(true)
                                        }
                                      >
                                        Еще
                                      </span>
                                    )}
                                </div>
                              )}
                          </ul>
                        </div>
                      )}
                    {categoryPatientList &&
                      categoryPatientList["waiting"].length > 0 && (
                        <div className={pr.category_wrapper}>
                          <span className={pr.patient_category}>
                            В ожидании
                          </span>
                          <ul className={pr.patient_list}>
                            {(isShowAllPatientList
                              ? categoryPatientList.waiting
                              : categoryPatientList.waiting.slice(0, 2)
                            ).map((item) => (
                              <li
                                className={pr.patient__list_item}
                                onClick={() =>
                                  navigate(`/patient-card/${item.id}`)
                                }
                                key={item.id}
                              >
                                <div>
                                  <h2 className="ellipsis_line_3">
                                    {(item?.name &&
                                      item?.surname &&
                                      `${item.name} ${item.surname}`) ||
                                      "Unknown"}
                                  </h2>
                                  <span className="ellipisi_line_2">
                                    {(item?.phone && item.phone) || "Unknown"}
                                  </span>
                                </div>
                              </li>
                            ))}
                            {!isShowAllPatientList &&
                              (categoryPatientList.active.length > 2 ||
                                categoryPatientList.waiting.length > 2 ||
                                categoryPatientList.finished.length > 2) && (
                                <div className={pr.list__border_wrapper}>
                                  <div></div>
                                  <span
                                    onClick={() =>
                                      setIsShowAllPatientList(true)
                                    }
                                  >
                                    Еще
                                  </span>
                                </div>
                              )}
                          </ul>
                        </div>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default compose(WithAuthRedirect)(Profile);
