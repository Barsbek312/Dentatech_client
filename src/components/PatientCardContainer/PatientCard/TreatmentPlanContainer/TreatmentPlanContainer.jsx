import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReception, updateAdmission } from "../../../../redux/schedule";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";
import TreatmentPlan from "./TreatmentPlan/TreatmentPlan";

const TreatmentPlanContainer = () => {
  const [isShowTeetSideBar, setIsShowTeethSideBar] = useState(false);
  const [isModalCreateEventOpen, setIsModalCreateEventOpen] = useState(false);
  const [tooth, setTooth] = useState(null);

  const dispatch = useDispatch();

  const { patientCard } = useSelector((state) => state.patient);

  const [currentReceptionForChange, setCurrentReceptionForChange] =
    useState(null);
  const [confirmFunction, setConfirmFunction] = useState(null);

  const handleClickOnReceptionTool = (reception) => (e) => {
    if (reception) setCurrentReceptionForChange(reception);
  };

  const convertToStringDate = (startDate) => {
    const months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    const initialDate = new Date(startDate);

    const day = initialDate.getDate();
    const month = months[initialDate.getMonth()];
    const year = initialDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const { schedule } = useSelector((state) => state.schedule);

  const handleClickOnTooth = (tooth) => (e) => {
    setIsShowTeethSideBar(true);
    setTooth(tooth);
  };

  const onClickDeleteReception = (receptionId) => {
    setConfirmFunction(() => async () => {
      const res = await dispatch(deleteReception(receptionId));
      if (res.type === "schedule/delete-reception/fulfilled") {
        dispatch(setErrorNotification(false));
        dispatch(setNotificationText("Прием был успешно удален"));
      } else {
        dispatch(setErrorNotification(true));
        dispatch(
          setNotificationText(
            res?.payload?.response?.data?.message ||
              "Прием не был удален, попробуйте еще раз"
          )
        );
      }
      dispatch(showNotification());
      removeNotification(dispatch);
      setConfirmFunction(null);
      setCurrentReceptionForChange(null);
    });
  };

  const onClickUpdateReception = (data) => {
    if (data) {
      setConfirmFunction(() => async () => {
        const res = await dispatch(updateAdmission(data));
        if (res?.payload?.status === 200) {
          dispatch(setErrorNotification(false));
          dispatch(setNotificationText("Прием был успешно изменен"));
        } else {
          dispatch(setErrorNotification(true));
          dispatch(
            setNotificationText(
              res?.payload?.response?.data?.message ||
                "Прием не был изменен, попробуйте еще раз"
            )
          );
        }
        setConfirmFunction(null);
        setCurrentReceptionForChange(null);
        dispatch(showNotification());
        removeNotification(dispatch);
      });
    } else {
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Вы ничего не изменили"));
      setConfirmFunction(null);
      dispatch(showNotification());
      removeNotification(dispatch);
    }
  };

  const closeAddReceptionModalWindow = () => setIsModalCreateEventOpen(false);
  const onCloseDescriptionEvent = () => setCurrentReceptionForChange(null);

  const onClickAddReception = () => setIsModalCreateEventOpen(true);

  const close = () => setConfirmFunction(null);

  return (
    <TreatmentPlan
      isModalCreateEventOpen={isModalCreateEventOpen}
      patientCard={patientCard}
      closeAddReceptionModalWindow={closeAddReceptionModalWindow}
      currentReceptionForChange={currentReceptionForChange}
      confirmFunction={confirmFunction}
      onCloseDescriptionEvent={onCloseDescriptionEvent}
      onClickDeleteReception={onClickDeleteReception}
      onClickUpdateReception={onClickUpdateReception}
      close={close}
      isShowTeetSideBar={isShowTeetSideBar}
      setIsShowTeethSideBar={setIsShowTeethSideBar}
      tooth={tooth}
      handleClickOnTooth={handleClickOnTooth}
      onClickAddReception={onClickAddReception}
      schedule={schedule}
      convertToStringDate={convertToStringDate}
      handleClickOnReceptionTool={handleClickOnReceptionTool}
    />
  );
};

export default TreatmentPlanContainer;
