import React, { useEffect, useState } from "react";
import tsb from "./TeethSideBar.module.css";
import MolarTooth from "../Teeth/TeethPart/MolarTooth/MolarTooth";
import PremolarTooth from "../Teeth/TeethPart/PremolarTooth/PremolarTooth";
import FangTooth from "../Teeth/TeethPart/FangTooth/FangTooth";
import IncisorTooth from "../Teeth/TeethPart/IncisorTooth/IncisorTooth";
import AddTreatment from "./../../../assets/images/personal__images/copy.svg";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import ToothModalWindow from "../ToothModalWindow/ToothModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { UpdateRounded } from "@mui/icons-material";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";
import {
  getCompletedProcedure,
  getPatientTreatmentPlan,
} from "../../../redux/procedure";
import EditClickedPlannedDisease from "./EditClickedPlannedDisease/EditClickedPlannedDisease";
import EditClickedPlannedProcedure from "./EditClickedPlannedProcedure/EditClickedPlannedProcedure";

const TeethSideBar = ({
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

  useEffect(() => {}, [tooth]);

  const handleClickOnToothPart = (toothPartId, toothConnectId, width) => {
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
              (prevState && [...prevState, toothConnectId]) || [toothConnectId]
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
    <div
      className={
        tsb.modal__window_wrapper + ` ${isShowTeethSideBar && tsb.show}`
      }
      onClick={() => {
        setIsShowTeethSideBar(false);
      }}
    >
      {isShowModalWindow && (
        <ToothModalWindow
          setIsShowModalWindow={setIsShowModalWindow}
          title={isTreatmentPlan ? "Добавить план лечения" : "Добавить наряд"}
          currentToothPart={currentToothPart}
          currentToothId={currentToothId}
          toothId={tooth.id}
          isTreatmentPlan={isTreatmentPlan}
          receptionId={receptionId}
        />
      )}

      {currentPlannedDisease !== null && (
        <EditClickedPlannedDisease
          close={() => {
            setCurrentPlannedDisease(null);
          }}
          diagnosis={currentPlannedDisease}
          toothId={tooth.id || null}
          isTreatmentPlan={isTreatmentPlan}
        />
      )}
      {currentPlannedProcedure !== null && (
        <EditClickedPlannedProcedure
          close={() => {
            setCurrentPlannedProcedure(null);
          }}
          plannedProcedure={currentPlannedProcedure}
          toothId={tooth.id || null}
          isTreatmentPlan={isTreatmentPlan}
        />
      )}
      <div className={tsb.modal__window} onClick={(e) => e.stopPropagation()}>
        <div className={tsb.modal__tooth_wrapper}>
          <div className={tsb.tooth__wrapper}>
            {toothTypes && tooth && toothTypes[tooth["toothTypeId"]]}
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheckedSelectAll}
                  onClick={(event) => handleClickOnSelectAll(event)}
                />
              }
              label={"Все части зуба"}
            />
            {isTreatmentPlan && (
              <FormControlLabel
                checked={isCheckedDiseases}
                onClick={(event) => handleClickOnDisease(event)}
                control={<Checkbox />}
                label={"Болезни"}
              />
            )}
            <FormControlLabel
              checked={isCheckedProcedures}
              onClick={(event) => handleClickOnProcedure(event)}
              control={<Checkbox />}
              label={"Процедуры"}
            />
          </FormGroup>
        </div>
        <div className={tsb.treatment__header_wrapper}>
          <div
            className={tsb.add__treatment_wrapper}
            onClick={() => handleClickOnAddTreatment()}
          >
            <img src={AddTreatment} />
          </div>
          <div className={tsb.search__wrapper}>
            <input
              type="text"
              placeholder="Поиск"
              onChange={(e) => setSearchTreatmentPlan(e.target.value)}
              value={searchTreatmentPlanValue}
            />
          </div>
        </div>
        <div className={tsb.treatment__main_wrapper}>
          {isCheckedDiseases && isTreatmentPlan && (
            <Box sx={{ width: "100%", bgcolor: "#F7FAFB" }}>
              <nav aria-label="main mailbox folders">
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Болезни
                    </ListSubheader>
                  }
                >
                  {(currentDiagnosisOfToothPartId &&
                    currentDiagnosisOfToothPartId.length > 0 &&
                    currentDiagnosisOfToothPartId
                      .filter((item) =>
                        item.diseases.disease
                          .toLowerCase()
                          .includes(searchTreatmentPlanValue.toLowerCase()) ||
                        isTreatmentPlan
                          ? item.staff.name
                          : item.reception.attendingStaff.name
                              .toLowerCase()
                              .includes(
                                searchTreatmentPlanValue.toLowerCase()
                              ) || isTreatmentPlan
                          ? item.staff.surname
                          : item.reception.attendingStaff.surname
                              .toLowerCase()
                              .includes(
                                searchTreatmentPlanValue.toLowerCase()
                              ) ||
                            dateConverter(item.updatedAt)
                              .toLowerCase()
                              .includes(searchTreatmentPlanValue.toLowerCase())
                      )
                      .map((item) => (
                        <Tooltip
                          title={`${
                            isTreatmentPlan
                              ? item.staff.surname
                              : item.reception.attendingStaff.surname
                          } ${
                            isTreatmentPlan
                              ? item.staff.name
                              : item.reception.attendingStaff.name
                          }`}
                          key={item.id}
                        >
                          <ListItem
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => setCurrentPlannedDisease(item)}
                              >
                                <ModeEditOutlineOutlinedIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={item.diseases.disease}
                              secondary={dateConverter(item.updatedAt)}
                            />
                          </ListItem>
                        </Tooltip>
                      ))) || (
                    <ListItem>
                      <ListItemText primary={"Нет болезней"} />
                    </ListItem>
                  )}
                </List>
              </nav>
            </Box>
          )}
          {isCheckedProcedures && (
            <Box sx={{ width: "100%", bgcolor: "#F7FAFB" }}>
              <nav aria-label="main mailbox folders">
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Процедуры
                    </ListSubheader>
                  }
                >
                  {(currentProcedureOfToothPartId &&
                    currentProcedureOfToothPartId.length > 0 &&
                    currentProcedureOfToothPartId
                      .filter(
                        (item) =>
                          item.procedure.procedure
                            .toLowerCase()
                            .includes(searchTreatmentPlanValue.toLowerCase()) ||
                          (isTreatmentPlan
                            ? item.staff.name
                            : item.reception.attendingStaff.name
                          )
                            .toLowerCase()
                            .includes(searchTreatmentPlanValue.toLowerCase()) ||
                          (isTreatmentPlan
                            ? item.staff.surname
                            : item.reception.attendingStaff.surname
                          )
                            .toLowerCase()
                            .includes(searchTreatmentPlanValue.toLowerCase()) ||
                          dateConverter(item.updatedAt)
                            .toLowerCase()
                            .includes(searchTreatmentPlanValue.toLowerCase()) ||
                          item.procedure.procedureType.procedureType
                            .toLowerCase()
                            .includes(searchTreatmentPlanValue.toLowerCase())
                      )
                      .map((item) => (
                        <Tooltip
                          title={
                            <React.Fragment>
                              {isTreatmentPlan
                                ? item.staff.surname
                                : item.reception.attendingStaff.surname}{" "}
                              {isTreatmentPlan
                                ? item.staff.name
                                : item.reception.attendingStaff.name}{" "}
                              <br />
                              {item.procedure.description}
                            </React.Fragment>
                          }
                        >
                          <ListItem
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => setCurrentPlannedProcedure(item)}
                              >
                                <ModeEditOutlineOutlinedIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={item.procedure.procedure}
                              secondary={
                                <React.Fragment>
                                  {dateConverter(item.updatedAt)} <br />{" "}
                                  {item.procedure.procedureType.procedureType}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Tooltip>
                      ))) || (
                    <ListItem>
                      <ListItemText primary={"Нет процедур"} />
                    </ListItem>
                  )}
                </List>
              </nav>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeethSideBar;
