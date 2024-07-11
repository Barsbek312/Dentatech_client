import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTemplateHistory,
  getTemplateListByTemplateType,
} from "../../../../../../redux/template";
import TemplateList from "./TemplateList/TemplateList";

const TemplateListContainer = ({
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

  const handleClickAddTemplateHistory =
    ({ templateId, toothId, patientId }) =>
    (e) => {
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

  return (
    <TemplateList
      stopPropagation={stopPropagation}
      onClose={onClose}
      currentTooth={currentTooth}
      patientCard={patientCard}
      templateList={templateList}
      handleClickAddTemplateHistory={handleClickAddTemplateHistory}
    />
  );
};

export default TemplateListContainer;
