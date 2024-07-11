import React from "react";
import tp from "./TemplateCategory.module.css";
import Nothing from "../../../../../../Common/Nothing/Nothing";

const TemplateCategory = ({
  onClose = () => {},
  handleClickChooseTemplate = () => {},
  stopPropagation,
  templateType
}) => {
  return (
    <div className={tp.modal__window_overlay} onClick={onClose}>
      <div className={tp.modal__window_content} onClick={stopPropagation}>
        <div className={tp.medical__history_header}>
          <h3 className={tp.title}>Категории шаблонов</h3>
          <div className={tp.header__btn_wrapper}>
            <button>Добавить</button>
          </div>
        </div>
        <div className={tp.medical__history_body}>
          {templateType && templateType.length > 0 ? (
            <div className={tp.template__category_list}>
              {templateType.map((item) => (
                <div
                  className={tp.template__category}
                  onClick={handleClickChooseTemplate(item)}
                >
                  <h3>{item?.templateType || "Unknown"}</h3>
                </div>
              ))}
            </div>
          ) : (
            <Nothing text={"Здесь нет категории шаблонов"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCategory;
