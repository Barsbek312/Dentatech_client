import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateType } from "../../../../../../redux/template";
import TemplateCategory from "./TemplateCategory/TemplateCategory";

const TemplateCategoryContainer = ({
  onClose = () => {},
  handleClickChooseTemplate = () => {},
}) => {
  const { templateType } = useSelector((state) => state.template);
  const dispatch = useDispatch();

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    dispatch(getTemplateType());
  }, []);

  return (
    <TemplateCategory
      onClose={onClose}
      handleClickChooseTemplate={handleClickChooseTemplate}
      stopPropagation={stopPropagation}
      templateType={templateType}
    />
  );
};

export default TemplateCategoryContainer;
