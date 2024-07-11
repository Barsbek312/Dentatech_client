import React from "react";
import pr from "./Profile.module.css";
import eye_vis from "./../../../assets/images/login__images/eye-off-line.svg";
import change_ava_img from "./../../../assets/images/common__images/change_black.svg";
import Nothing from "../../Common/Nothing/Nothing";

const Profile = ({
  isShow,
  wrapperOfModalWindow,
  handleClickContainer,
  modalWindow,
  handleClickModal,
  handleSubmit,
  onSubmitChangePassword,
  register,
  isVisibilePasswordOld,
  errors,
  handleClickOnPasswordVisibility,
  isVisibilePasswordNew,
  handleClickOnPasswordVisibilityAgain,
  onClickCancelAddPersonal,
  showProfile,
  param,
  onClickAddPersonal,
  categoryPatientList,
  isShowAllPatientList,
  onClickPatient,
  onClickShowAllPatientList,
}) => {
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
                      borderColor: errors["oldPassword"] ? "red" : "#333333",
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
                      borderColor: errors["newPassword"] ? "red" : "#333333",
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
                  onClick={onClickCancelAddPersonal}
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
                <div className={pr.ava}>{/* <img src="" alt="ava" /> */}</div>
                <div>
                  {/* {param && param?.id === "me" && (
                    <button className={pr.change__ava_btn}>
                      Редактировать
                      <img src={change_ava_img} alt="change-ava" />
                    </button>
                  )} */}
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
                              onClick={onClickAddPersonal}
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
                                onClick={onClickPatient(item.id)}
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
                                      <span onClick={onClickShowAllPatientList}>
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
                                onClick={onClickPatient(item.id)}
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
                                      <span onClick={onClickShowAllPatientList}>
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
                                onClick={onClickPatient(item.id)}
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
                                  <span onClick={onClickShowAllPatientList}>
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

export default Profile;
