import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePaient } from "../../../../redux/patient";
import {
  getAllProcedureByClinicId,
  getProcedureType,
} from "../../../../redux/procedure";
import { getPatientToothStatus } from "../../../../redux/tooth";
import CompletedProcedure from "./CompletedProcedure/CompletedProcedure";

const CompletedProcedureContainer = () => {
  const [isShowTeetSideBar, setIsShowTeethSideBar] = useState(false);
  const [tooth, setTooth] = useState(null);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { patientCard } = useSelector((state) => state.patient);
  const { user, isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    const patientId = params.id;
    const fetchPatientById = (patientId, clinicId) => {
      dispatch(getOnePaient(patientId));
      dispatch(getProcedureType());
      dispatch(getAllProcedureByClinicId(clinicId));
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

  const handleClickOnTooth = (tooth) => (e) => {
    if (tooth) {
      setIsShowTeethSideBar(true);
      setTooth(tooth);
    }
  };

  const onClickMoveToBill = (patientId) => (e) => {
    if (patientId) {
      navigate(`/patient-card/${patientId}/4`);
    }
  };

  return (
    <CompletedProcedure
      isShowTeetSideBar={isShowTeetSideBar}
      setIsShowTeethSideBar={setIsShowTeethSideBar}
      tooth={tooth}
      handleClickOnTooth={handleClickOnTooth}
      onClickMoveToBill={onClickMoveToBill}
      params={params}
      patientCard={patientCard}
    />
  );
};

export default CompletedProcedureContainer;
