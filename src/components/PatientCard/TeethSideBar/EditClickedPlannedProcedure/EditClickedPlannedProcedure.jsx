import React, { useEffect } from "react";
import tmw from "./../../ToothModalWindow/ToothModalWindow.module.css";
import { useForm, Controller } from "react-hook-form";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";
import {
  deleteCompletedProcedure,
  deletePlannedProcedure,
  editCompletedProcedure,
  editPlannedProcedure,
  getCompletedProcedure,
  getPatientTreatmentPlan,
} from "../../../../redux/procedure";

const EditClickedPlannedProcedure = ({
  close,
  plannedProcedure,
  toothId,
  isTreatmentPlan,
  receptionId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { procedure } = useSelector((state) => state.procedure);

  const handleFormSubmit = async (data) => {
    if (data.procedureId === plannedProcedure.procedure.id) {
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Вы не изменили процедуру"));
    } else {
      let res;
      if (isTreatmentPlan) {
        res = await dispatch(
          editPlannedProcedure({
            id: plannedProcedure.id,
            ...data,
          })
        );
      } else {
        res = await dispatch(
          editCompletedProcedure({ id: plannedProcedure.id, ...data })
        );
      }
      if (
        (isTreatmentPlan &&
          res.type === "procedure/edit-planned-procedure/fulfilled") ||
        (!isTreatmentPlan &&
          res.type === "procedure/editCompletedProcedure/fulfilled")
      ) {
        dispatch(setErrorNotification(false));
        dispatch(
          setNotificationText(
            isTreatmentPlan
              ? "Запланированная процедура была успешно изменена"
              : "Наряд был успешно изменен"
          )
        );
        if (isTreatmentPlan) {
          dispatch(
            getPatientTreatmentPlan({
              patientId: plannedProcedure.patientId,
              toothId,
            })
          );
        } else {
          dispatch(
            getCompletedProcedure({
              receptionId: plannedProcedure.reception.id,
              toothId,
            })
          );
        }
      } else {
        dispatch(setErrorNotification(true));
        dispatch(
          setNotificationText(
            res?.payload?.response?.data?.message || isTreatmentPlan
              ? "Запланированная процедура не изменена, попробуйте еще раз"
              : "Наряд не изменен, попробуйте еще раз"
          )
        );
      }
      close();
    }

    dispatch(showNotification());
    removeNotification(dispatch);
  };

  const handleClickOnDeleteProcedure = async (procedureId) => {
    let res;
    if (isTreatmentPlan) {
      res = await dispatch(deletePlannedProcedure(procedureId));
    } else {
      res = await dispatch(deleteCompletedProcedure(procedureId));
    }

    if (
      (isTreatmentPlan &&
        res.type === "procedure/delete-planned-procedure/fulfilled") ||
      (!isTreatmentPlan &&
        res.type === "procedure/deleteCompletedProcedure/fulfilled")
    ) {
      dispatch(setErrorNotification(false));
      dispatch(
        setNotificationText(
          isTreatmentPlan
            ? "Запланированная процедура была успешно удалена"
            : "Наряд был успешно удален"
        )
      );
      if (isTreatmentPlan) {
        dispatch(
          getPatientTreatmentPlan({
            patientId: plannedProcedure.patientId,
            toothId,
          })
        );
      } else {
        dispatch(
          getCompletedProcedure({
            receptionId: plannedProcedure.reception.id,
            toothId,
          })
        );
      }
    } else {
      dispatch(setErrorNotification(true));
      dispatch(
        setNotificationText(
          res?.payload?.response?.data?.message || isTreatmentPlan
            ? "Запланированная процедура не удалена, попробуйте еще раз"
            : "Наряд не был удален, попробуйте еще раз"
        )
      );
    }
    close();
    dispatch(showNotification());
    removeNotification(dispatch);
  };

  return (
    <div
      className={tmw.modal__window_wrapper}
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
    >
      <div className={tmw.modal__window} onClick={(e) => e.stopPropagation()}>
        <h2>Изменить процедуру</h2>
        <div className={tmw.main}>
          <FormControl fullWidth size="small">
            <InputLabel id={"planned_procedure_id"}>
              {errors["procedureId"]
                ? errors["procedureId"].message
                : "Процедура"}
            </InputLabel>
            <Controller
              name="procedureId"
              control={control}
              defaultValue={
                (plannedProcedure &&
                  plannedProcedure.procedure &&
                  plannedProcedure.procedure.id) ||
                ""
              }
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  labelId={"planned_procedure_id"}
                  label={error ? error.message : "Процедура"}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {procedure &&
                    procedure.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.procedure}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <button onClick={handleSubmit(handleFormSubmit)}>Change</button>
        <button
          onClick={() =>
            handleClickOnDeleteProcedure(plannedProcedure.id || null)
          }
        >
          Delete
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default EditClickedPlannedProcedure;
