import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompletedProcedure,
  createTreatmentPlan,
  getCompletedProcedure,
  getPatientTreatmentPlan,
} from "../../../../redux/procedure";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";
import ToothModalWindow from "./ToothModalWindow/ToothModalWindow";

const ToothModalWindowContainer = ({
  setIsShowModalWindow = () => {},
  title,
  currentToothId,
  toothId,
  isTreatmentPlan,
  receptionId = null,
}) => {
  const { disease } = useSelector((state) => state.disease);
  const { patientCard } = useSelector((state) => state.patient);
  const { isAuth, user } = useSelector((state) => state.user);
  const { procedure } = useSelector((state) => state.procedure);

  const dispatch = useDispatch();

  const [isShowDiseaseModalWindow, setIsShowDiseaseModalWindow] =
    useState(false);
  const [isShowProcedureModalWindow, setIsShowProcedureModalWindow] =
    useState(false);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const [availableProcedure, setAvailableProcedure] = useState([]);

  useEffect(() => {
    const values = getValues("procedureId");
    const selectedProcedureIds = values.map((value) => value.id);

    const updatedAvailableProcedure = procedure.filter(
      (item) => !selectedProcedureIds.includes(item.id)
    );
    setAvailableProcedure([
      { id: 0, procedure: "Добавить" },
      ...updatedAvailableProcedure,
    ]);
  }, [procedure]);

  const handleProcedureChange = (e, values) => {
    if (e.target.innerText === "Добавить") {
      setIsShowProcedureModalWindow(true);
      return 0;
    }
    setValue("procedureId", values);

    const selectedProcedureIds = values.map((value) => value.id);

    const updatedAvailableProcedure = procedure.filter(
      (item) => !selectedProcedureIds.includes(item.id)
    );
    setAvailableProcedure([
      { id: 0, procedure: "Добавить" },
      ...updatedAvailableProcedure,
    ]);
  };

  const handleFormSubmit = async (data) => {
    if (data && !data.procedureId.length && !data.diseaseId) {
      setError("procedureId", {
        type: "custom",
        message: "Вы не заполнили один из полей",
      });
      setError("diseaseId", {
        type: "custom",
        message: "Вы не заполнили один из полей",
      });
      return 0;
    } else if (!data.diseaseId && data.diseaseId === "") {
      delete data.diseaseId;
    } else if (data.procedureId && !data.procedureId.length) {
      delete data.procedureId;
    }

    if (isAuth && patientCard) {
      data["toothPartConnectId"] = currentToothId;
      if (isTreatmentPlan) {
        data["patientId"] = patientCard.id;
        data["staffId"] = user.id;
      } else {
        data["receptionId"] = +receptionId;
      }
      if (data.procedureId) {
        data["procedureId"] = data.procedureId.map((item) => item.id);
      }
      let res;
      if (isTreatmentPlan) {
        res = await dispatch(createTreatmentPlan(data));
      } else {
        res = await dispatch(createCompletedProcedure(data));
      }

      setIsShowModalWindow(false);
      if (res.payload.status === 201) {
        dispatch(setErrorNotification(false));
        dispatch(
          setNotificationText(
            isTreatmentPlan
              ? "План лечения был успешно создан"
              : "Наряд был успешно создан"
          )
        );
        if (isTreatmentPlan) {
          dispatch(
            getPatientTreatmentPlan({
              patientId: patientCard.id,
              toothId,
            })
          );
        } else {
          dispatch(getCompletedProcedure({ receptionId, toothId }));
        }
      } else {
        dispatch(setErrorNotification(true));
        dispatch(
          setNotificationText(
            res?.payload?.response?.data?.message || isTreatmentPlan
              ? "План лечения не создан, попробуйте еще раз"
              : "Наряд не создан, попробуйте еще раз"
          )
        );
      }
      dispatch(showNotification());
      removeNotification(dispatch);
    }
  };

  useEffect(() => {
    if (!isShowDiseaseModalWindow && isTreatmentPlan) {
      setValue("diseaseId", "");
    }
  }, [isShowDiseaseModalWindow]);

  const stopPropagation = (e) => e.stopPropagation();
  const close = () => setIsShowModalWindow(false);

  const onClickOverModalWindow = (e) => {
    stopPropagation(e);
    close();
  };

  const onClickShowDiseaseModalWindow = () => {
    setIsShowDiseaseModalWindow(true);
  };

  return (
    <ToothModalWindow
      title={title}
      isTreatmentPlan={isTreatmentPlan}
      onClickOverModalWindow={onClickOverModalWindow}
      isShowDiseaseModalWindow={isShowDiseaseModalWindow}
      setIsShowDiseaseModalWindow={setIsShowDiseaseModalWindow}
      isShowProcedureModalWindow={isShowProcedureModalWindow}
      setIsShowProcedureModalWindow={setIsShowProcedureModalWindow}
      stopPropagation={stopPropagation}
      errors={errors}
      control={control}
      onClickShowDiseaseModalWindow={onClickShowDiseaseModalWindow}
      disease={disease}
      availableProcedure={availableProcedure}
      handleProcedureChange={handleProcedureChange}
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      close={close}
    />
  );
};

export default ToothModalWindowContainer;
