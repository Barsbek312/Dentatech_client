import React from "react";
import tsb from "./TeethSideBar.module.css";
import AddTreatment from "./../../../../../assets/images/personal__images/copy.svg";
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
import EditClickedPlannedDiseaseContainer from "./EditClickedPlannedDiseaseContainer/EditClickedPlannedDiseaseContainer";
import EditClickedPlannedProcedureContainer from "./EditClickedPlannedProcedureContainer/EditClickedPlannedProcedureContainer";
import ToothModalWindowContainer from "../../ToothModalWindowContainer/ToothModalWindowContainer";

const TeethSideBar = ({
  isShowTeethSideBar,
  tooth,
  isTreatmentPlan,
  receptionId = null,
  onClickOverTeethSideBar,
  isShowModalWindow,
  setIsShowModalWindow,
  currentToothPart,
  currentToothId,
  currentPlannedDisease,
  setCurrentPlannedDisease,
  currentPlannedProcedure,
  setCurrentPlannedProcedure,
  toothTypes,
  isCheckedSelectAll,
  handleClickOnSelectAll,
  isCheckedDiseases,
  handleClickOnDisease,
  isCheckedProcedures,
  handleClickOnProcedure,
  handleClickOnAddTreatment,
  onChangeSearchInputText,
  searchTreatmentPlanValue,
  currentDiagnosisOfToothPartId,
  onClickEditDisease,
  dateConverter,
  currentProcedureOfToothPartId,
  onClickEditProcedure,
  stopPropagation,
}) => {
  return (
    <div
      className={
        tsb.modal__window_wrapper + ` ${isShowTeethSideBar && tsb.show}`
      }
      onClick={onClickOverTeethSideBar}
    >
      {isShowModalWindow && (
        <ToothModalWindowContainer
          setIsShowModalWindow={setIsShowModalWindow}
          title={isTreatmentPlan ? "Добавить план лечения" : "Добавить наряд"}
          currentToothId={currentToothId}
          toothId={tooth.id}
          isTreatmentPlan={isTreatmentPlan}
          receptionId={receptionId}
        />
      )}

      {currentPlannedDisease !== null && (
        <EditClickedPlannedDiseaseContainer
          close={() => {
            setCurrentPlannedDisease(null);
          }}
          diagnosis={currentPlannedDisease}
          toothId={tooth.id || null}
          isTreatmentPlan={isTreatmentPlan}
        />
      )}
      {currentPlannedProcedure !== null && (
        <EditClickedPlannedProcedureContainer
          close={() => {
            setCurrentPlannedProcedure(null);
          }}
          plannedProcedure={currentPlannedProcedure}
          toothId={tooth.id || null}
          isTreatmentPlan={isTreatmentPlan}
        />
      )}
      <div className={tsb.modal__window} onClick={stopPropagation}>
        <div className={tsb.modal__tooth_wrapper}>
          <div className={tsb.tooth__wrapper}>
            {toothTypes && tooth && toothTypes[tooth["toothTypeId"]]}
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheckedSelectAll}
                  onClick={handleClickOnSelectAll}
                />
              }
              label={"Все части зуба"}
            />
            {isTreatmentPlan && (
              <FormControlLabel
                checked={isCheckedDiseases}
                onClick={handleClickOnDisease}
                control={<Checkbox />}
                label={"Болезни"}
              />
            )}
            <FormControlLabel
              checked={isCheckedProcedures}
              onClick={handleClickOnProcedure}
              control={<Checkbox />}
              label={"Процедуры"}
            />
          </FormGroup>
        </div>
        <div className={tsb.treatment__header_wrapper}>
          <div
            className={tsb.add__treatment_wrapper}
            onClick={handleClickOnAddTreatment}
          >
            <img src={AddTreatment} />
          </div>
          <div className={tsb.search__wrapper}>
            <input
              type="text"
              placeholder="Поиск"
              onChange={onChangeSearchInputText}
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
                                onClick={onClickEditDisease(item)}
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
                                onClick={onClickEditProcedure(item)}
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
