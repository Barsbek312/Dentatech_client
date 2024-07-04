import React, { useEffect, useState } from "react";
import tmw from "./ToothModalWindow.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Controller, useForm } from "react-hook-form";
import AddDisease from "./AddDisease/AddDisease";
import AddProcedure from "./AddProcedure/AddProcedure";
import {
  createCompletedProcedure,
  createTreatmentPlan,
  getCompletedProcedure,
  getPatientTreatmentPlan,
} from "../../../redux/procedure";
import Notification from "../../Common/Notification/Notification";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";

const ToothModalWindow = ({
  setIsShowModalWindow = () => {},
  title,
  currentToothPart,
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

  return (
    <div
      className={tmw.modal__window_wrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsShowModalWindow(false);
      }}
    >
      {(isShowDiseaseModalWindow && (
        <AddDisease setIsShowDiseaseModalWindow={setIsShowDiseaseModalWindow} />
      )) ||
        (isShowProcedureModalWindow && (
          <AddProcedure
            setIsShowProcedureModalWindow={setIsShowProcedureModalWindow}
          />
        )) || (
          <div
            className={tmw.modal__window}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{title}</h2>
            <div className={tmw.main}>
              {isTreatmentPlan && (
                <div className={tmw.disease__wrapper}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={"planned_disease_id"}>
                      {errors["diseaseId"]
                        ? errors["diseaseId"].message
                        : "Болезнь"}
                    </InputLabel>
                    <Controller
                      name="diseaseId"
                      control={control}
                      defaultValue={""}
                      render={({ field, fieldState: { error } }) => (
                        <Select
                          {...field}
                          labelId={"planned_disease_id"}
                          label={error ? error.message : "Болезнь"}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          <MenuItem
                            key={0}
                            value={0}
                            onClick={() => setIsShowDiseaseModalWindow(true)}
                          >
                            Добавить
                          </MenuItem>
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
              )}
              <div className={tmw.procedure__wrapper}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors["procedureId"]}
                >
                  <Controller
                    name="procedureId"
                    defaultValue={[]}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Autocomplete
                        {...field}
                        id="tags-outlined"
                        multiple
                        options={availableProcedure}
                        getOptionLabel={(option) => option.procedure}
                        filterSelectedOptions
                        size="small"
                        onChange={handleProcedureChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={error ? error.message : "Процедура"}
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>
              </div>
            </div>
            <button onClick={handleSubmit(handleFormSubmit)}>Create</button>
            <button onClick={() => setIsShowModalWindow(false)}>Cancel</button>
          </div>
        )}
    </div>
  );
};

export default ToothModalWindow;
