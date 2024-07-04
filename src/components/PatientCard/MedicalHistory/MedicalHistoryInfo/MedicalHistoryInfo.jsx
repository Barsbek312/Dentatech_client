import React, { useEffect, useState } from "react";
import mhi from "./MedicalHistoryInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import Nothing from "./../../../Common/Nothing/Nothing";
import { getPatientToothTemplateHistory } from "../../../../redux/template";

const MedicalHistoryInfo = ({ onClose = () => {}, patientId, toothId, handleClickAddTemplate=()=>{} }) => {
  const { templateHistory } = useSelector((state) => state.template);
  const dispatch = useDispatch();

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if ((patientId, toothId)) {
      dispatch(getPatientToothTemplateHistory({ patientId, toothId }));
    }
  }, [patientId, toothId]);
  return (
    <div className={mhi.modal__window_overlay} onClick={onClose}>
      <div className={mhi.modal__window_content} onClick={stopPropagation}>
        <div className={mhi.medical__history_header}>
          <h3 className={mhi.title}>Описание к приему</h3>
          <div className={mhi.header__btn_wrapper}>
            {templateHistory && templateHistory.length > 0 && (
              <button>Сохранить</button>
            )}
            <button onClick={handleClickAddTemplate}>Добавить</button>
          </div>
        </div>
        <div className={mhi.medical__history_body}>
          {templateHistory && templateHistory.length === 0 && (
            <Nothing text={"Здесь нет истории болезни"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryInfo;
