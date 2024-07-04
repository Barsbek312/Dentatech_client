import React, { useEffect } from "react";
import tmw from "./../../ToothModalWindow/ToothModalWindow.module.css";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteDiagnosis, editDiagnosis } from "../../../../redux/disease";
import { getPatientTreatmentPlan } from "../../../../redux/procedure";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";

const EditClickedPlannedDisease = ({
  close = () => {},
  diagnosis,
  toothId,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { disease } = useSelector((state) => state.disease);
  const { user } = useSelector((state) => state.user);

  const handleFormSubmit = async (data) => {
    if (data.diseaseId === diagnosis.diseases.id) {
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Вы не изменили диагноз"));
    } else {
      const res = await dispatch(
        editDiagnosis({ id: diagnosis.id, staffId: user.id || null, ...data })
      );
      if (res.type === "disease/edit-diagnosis/fulfilled") {
        dispatch(setErrorNotification(false));
        dispatch(setNotificationText("Диагноз был успешно изменен"));
        dispatch(
          getPatientTreatmentPlan({
            patientId: diagnosis.patientId,
            toothId,
          })
        );
      } else {
        dispatch(setErrorNotification(true));
        dispatch(
          setNotificationText(
            res?.payload?.response?.data?.message ||
              "Диагноз не был удален, попробуйте еще раз"
          )
        );
      }
      close();
    }
    dispatch(showNotification());
    removeNotification(dispatch);
  };

  const handleClickOnDeleteDiagnosis = async (diagnosisId) => {
    const res = await dispatch(deleteDiagnosis(diagnosisId));
    if (res.type === "disease/delete-diagnosis/fulfilled") {
      dispatch(setErrorNotification(false));
      dispatch(setNotificationText("Диагноз был успешно удален"));
      dispatch(
        getPatientTreatmentPlan({
          patientId: diagnosis.patientId,
          toothId,
        })
      );
    } else {
      dispatch(setErrorNotification(true));
      dispatch(
        setNotificationText(
          res?.payload?.response?.data?.message ||
            "Диагноз не был удален, попробуйте еще раз"
        )
      );
    }

    dispatch(showNotification());
    removeNotification(dispatch);
    close();
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
        <h2>Изменить диагноз</h2>
        <div className={tmw.main}>
          <FormControl fullWidth size="small">
            <InputLabel id={"planned_disease_id"}>
              {errors["diseaseId"] ? errors["diseaseId"].message : "Болезнь"}
            </InputLabel>
            <Controller
              name="diseaseId"
              control={control}
              defaultValue={
                (diagnosis && diagnosis.diseases && diagnosis.diseases.id) || ""
              }
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  labelId={"planned_disease_id"}
                  label={error ? error.message : "Болезнь"}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {disease &&
                    disease.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.disease}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </div>
        <button onClick={handleSubmit(handleFormSubmit)}>Change</button>
        <button onClick={() => handleClickOnDeleteDiagnosis(diagnosis.id)}>
          Delete
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default EditClickedPlannedDisease;
