import React, { useEffect, useState } from "react";
import tp from "./TreatmentPlan.module.css";
import Teeth from "../Teeth/Teeth";
import TeethSideBar from "../TeethSideBar/TeethSideBar";
import { useDispatch, useSelector } from "react-redux";
import add_reception_img from "./../../../assets/images/common__images/add.svg";
import change_reception_img from "./../../../assets/images/common__images/change_white.svg";
import { Tooltip, Button } from "@mui/material";
import ModalWindowEvent from "../../Common/ModalWindowEvent/ModalWindowEvent";
import { deleteReception, updateAdmission } from "../../../redux/schedule";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ModalWindowConfirmAction from "../../Common/ModalWindowConfirmAction/ModalWindowConfirmAction";
import ModalWindowDescriptionEvent from "../../Common/ModalWindowDescriptionEvent/ModalWindowDescriptionEvent";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";

const TreatmentPlan = () => {
  const [isShowTeetSideBar, setIsShowTeethSideBar] = useState(false);
  const [isModalCreateEventOpen, setIsModalCreateEventOpen] = useState(false);
  const [tooth, setTooth] = useState(null);

  const dispatch = useDispatch();

  const { patientCard } = useSelector((state) => state.patient);

  const [currentReceptionForChange, setCurrentReceptionForChange] =
    useState(null);
  const [confirmFunction, setConfirmFunction] = useState(null);

  const handleClickOnReceptionTool = (reception) => {
    setCurrentReceptionForChange(reception);
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

  const handleClickOnTooth = (tooth) => {
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

  return (
    <div className={tp.treatment__wrapper}>
      {isModalCreateEventOpen && patientCard && patientCard.id && (
        <ModalWindowEvent
          onClose={() => setIsModalCreateEventOpen(false)}
          patientId={patientCard.id || null}
        />
      )}
      {currentReceptionForChange !== null && !confirmFunction && (
        <ModalWindowDescriptionEvent
          onCloseEvent={() => {
            setCurrentReceptionForChange(null);
          }}
          isTreatmentPlan={true}
          reception={currentReceptionForChange}
          onDeleteReception={onClickDeleteReception}
          onUpdateReception={onClickUpdateReception}
        />
      )}
      {confirmFunction && (
        <ModalWindowConfirmAction
          close={() => {
            setConfirmFunction(null);
          }}
          confirm={confirmFunction}
        />
      )}
      <TeethSideBar
        isShowTeethSideBar={isShowTeetSideBar}
        setIsShowTeethSideBar={setIsShowTeethSideBar}
        tooth={tooth}
        isTreatmentPlan={true}
        receptionId={null}
      />
      <div className={tp.main__wrapper}>
        <div className="container">
          <div className={tp.treatment__teeth}>
            <Teeth handleClickOnTooth={handleClickOnTooth} />
          </div>
        </div>
        <div className={tp.reception__wrapper}>
          <div className={tp.reception__title_wrapper}>
            <h3>План лечения</h3>
            <Tooltip title={`Добавить прием`} style={{ display: "flex" }}>
              <div
                className={tp.add__reception_img}
                onClick={() => {
                  setIsModalCreateEventOpen(true);
                }}
              >
                <img src={add_reception_img} alt="add-reception" />
              </div>
            </Tooltip>
          </div>
          <div className={tp.receptions}>
            {(schedule &&
              schedule.length > 0 &&
              patientCard &&
              schedule
                .filter((item) => item.patientId === patientCard.id)
                .toSorted((a, b) => {
                  const dateA = new Date(a && a.end);
                  const dateB = new Date(b && b.end);

                  return dateA - dateB;
                })
                .map((item) => (
                  <div className={tp.reception}>
                    <div className={tp.reception__content}>
                      <div className={tp.reception__info}>
                        <h4 className="ellipsis_line_1">
                          {(item &&
                            item.description !== "" &&
                            item.description) ||
                            "Нет описания"}{" "}
                          - {convertToStringDate(item && item.start)}
                        </h4>
                        <span className="ellipsis_line_1">
                          {item?.staff?.branch?.street || "Нет адреса"}
                        </span>
                        <span className="ellipsis_line_1">
                          {item?.staff?.staffPosition?.staffPosition ||
                            "Отсутствует должность"}{" "}
                          {item?.staff?.surname || ""} {item?.staff?.name || ""}
                        </span>
                      </div>
                      <div className={tp.reception__tool_wrapper}>
                        <Button
                          onClick={() => handleClickOnReceptionTool(item)}
                        >
                          <img
                            src={change_reception_img}
                            alt="change-reception"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))) || (
              <div className={tp.empty__title_wrapper}>
                <h3>Пока нет приемов</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
