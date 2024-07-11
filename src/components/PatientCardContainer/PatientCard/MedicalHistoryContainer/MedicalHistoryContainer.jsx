import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiseaseHistory } from "../../../../redux/disease-history";
import MedicalHistory from "./MedicalHistory/MedicalHistory";

const MedicalHistoryContainer = () => {
  const dispatch = useDispatch();
  const { patientCard } = useSelector((state) => state.patient);
  const { diseaseHistory } = useSelector((state) => state.diseaseHistory);
  const [currentTooth, setCurrentTooth] = useState(null);
  const [isClickedOnTooth, setIsClickedOnTooth] = useState(false);
  const [isClickedAddTemplate, setIsClickedAddTemplate] = useState(false);
  const [isClickedChooseTemplate, setIsClickedChooseTemplate] = useState(false);
  const [clickedTemplateCategory, setClickedTemplateCategory] = useState(null);

  const countTotalSum = (medicalHistory) => {
    const totalSum =
      medicalHistory &&
      medicalHistory.reduce((sum, current) => {
        return sum + parseInt(current.procedure.price);
      }, 0);

    return totalSum;
  };

  const dateConverter = (date) => {
    const inputDate = new Date(date);

    const listOfMonths = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    const day = inputDate.getDate();

    return `${listOfMonths[month]} ${day}, ${year}`;
  };

  const handleClickOnTooth = (tooth) => (e) => {
    if (tooth) {
      setIsClickedOnTooth(true);
      setCurrentTooth(tooth);
    }
  };

  const handleCloseMedicalHistoryInfo = () => {
    setIsClickedOnTooth(false);
  };

  const handleCloseTemplateCategory = () => {
    setIsClickedAddTemplate(false);
    setIsClickedOnTooth(true);
  };

  const handleClickAddTemplate = () => {
    setIsClickedAddTemplate(true);
    setIsClickedOnTooth(false);
  };

  const handleClickChooseTemplate = (key) => (e) => {
    setClickedTemplateCategory(key);
    setIsClickedChooseTemplate(true);
    setIsClickedAddTemplate(false);
    setIsClickedOnTooth(false);
  };

  const handleCloseTemplateList = () => {
    setIsClickedChooseTemplate(false);
    setIsClickedAddTemplate(true);
    setIsClickedOnTooth(false);
  };

  useEffect(() => {
    if (currentTooth && currentTooth.id && patientCard && patientCard.id) {
      dispatch(
        getDiseaseHistory({
          patientId: patientCard.id,
          toothId: currentTooth.id,
        })
      );
    }
  }, [currentTooth, patientCard]);

  return (
    <MedicalHistory
      isClickedChooseTemplate={isClickedChooseTemplate}
      clickedTemplateCategory={clickedTemplateCategory}
      currentTooth={currentTooth}
      patientCard={patientCard}
      handleCloseTemplateList={handleCloseTemplateList}
      isClickedAddTemplate={isClickedAddTemplate}
      handleCloseTemplateCategory={handleCloseTemplateCategory}
      handleClickChooseTemplate={handleClickChooseTemplate}
      isClickedOnTooth={isClickedOnTooth}
      handleCloseMedicalHistoryInfo={handleCloseMedicalHistoryInfo}
      handleClickAddTemplate={handleClickAddTemplate}
      handleClickOnTooth={handleClickOnTooth}
      diseaseHistory={diseaseHistory}
      dateConverter={dateConverter}
      countTotalSum={countTotalSum}
    />
  );
};

export default MedicalHistoryContainer;
