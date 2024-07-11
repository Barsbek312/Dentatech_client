import React from "react";
import mhi from "./MedicalHistoryInfo.module.css";
import Nothing from "../../../../../../Common/Nothing/Nothing";

const MedicalHistoryInfo = ({
  onClose = () => {},
  stopPropagation,
  templateHistory,
  handleClickAddTemplate = () => {},
}) => {
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
