import React, { useEffect, useState } from "react";
import cp from "./CompletedProcedure.module.css";
import Teeth from "../Teeth/Teeth";
import { useDispatch, useSelector } from "react-redux";
import { getPatientToothStatus } from "../../../redux/tooth";
import {
  getAllProcedureByClinicId,
  getProcedureType,
} from "../../../redux/procedure";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import { getOnePaient } from "../../../redux/patient";
import { useNavigate, useParams } from "react-router-dom";
import TeethSideBar from "../TeethSideBar/TeethSideBar";
import { Tooltip } from "@mui/material";

const CompletedProcedure = () => {
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

  const handleClickOnTooth = (tooth) => {
    setIsShowTeethSideBar(true);
    setTooth(tooth);
  };

  return (
    <main className={cp.main__wrapper}>
      <TeethSideBar
        isShowTeethSideBar={isShowTeetSideBar}
        setIsShowTeethSideBar={setIsShowTeethSideBar}
        tooth={tooth}
        isTreatmentPlan={false}
        receptionId={params.receptionId}
      />
      <div className="container">
        <div className={cp.header}>
          <h2 className={cp.title}>Наряд</h2>
        </div>
        <div className={cp.main}>
          <div className={cp.completed__procedure_teeth}>
            <Teeth handleClickOnTooth={handleClickOnTooth} />
          </div>
        </div>
        <div className={cp.to__patient_bill}>
          <Tooltip title={"Перейти к счету"} onClick={() => navigate(`/patient-card/${patientCard.id}/4`)}>
            <div className={cp.patient__bill}>
              <CallMadeOutlinedIcon color="primary" sx={{ fontSize: 30 }} />
            </div>
          </Tooltip>
        </div>
      </div>
    </main>
  );
};

export default CompletedProcedure;
