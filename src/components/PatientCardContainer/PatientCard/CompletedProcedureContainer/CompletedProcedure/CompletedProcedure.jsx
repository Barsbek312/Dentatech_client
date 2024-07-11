import React from "react";
import cp from "./CompletedProcedure.module.css";
import Teeth from "../../Teeth/Teeth";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import { Tooltip } from "@mui/material";
import TeethSideBarContainer from "../../TeethSideBarContainer/TeethSideBarContainer";

const CompletedProcedure = ({
  isShowTeetSideBar,
  setIsShowTeethSideBar,
  tooth,
  handleClickOnTooth,
  onClickMoveToBill,
  params,
  patientCard
}) => {
  return (
    <main className={cp.main__wrapper}>
      <TeethSideBarContainer
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
          <Tooltip
            title={"Перейти к счету"}
            onClick={onClickMoveToBill(patientCard.id)}
          >
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
