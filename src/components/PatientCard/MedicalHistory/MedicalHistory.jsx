import React, { useEffect, useState } from "react";
import mh from "./MedicalHistory.module.css";
import Teeth from "../Teeth/Teeth";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { getDiseaseHistory } from "../../../redux/disease-history";
import MedicalHistoryInfo from "./MedicalHistoryInfo/MedicalHistoryInfo";
import TemplateCategory from "./TemplateCategory/TemplateCategory";
import TemplateList from "./TemplateList/TemplateList";

const MedicalHistory = () => {
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

  const handleClickOnTooth = (tooth) => {
    setIsClickedOnTooth(true);
    setCurrentTooth(tooth);
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

  const handleClickChooseTemplate = (key) => {
    return (e) => {
      setClickedTemplateCategory(key);
      setIsClickedChooseTemplate(true);
      setIsClickedAddTemplate(false);
      setIsClickedOnTooth(false);
    };
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
    <>
      {isClickedChooseTemplate && clickedTemplateCategory && currentTooth && patientCard && (
        <TemplateList
          onClose={handleCloseTemplateList}
          templateCategory={clickedTemplateCategory}
          currentTooth={currentTooth}
          patientCard={patientCard}
        />
      )}
      {isClickedAddTemplate && (
        <TemplateCategory
          onClose={handleCloseTemplateCategory}
          handleClickChooseTemplate={handleClickChooseTemplate}
        />
      )}
      {isClickedOnTooth && patientCard && currentTooth && (
        <MedicalHistoryInfo
          onClose={handleCloseMedicalHistoryInfo}
          patientId={patientCard.id}
          toothId={currentTooth.id}
          handleClickAddTemplate={handleClickAddTemplate}
        />
      )}
      <div className="container">
        <div className={mh.medical__history_teeth}>
          <Teeth handleClickOnTooth={handleClickOnTooth} />
        </div>
      </div>
      {currentTooth && (
        <div className={mh.medical__history_wrapper}>
          <div className={mh.medical__history_header}>
            <div className={mh.medical__history_tooth_name}>
              <span>{currentTooth && currentTooth.tooth}</span>
            </div>
          </div>
          <div className={mh.medical__history_reception}>
            {diseaseHistory &&
              diseaseHistory.map((item) => (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <span className={mh.reception__date}>
                      {dateConverter(item.end)}
                    </span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={mh.reception__info_wrapper}>
                      <div className={mh.reception__main_info}>
                        <div className={mh.reception__info}>
                          <h4>{item.attendingStaff.branch.street}</h4>
                          <div>
                            <span>
                              {item.attendingStaff.staffPosition
                                .staffPosition || "Ст."}{" "}
                              {item.attendingStaff.surname}{" "}
                              {item.attendingStaff.name}
                            </span>
                            <span>
                              Кл. {item.attendingStaff.branch.clinic.clinic}
                            </span>
                          </div>
                        </div>
                        <div className={mh.procedure__info}>
                          <div>
                            <h5 className={mh.procedure__info_title}>
                              Процедуры
                            </h5>
                          </div>
                          <div className={mh.procedure__list}>
                            {item.medicalHistory &&
                              item.medicalHistory.map((procedure) => (
                                <div>
                                  <h3>{procedure.procedure.procedure}</h3>
                                  <strong>{procedure.procedure.price}</strong>
                                </div>
                              ))}
                          </div>
                          <div>
                            <h4>Итого:</h4>
                            <strong>
                              {countTotalSum(item.medicalHistory)}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className={mh.reception__description_info}>
                        <div className={mh.reception__description}>
                          <div>
                            <h5>Описание приема</h5>
                          </div>
                          <div className={mh.reception__description_content}>
                            <p>{item.description}</p>
                          </div>
                          {/* fix !!!! */}
                          {/* <div className={mh.add__description_wrapper}>
                            <Tooltip title={"Добавить описание"}>
                              <img src={AddReception} alt="add-description" />
                            </Tooltip>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MedicalHistory;
