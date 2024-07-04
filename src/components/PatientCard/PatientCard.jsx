import React, { useEffect, useState } from "react";
import pc from "./PatientCard.module.css";
import General from "./General/General";
import TreatmentPlan from "./TreatmentPlan/TreatmentPlan";
import Photo from "./Photo/Photo";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnePaient } from "../../redux/patient";
import { getPatientToothStatus } from "../../redux/tooth";
import { getDisease } from "../../redux/disease";
import {
  getAllProcedureByClinicId,
  getProcedureType,
} from "../../redux/procedure";
import { getClinicSchedule } from "../../redux/schedule";
import PatientBill from "./PatientBill/PatientBill";
import Reception from "./Reception/Reception";
import MedicalHistory from "./MedicalHistory/MedicalHistory";

const PatientCard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const { isAuth, user } = useSelector((state) => state.user);
  const { patientCard } = useSelector((state) => state.patient);

  useEffect(() => {
    if (params.activeIndex) {
      setIsActiveIndex(parseInt(params.activeIndex));
    }
  }, [params.activeIndex]);

  useEffect(() => {
    const patientId = params.id;
    const fetchPatientById = (patientId, clinicId) => {
      dispatch(getOnePaient(patientId));
      dispatch(getDisease(clinicId));
      dispatch(getProcedureType());
      dispatch(getAllProcedureByClinicId(clinicId));
      dispatch(getClinicSchedule(clinicId));
    };
    if (isAuth) {
      fetchPatientById(patientId, user.clinicId);
    }
  }, [isAuth]);

  useEffect(() => {
    if (patientCard && patientCard.id) {
      dispatch(getPatientToothStatus(patientCard.id));
    }
  }, [patientCard]);

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleClickPatientCardType = (key) => {
    if (params.id) {
      return (e) => navigate(`/patient-card/${params.id}/${key}`);
    }
  };

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
            <General />
          ) : isActiveIndex === 1 ? (
            <TreatmentPlan />
          ) : isActiveIndex === 4 ? (
            <PatientBill patientId={(patientCard && patientCard.id) || null} />
          ) : isActiveIndex === 3 ? (
            <Reception />
          ) : (
            isActiveIndex === 2 && <MedicalHistory />
          )}
        </div>
      </div>
    </main>
  );
};

export default PatientCard;
