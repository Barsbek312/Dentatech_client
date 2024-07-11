import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../../redux/notification";
import {
  getDistrict,
  getPatientStatus,
  getPatientType,
  updatePatient,
} from "../../../../redux/patient";
import dayjs from "dayjs";
import { getCity } from "../../../../redux/user";
import General from "./General/General";

const GeneralContainer = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { patientCard, district, patientStatus, patientType } = useSelector(
    (state) => state.patient
  );
  const { city } = useSelector((state) => state.user);

  const [treatingDentist, setTreatingDentist] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [where, setWhere] = useState([
    "По рекомендации знакомых",
    "Щит на улице",
    "Телевидение",
    "Флаер",
    "Интернет",
  ]);

  const changeGeneralInfo = async (data) => {
    for (let i in data) {
      data[i] = data[i] === patientCard[i] ? null : data[i]; // Если значения ключа такая же как и была до изменения, то не добавлять его в data
      data[i] === null && delete data[i]; // TextField будет null если он не изменялся и соответственно, не нуждается в добавлении в data
    }

    data["isMale"] &&
      !(data["isMale"] === "false") === patientCard["isMale"] &&
      delete data["isMale"]; // удаляем isMale отдельно, так как isMale в data представлена как строка, а в patientCard как boolean

    if (Object.keys(data).length === 0) {
      setIsEdit(false);
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Данные не были изменены"));
      dispatch(showNotification());
      removeNotification(dispatch);
      return 0;
    }
    if (dayjs.isDayjs(data["birthDate"])) {
      data["birthDate"] = new Date(data["birthDate"]).toISOString();
    }
    data["isMale"] = data["isMale"] === "true";

    if (patientCard) {
      const res = await dispatch(
        updatePatient({ id: patientCard["id"], data })
      );
      if (res.type && res.type === "patient/updatePatient/fulfilled") {
        dispatch(setErrorNotification(false));
        dispatch(setNotificationText("Данные пациента были успешно изменены"));
        dispatch(showNotification());
        removeNotification(dispatch);
      }
      setIsEdit(false);
    }
  };

  const onClickCancel = () => {
    reset();
    setIsEdit(false);
  };

  useEffect(() => {
    dispatch(getCity());
    dispatch(getDistrict());
    dispatch(getPatientStatus());
    dispatch(getPatientType());
  }, []);

  useEffect(() => {
    if (
      patientCard &&
      patientCard["patientDentist"] &&
      patientCard["patientDentist"].length > 0
    ) {
      setTreatingDentist(
        patientCard["patientDentist"]
          .map(
            (dentist) =>
              `${dentist["attendingStaff"]["surname"]} ${dentist["attendingStaff"]["name"]}`
          )
          .join(", ")
      );
    }
  }, [patientCard]);

  const onClickChangeGeneralInfo = () => {
    setIsEdit(true);
  };

  return (
    <General
      isEdit={isEdit}
      handleSubmit={handleSubmit}
      changeGeneralInfo={changeGeneralInfo}
      onClickChangeGeneralInfo={onClickChangeGeneralInfo}
      onClickCancel={onClickCancel}
      patientCard={patientCard}
      treatingDentist={treatingDentist}
      control={control}
      patientStatus={patientStatus}
      patientType={patientType}
      where={where}
      district={district}
      city={city}
      errors={errors}
    />
  );
};

export default GeneralContainer;
