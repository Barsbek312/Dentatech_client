import React, { useEffect } from "react";
import MedicalHistoryInfo from "./MedicalHistoryInfo/MedicalHistoryInfo";
import { useDispatch, useSelector } from "react-redux";
import { getPatientToothTemplateHistory } from "../../../../../../redux/template";

const MedicalHistoryInfoContainer = ({
  onClose = () => {},
  patientId,
  toothId,
  handleClickAddTemplate = () => {},
}) => {
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

  return <MedicalHistoryInfo 
    onClose={onClose}
    stopPropagation={stopPropagation}
    templateHistory={templateHistory}
    handleClickAddTemplate={handleClickAddTemplate}
  />
};

export default MedicalHistoryInfoContainer;
