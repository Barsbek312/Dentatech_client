import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePaient } from "../../redux/patient";
import { getDisease } from "../../redux/disease";
import {
  getAllProcedureByClinicId,
  getProcedureType,
} from "../../redux/procedure";
import { getClinicSchedule } from "../../redux/schedule";
import { getPatientToothStatus } from "../../redux/tooth";
import PatientCard from "./PatientCard/PatientCard";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const PatientCardContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActiveIndex, setIsActiveIndex] = useState(
    params.activeIndex || null
  );
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

  const handleClickPatientCardType = (key) => (e) => {
    if (key || key === 0) {
      navigate(`/patient-card/${params.id}/${key}`);
    }
  };

  return (
    <PatientCard
      handleClickPatientCardType={handleClickPatientCardType}
      isActiveIndex={isActiveIndex}
      patientCard={patientCard}
      calculateAge={calculateAge}
    />
  );
};

export default compose(WithAuthRedirect)(PatientCardContainer);
