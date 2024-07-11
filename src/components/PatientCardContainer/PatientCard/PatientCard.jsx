import React from "react";
import pc from "./PatientCard.module.css";
import GeneralContainer from "./GeneralContainer/GeneralContainer";
import MedicalHistoryContainer from "./MedicalHistoryContainer/MedicalHistoryContainer";
import PatientBillContainer from "./PatientBillContainer/PatientBillContainer";
import ReceptionContainer from "./ReceptionContainer/ReceptionContainer";
import TreatmentPlanContainer from "./TreatmentPlanContainer/TreatmentPlanContainer";

const PatientCard = ({
  handleClickPatientCardType,
  isActiveIndex,
  patientCard,
  calculateAge,
}) => {
  return (
    <main className={pc.main__wrapper}>
      <div className="container">
        <div className={pc.header}>
          <h2 className={pc.title}>Карточка Пациента</h2>
        </div>
        <header>
          <ul>
            {["Общее", "План лечения", "История болезни", "Приемы", "Счет"].map(
              (item, index) => {
                return (
                  <li
                    onClick={handleClickPatientCardType(index)}
                    key={index}
                    className={`${isActiveIndex === index ? pc.active : ""}`}
                  >
                    {item}
                  </li>
                );
              }
            )}
          </ul>
        </header>
        <div className={pc.patient__info_wrapper}>
          <h2 className="ellipsis_line_1">
            {(patientCard?.name &&
              patientCard?.surname &&
              `${patientCard.name} ${patientCard.surname}`) ||
              "Unknown"}
          </h2>
          <h3 className="ellipsis_line_1">{patientCard?.phone || "Unknown"}</h3>
          <strong className="ellipsis_line_1">
            {(patientCard?.birthDate && calculateAge(patientCard.birthDate)) ||
              "Unknown"}
          </strong>
        </div>
      </div>
      <div className={pc.main}>
        <div className={pc.patient__card}>
          {isActiveIndex === 0 ? (
            <GeneralContainer />
          ) : isActiveIndex === 1 ? (
            <TreatmentPlanContainer />
          ) : isActiveIndex === 4 ? (
            <PatientBillContainer patientId={(patientCard && patientCard.id) || null} />
          ) : isActiveIndex === 3 ? (
            <ReceptionContainer />
          ) : (
            isActiveIndex === 2 && <MedicalHistoryContainer />
          )}
        </div>
      </div>
    </main>
  );
};

export default PatientCard;
