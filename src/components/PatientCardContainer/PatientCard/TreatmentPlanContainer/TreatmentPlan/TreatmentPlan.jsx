import React from "react";
import tp from "./TreatmentPlan.module.css";
import Teeth from "../../Teeth/Teeth";
import add_reception_img from "./../../../../../assets/images/common__images/add.svg";
import change_reception_img from "./../../../../../assets/images/common__images/change_white.svg";
import { Tooltip, Button } from "@mui/material";
import ModalWindowEventContainer from "../../../../Common/ModalWindowEventContainer/ModalWindowEventContainer";
import ModalWindowConfirmAction from "../../../../Common/ModalWindowConfirmAction/ModalWindowConfirmAction";
import ModalWindowDescriptionEventContainer from "../../../../Common/ModalWindowDescriptionEventContainer/ModalWindowDescriptionEventContainer";
import TeethSideBarContainer from "../../TeethSideBarContainer/TeethSideBarContainer";

const TreatmentPlan = ({
  isModalCreateEventOpen,
  patientCard,
  closeAddReceptionModalWindow,
  currentReceptionForChange,
  confirmFunction,
  onCloseDescriptionEvent,
  onClickDeleteReception,
  onClickUpdateReception,
  close,
  isShowTeetSideBar,
  setIsShowTeethSideBar,
  tooth,
  handleClickOnTooth,
  onClickAddReception,
  schedule,
  convertToStringDate,
  handleClickOnReceptionTool,
}) => {
  return (
    <div className={tp.treatment__wrapper}>
      {isModalCreateEventOpen && patientCard && patientCard.id && (
        <ModalWindowEventContainer
          onClose={closeAddReceptionModalWindow}
          patientId={patientCard.id || null}
        />
      )}
      {currentReceptionForChange !== null && !confirmFunction && (
        <ModalWindowDescriptionEventContainer
          onCloseEvent={onCloseDescriptionEvent}
          isTreatmentPlan={true}
          reception={currentReceptionForChange}
          onDeleteReception={onClickDeleteReception}
          onUpdateReception={onClickUpdateReception}
        />
      )}
      {confirmFunction && (
        <ModalWindowConfirmAction
          // fix
          close={close}
          confirm={confirmFunction}
        />
      )}
      <TeethSideBarContainer
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
                onClick={onClickAddReception}
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
                        <Button onClick={handleClickOnReceptionTool(item)}>
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
