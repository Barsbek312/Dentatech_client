import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStaffProfile } from "../../redux/personal";
import { getStaffPatientList } from "../../redux/patient";
import { changePassword } from "../../redux/user";
import { removeNotification, setErrorNotification, setNotificationText, showNotification } from "../../redux/notification";
import Profile from "./Profile/Profile";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const ProfileContainer = () => {
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

  const onClickCancelAddPersonal = () => {
    setIsShow(false);
    reset();
  };

  const onClickAddPersonal = () => {
    setIsShow(true);
  };

  const onClickPatient = (patientId) => (e) => {
    if (patientId) navigate(`/patient-card/${patientId}`);
  };

  const onClickShowAllPatientList = () => {
    setIsShowAllPatientList(true);
  };

  return <Profile 
    isShow={isShow}
    wrapperOfModalWindow={wrapperOfModalWindow}
    handleClickContainer={handleClickContainer}
    modalWindow={modalWindow}
    handleClickModal={handleClickModal}
    handleSubmit={handleSubmit}
    onSubmitChangePassword={onSubmitChangePassword}
    register={register}
    isVisibilePasswordOld={isVisibilePasswordOld}
    errors={errors}
    handleClickOnPasswordVisibility={handleClickOnPasswordVisibility}
    isVisibilePasswordNew={isVisibilePasswordNew}
    handleClickOnPasswordVisibilityAgain={handleClickOnPasswordVisibilityAgain}
    onClickCancelAddPersonal={onClickCancelAddPersonal}
    showProfile={showProfile}
    param={param}
    onClickAddPersonal={onClickAddPersonal}
    categoryPatientList={categoryPatientList}
    isShowAllPatientList={isShowAllPatientList}
    onClickPatient={onClickPatient}
    onClickShowAllPatientList={onClickShowAllPatientList}
  />
};

export default compose(WithAuthRedirect)(ProfileContainer);
