import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedProcedure,
  getPatientTreatmentPlan,
} from "../../../../redux/procedure";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";
import TeethSideBar from "./TeethSideBar/TeethSideBar";
import MolarTooth from "../Teeth/TeethPartContainer/TeethPart/MolarTooth/MolarTooth";
import PremolarTooth from "../Teeth/TeethPartContainer/TeethPart/PremolarTooth/PremolarTooth";
import FangTooth from "../Teeth/TeethPartContainer/TeethPart/FangTooth/FangTooth";
import IncisorTooth from "../Teeth/TeethPartContainer/TeethPart/IncisorTooth/IncisorTooth";

const TeethSideBarContainer = ({
  isShowTeethSideBar,
  setIsShowTeethSideBar,
  tooth,
  isTreatmentPlan,
  receptionId = null,
}) => {
  const { patientCard } = useSelector((state) => state.patient);
  const { treatmentPlan, medicalHistory } = useSelector(
    (state) => state.procedure
  );

  const dispatch = useDispatch();

  const [toothTypes, setToothTypes] = useState(null);
  const [currentToothPart, setCurrentToothPart] = useState(null);
  const [isShowModalWindow, setIsShowModalWindow] = useState(false);
  const [currentToothId, setCurrentToothId] = useState(null);

  // edit planned procedure
  const [currentPlannedProcedure, setCurrentPlannedProcedure] = useState(null);

  // edit planned disease
  const [currentPlannedDisease, setCurrentPlannedDisease] = useState(null);

  const [diagnosis, setDiagnosis] = useState([]);
  const [procedure, setProcedure] = useState([]);

  useEffect(() => {
    if (isTreatmentPlan && treatmentPlan && treatmentPlan[0]) {
      setDiagnosis(treatmentPlan[0]);
    }
    if (isTreatmentPlan && treatmentPlan && treatmentPlan[1]) {
      setProcedure(treatmentPlan[1]);
    }
  }, [treatmentPlan]);

  useEffect(() => {
    if (!isTreatmentPlan && medicalHistory && medicalHistory[0]) {
      setProcedure(medicalHistory[0]);
    }
  }, [medicalHistory]);

  const [currentDiagnosisOfToothPartId, setCurrentDiagnosisOfToothPartId] =
    useState([]);
  const [currentProcedureOfToothPartId, setCurrentProcedureOfToothPartId] =
    useState([]);

  // checkboxes
  const [isCheckedSelectAll, setIsCheckSelectAll] = useState(false);
  const [isAutoDeleteSelectAll, setIsAutoDeleteSelectAll] = useState(false); // при нажатии на часть зуба
  const [isCheckedDiseases, setIsCheckedDiseases] = useState(true);
  const [isCheckedProcedures, setIsCheckedProcedures] = useState(true);

  const [searchTreatmentPlanValue, setSearchTreatmentPlan] = useState("");

  useEffect(() => {
    if (patientCard && tooth) {
      if (isTreatmentPlan) {
        dispatch(
          getPatientTreatmentPlan({
            patientId: patientCard.id,
            toothId: tooth.id,
          })
        );
      } else {
        dispatch(getCompletedProcedure({ receptionId, toothId: tooth.id }));
      }
    }
  }, [patientCard, tooth]);

  const ResetAll = () => {
    setCurrentToothPart({
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    });
    setCurrentToothId(null);
    setIsCheckSelectAll(false);
    setIsCheckedDiseases(true);
    setIsCheckedProcedures(true);
    isTreatmentPlan && setCurrentDiagnosisOfToothPartId([]);
    setCurrentProcedureOfToothPartId([]);
  };

  useEffect(() => {
    ResetAll();
  }, [isShowTeethSideBar]);

  const handleClickOnToothPart =
    (toothPartId, toothConnectId, width) => (e) => {
      if (width) {
        setIsAutoDeleteSelectAll(true);
        setCurrentToothPart((prevState) => {
          const blue =
            "invert(38%) sepia(93%) saturate(580%) hue-rotate(169deg) brightness(93%) contrast(99%)";
          const updatedState = { ...prevState };
          updatedState[toothPartId] =
            prevState[toothPartId] === blue ? null : blue;

          if (updatedState[toothPartId]) {
            setCurrentToothId(
              (prevState) =>
                (prevState && [...prevState, toothConnectId]) || [
                  toothConnectId,
                ]
            );
          } else {
            setCurrentToothId(
              (prevState) =>
                (prevState &&
                  prevState.filter((item) => item !== toothConnectId)) ||
                null
            );
          }

          setCurrentToothId((prevState) => [...new Set(prevState)]);
          return updatedState;
        });
      }
    };

  useEffect(() => {
    if (
      (currentToothId && isTreatmentPlan) ||
      (diagnosis &&
        diagnosis[0] &&
        diagnosis[0].teethPartConnect &&
        isTreatmentPlan)
    ) {
      setCurrentDiagnosisOfToothPartId(null);
    }
    if (
      currentToothId ||
      (procedure && procedure[0] && procedure[0].teethPartConnect)
    ) {
      setCurrentProcedureOfToothPartId(null);
    }
  }, [currentToothId, diagnosis, procedure]);

  useEffect(() => {
    if (
      currentDiagnosisOfToothPartId === null &&
      currentToothId &&
      isTreatmentPlan
    ) {
      currentToothId.forEach((toothPartId) => {
        diagnosis[0].teethPartConnect.forEach((item) => {
          if (toothPartId === item.id) {
            setCurrentDiagnosisOfToothPartId((prevState) => {
              if (prevState === null) {
                return item.diagnosis;
              } else {
                return [...prevState, ...item.diagnosis];
              }
            });
          }
        });
      });
    }
  }, [currentDiagnosisOfToothPartId, currentToothId]);

  useEffect(() => {
    if (currentProcedureOfToothPartId === null && currentToothId) {
      currentToothId.forEach((toothPartId) => {
        const procedureArr = isTreatmentPlan ? procedure[0] : procedure;
        procedureArr.teethPartConnect.forEach((item) => {
          if (toothPartId === item.id) {
            setCurrentProcedureOfToothPartId((prevState) => {
              if (prevState === null) {
                if (isTreatmentPlan) {
                  return item.plannedProcedures;
                } else {
                  return item.medicalHistory;
                }
              } else {
                if (isTreatmentPlan) {
                  return [...prevState, ...item.plannedProcedures];
                } else {
                  return [...prevState, ...item.medicalHistory];
                }
              }
            });
          }
        });
      });
    }
  }, [currentProcedureOfToothPartId, currentToothId]);

  useEffect(() => {
    if (isAutoDeleteSelectAll) {
      setIsCheckSelectAll(false);
    }
  }, [isAutoDeleteSelectAll]);

  const handleClickOnDisease = (event) => {
    setIsCheckedDiseases(event.target.checked);
  };

  const handleClickOnSelectAll = (event) => {
    setIsAutoDeleteSelectAll(false);
    setIsCheckSelectAll(event.target.checked);
  };

  const handleClickOnProcedure = (event) => {
    setIsCheckedProcedures(event.target.checked);
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

  useEffect(() => {
    if (isCheckedSelectAll) {
      setCurrentToothId(
        tooth.teethPartConnect &&
          tooth.teethPartConnect.map((teeth) => teeth.id)
      );
      setCurrentToothPart((prevState) => {
        let updatedState = {};
        for (const key in prevState) {
          updatedState[key] =
            "invert(38%) sepia(93%) saturate(580%) hue-rotate(169deg) brightness(93%) contrast(99%)";
        }
        return updatedState;
      });
    } else if (!isAutoDeleteSelectAll) {
      setCurrentToothId(null);
      setCurrentToothPart({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
      });
      isTreatmentPlan && setCurrentDiagnosisOfToothPartId([]);
      setCurrentProcedureOfToothPartId([]);
    }
  }, [isCheckedSelectAll]);

  const handleClickOnAddTreatment = async () => {
    if (!currentToothId || currentToothId.length === 0) {
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Выберите часть зуба"));
      dispatch(showNotification());
      removeNotification(dispatch);
    } else {
      setIsShowModalWindow(true);
    }
  };

  const onClickOverTeethSideBar = () => {
    setIsShowTeethSideBar(false);
  };

  const onChangeSearchInputText = (e) => {
    setSearchTreatmentPlan(e.target.value);
  };

  const onClickEditDisease = (disease) => (e) => {
    setCurrentPlannedDisease(disease);
  };

  const onClickEditProcedure = (procedure) => (e) => {
    setCurrentPlannedProcedure(procedure);
  };

  const stopPropagation = (e) => e.stopPropagation();

  useEffect(() => {
    if (isShowTeethSideBar) {
      setToothTypes({
        1: (
          <MolarTooth
            width={120}
            item={tooth}
            handleClickOnToothPart={handleClickOnToothPart}
            currentToothPart={currentToothPart}
          />
        ),
        2: (
          <PremolarTooth
            width={70}
            item={tooth}
            handleClickOnToothPart={handleClickOnToothPart}
            currentToothPart={currentToothPart}
          />
        ),
        3: (
          <FangTooth
            width={70}
            item={tooth}
            handleClickOnToothPart={handleClickOnToothPart}
            currentToothPart={currentToothPart}
          />
        ),
        4: (
          <IncisorTooth
            width={70}
            item={tooth}
            handleClickOnToothPart={handleClickOnToothPart}
            currentToothPart={currentToothPart}
          />
        ),
      });
    }
  }, [isShowTeethSideBar, currentToothPart]);

  return (
    <TeethSideBar
      isShowTeethSideBar={isShowTeethSideBar}
      tooth={tooth}
      isTreatmentPlan={isTreatmentPlan}
      receptionId={receptionId}
      onClickOverTeethSideBar={onClickOverTeethSideBar}
      isShowModalWindow={isShowModalWindow}
      setIsShowModalWindow={setIsShowModalWindow}
      currentToothPart={currentToothPart}
      currentToothId={currentToothId}
      currentPlannedDisease={currentPlannedDisease}
      setCurrentPlannedDisease={setCurrentPlannedDisease}
      currentPlannedProcedure={currentPlannedProcedure}
      setCurrentPlannedProcedure={setCurrentPlannedProcedure}
      toothTypes={toothTypes}
      isCheckedSelectAll={isCheckedSelectAll}
      handleClickOnSelectAll={handleClickOnSelectAll}
      isCheckedDiseases={isCheckedDiseases}
      handleClickOnDisease={handleClickOnDisease}
      isCheckedProcedures={isCheckedProcedures}
      handleClickOnProcedure={handleClickOnProcedure}
      handleClickOnAddTreatment={handleClickOnAddTreatment}
      onChangeSearchInputText={onChangeSearchInputText}
      searchTreatmentPlanValue={searchTreatmentPlanValue}
      currentDiagnosisOfToothPartId={currentDiagnosisOfToothPartId}
      onClickEditDisease={onClickEditDisease}
      dateConverter={dateConverter}
      currentProcedureOfToothPartId={currentProcedureOfToothPartId}
      onClickEditProcedure={onClickEditProcedure}
      stopPropagation={stopPropagation}
    />
  );
};

export default TeethSideBarContainer;
