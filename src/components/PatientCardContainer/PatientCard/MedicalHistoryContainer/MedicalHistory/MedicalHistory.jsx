import React from "react";
import mh from "./MedicalHistory.module.css";
import Teeth from "../../Teeth/Teeth";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MedicalHistoryInfoContainer from "./MedicalHistoryInfoContainer/MedicalHistoryInfoContainer";
import TemplateCategoryContainer from "./TemplateCategoryContainer/TemplateCategoryContainer";
import TemplateListContainer from "./TemplateListContainer/TemplateListContainer";

const MedicalHistory = ({
  isClickedChooseTemplate,
  clickedTemplateCategory,
  currentTooth,
  patientCard,
  handleCloseTemplateList,
  isClickedAddTemplate,
  handleCloseTemplateCategory,
  handleClickChooseTemplate,
  isClickedOnTooth,
  handleCloseMedicalHistoryInfo,
  handleClickAddTemplate,
  handleClickOnTooth,
  diseaseHistory,
  dateConverter,
  countTotalSum,
}) => {
  return (
    <>
      {isClickedChooseTemplate &&
        clickedTemplateCategory &&
        currentTooth &&
        patientCard && (
          <TemplateListContainer
            onClose={handleCloseTemplateList}
            templateCategory={clickedTemplateCategory}
            currentTooth={currentTooth}
            patientCard={patientCard}
          />
        )}
      {isClickedAddTemplate && (
        <TemplateCategoryContainer
          onClose={handleCloseTemplateCategory}
          handleClickChooseTemplate={handleClickChooseTemplate}
        />
      )}
      {isClickedOnTooth && patientCard && currentTooth && (
        <MedicalHistoryInfoContainer
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
