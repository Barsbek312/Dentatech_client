import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../../../redux/notification";
import {
  deleteCompletedProcedure,
  deletePlannedProcedure,
  editCompletedProcedure,
  editPlannedProcedure,
  getCompletedProcedure,
  getPatientTreatmentPlan,
} from "../../../../../../redux/procedure";
import EditClickedPlannedProcedure from "./EditClickedPlannedProcedure/EditClickedPlannedProcedure";

const EditClickedPlannedProcedureContainer = ({
  close,
  plannedProcedure,
  toothId,
  isTreatmentPlan,
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

  const handleClickOnDeleteProcedure = (procedureId) => async (e) => {
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

  const stopPropagation = (e) => e.stopPropagation();

  const onClickOverModalWindow = (e) => {
    stopPropagation(e);
    close();
  };

  return <EditClickedPlannedProcedure 
    close={close}
    plannedProcedure={plannedProcedure}
    onClickOverModalWindow={onClickOverModalWindow}
    stopPropagation={stopPropagation}
    errors={errors}
    control={control}
    procedure={procedure}
    handleSubmit={handleSubmit}
    handleFormSubmit={handleFormSubmit}
    handleClickOnDeleteProcedure={handleClickOnDeleteProcedure}
  />
};

export default EditClickedPlannedProcedureContainer;
