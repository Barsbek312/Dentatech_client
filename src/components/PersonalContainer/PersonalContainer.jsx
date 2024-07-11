import React, { useEffect, useRef, useState } from "react";
import p from "./Personal/Personal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPersonal } from "../../redux/personal";
import { createUser, getPositions } from "../../redux/user";
import { getBranchesByClinicId } from "../../redux/branch";
import { useForm } from "react-hook-form";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../redux/notification";
import Personal from "./Personal/Personal";
import personal_card_img from "./../../assets/images/personal__images/copy.svg";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const PersonalContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

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

  const onClickPersonal = (personalId) => (e) => {
    if (personalId) navigate(`/profile/${personalId}`);
  };

  const onClickCancelAddPersonal = () => {
    setIsShow(false);
    reset();
  };

  const onClickAddPersonal = () => {
    setIsShow(true);
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
                    onClick={onClickPersonal(item.id || null)}
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
    <Personal
      isShow={isShow}
      wrapperOfModalWindow={wrapperOfModalWindow}
      handleClickContainer={handleClickContainer}
      modalWindow={modalWindow}
      handleClickModal={handleClickModal}
      handleSubmit={handleSubmit}
      onSubmitAddPersonal={onSubmitAddPersonal}
      register={register}
      errors={errors}
      control={control}
      branches={branches}
      arrPositions={arrPositions}
      onClickCancelAddPersonal={onClickCancelAddPersonal}
      user={user}
      onClickAddPersonal={onClickAddPersonal}
      handleChangeSearchInput={handleChangeSearchInput}
      inputValue={inputValue}
      renderPesonal={renderPesonal}
      personal={personal}
      isVisibilePassword={isVisibilePassword}
      handleClickOnPasswordVisibility={handleClickOnPasswordVisibility}
    />
  );
};

export default compose(WithAuthRedirect)(PersonalContainer);
