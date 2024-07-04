import React, { useEffect } from "react";
import tl from "./TemplateList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createTemplateHistory,
  getTemplateListByTemplateType,
} from "../../../../redux/template";
import Nothing from "./../../../Common/Nothing/Nothing";

const TemplateList = ({
  onClose = () => {},
  templateCategory,
  currentTooth,
  patientCard,
}) => {
  const { templateList, templateHistory } = useSelector(
    (state) => state.template
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (templateCategory) {
      dispatch(getTemplateListByTemplateType(templateCategory.id));
    }
  }, [templateCategory]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleClickAddTemplateHistory = ({
    templateId,
    toothId,
    patientId,
  }) => {
    return (e) => {
      if ((templateId, toothId, patientId)) {
        const data = {
          text: "",
          templateId: parseInt(templateId),
          toothId: parseInt(toothId),
          patientId: parseInt(patientId),
        };
        dispatch(createTemplateHistory(data));
      }
    };
  };

  useEffect(() => {
    console.log(templateHistory);
  }, [templateHistory]);

  return (
    <div className={tl.modal__window_overlay} onClick={onClose}>
      <div className={tl.modal__window_content} onClick={stopPropagation}>
        <div className={tl.medical__history_header}>
          <h3 className={tl.title}>Список шаблонов</h3>
          <div className={tl.header__btn_wrapper}>
            <button>Добавить</button>
          </div>
        </div>
        <div className={tl.template__list_body}>
          {templateList && templateList.length > 0 ? (
            <div className={tl.template__list}>
              {templateList.map((item) => (
                <div
                  className={tl.template__wrapper}
                  onClick={handleClickAddTemplateHistory({
                    templateId: item?.id || null,
                    toothId: currentTooth?.id || null,
                    patientId: patientCard?.id || null,
                  })}
                >
                  <h3>{item?.title || "Unknown"}</h3>
                </div>
              ))}
            </div>
          ) : (
            <Nothing text={"Здесь нет шаблонов"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
