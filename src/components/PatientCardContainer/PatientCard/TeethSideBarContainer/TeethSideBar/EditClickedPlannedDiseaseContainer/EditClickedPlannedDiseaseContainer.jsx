import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification, setErrorNotification, setNotificationText, showNotification } from "../../../../../../redux/notification";
import { deleteDiagnosis, editDiagnosis } from "../../../../../../redux/disease";
import { getPatientTreatmentPlan } from "../../../../../../redux/procedure";
import EditClickedPlannedDisease from "./EditClickedPlannedDisease/EditClickedPlannedDisease";

const EditClickedPlannedDiseaseContainer = ({
  close = () => {},
  diagnosis,
  toothId,
}) => {
  const {
    control,
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

  const handleClickOnDeleteDiagnosis = (diagnosisId) => async (e) => {
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

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onClickOverModalWindow = (e) => {
    stopPropagation(e);
    close();
  };

  return <EditClickedPlannedDisease 
    close={close}
    diagnosis={diagnosis}
    onClickOverModalWindow={onClickOverModalWindow}
    stopPropagation={stopPropagation}
    errors={errors}
    control={control}
    disease={disease}
    handleSubmit={handleSubmit}
    handleFormSubmit={handleFormSubmit}
    handleClickOnDeleteDiagnosis={handleClickOnDeleteDiagnosis}
  />
};

export default EditClickedPlannedDiseaseContainer;
