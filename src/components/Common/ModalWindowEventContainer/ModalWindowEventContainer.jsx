import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAdmission, getScheduleType } from "../../../redux/schedule";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";
import { getPatient } from "../../../redux/patient";
import { getPersonal } from "../../../redux/personal";
import ModalWindowEvent from "./ModalWindowEvent/ModalWindowEvent";

const ModalWindowEventContainer = ({
  onClose,
  selectedDate = "",
  patientId = null,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state) => state.user);
  const { patient } = useSelector((state) => state.patient);
  const { scheduleType } = useSelector((state) => state.schedule);
  const { personal } = useSelector((state) => state.personal);

  const [isCreatePatient, setIsCreatePatient] = useState(false);

  const formatDate = (date) => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const handleFormSubmit = async (data) => {
    const backgroundColorRandom = [
      "rgba(14, 165, 233, 0.7)",
      "rgba(244, 63, 94, 0.8)",
      "rgba(109, 40, 217, 0.7)",
      "rgba(245, 158, 11, 0.8)",
    ];
    if (patientId) {
      data["patientId"] = patientId;
    }
    data["isCanceled"] = false;
    data["referringStaffId"] = user.id;
    data["start"] = `${formatDate(data["date"])}T${data["start"]}:00.000Z`;
    data["end"] = `${formatDate(data["date"])}T${data["end"]}:00.000Z`;
    data["backgroundColor"] =
      backgroundColorRandom[
        Math.floor(Math.random() * backgroundColorRandom.length)
      ];
    delete data["date"];
    const res = await dispatch(addAdmission(data));
    if (res.type === "schedule/addAdmission/fulfilled") {
      dispatch(setErrorNotification(false));
      dispatch(setNotificationText("Прием был успешно создан"));
    } else {
      dispatch(setErrorNotification(true));
      dispatch(
        setNotificationText(
          res?.payload?.response?.data?.message ||
            "Прием не был создан, попробуйте еще раз"
        )
      );
    }
    dispatch(showNotification());
    removeNotification(dispatch);
    onClose();
  };

  useEffect(() => {
    if (user && user.branchId) {
      dispatch(getPatient(user.branchId));
      dispatch(getScheduleType());
      dispatch(getPersonal(user.clinicId));
    }
  }, []);

  const onClickCreatePatient = (event) => {
    setIsCreatePatient(true);
  };

  const onCloseCreatePatient = () => {
    setIsCreatePatient(false);
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <ModalWindowEvent
      onClose={onClose}
      selectedDate={selectedDate}
      patientId={patientId}
      isCreatePatient={isCreatePatient}
      onCloseCreatePatient={onCloseCreatePatient}
      stopPropagation={stopPropagation}
      errors={errors}
      control={control}
      onClickCreatePatient={onClickCreatePatient}
      patient={patient}
      user={user}
      personal={personal}
      scheduleType={scheduleType}
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      register={register}
    />
  );
};

export default ModalWindowEventContainer;
