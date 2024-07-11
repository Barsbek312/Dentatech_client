import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../../redux/patient";
import { getScheduleType } from "../../../redux/schedule";
import { getPersonal } from "../../../redux/personal";
import ModalWindowDescriptionEvent from "./ModalWindowDescriptionEvent/ModalWindowDescriptionEvent";

const ModalWindowDescriptionEventContainer = ({
  onCloseEvent = () => {},
  reception = {},
  onDeleteReception = () => {},
  onUpdateReception = () => {},
  isTreatmentPlan,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { patient } = useSelector((state) => state.patient);
  const { scheduleType } = useSelector((state) => state.schedule);
  const { personal } = useSelector((state) => state.personal);

  const [isCreatePatient, setIsCreatePatient] = useState(false);

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

  const isEmptyObj = (data) => {
    for (const prop in data) {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        return false;
      }
    }
    return true;
  };

  const formatDate = (date) => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const handleFormSubmit = (data) => {
    data["start"] = `${formatDate(data["date"])}T${data["start"]}:00.000Z`;
    data["end"] = `${formatDate(data["date"])}T${data["end"]}:00.000Z`;
    delete data["date"];
    for (let i in data) {
      data[i] = data[i] === reception[i] ? null : data[i]; // Если значения ключа такая же как и была до изменения, то не добавлять его в data
      data[i] === null && delete data[i]; // TextField будет null если он не изменялся и соответственно, не нуждается в добавлении в data
    }
    if (isEmptyObj(data)) {
      data = null;
    } else {
      data["id"] = reception.id;
    }
    onUpdateReception(data);
  };

  const onClickDeleteReception = (key) => (e) => onDeleteReception(key);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <ModalWindowDescriptionEvent
      onCloseEvent={onCloseEvent}
      reception={reception}
      isTreatmentPlan={isTreatmentPlan}
      isCreatePatient={isCreatePatient}
      errors={errors}
      onClickDeleteReception={onClickDeleteReception}
      handleFormSubmit={handleFormSubmit}
      handleSubmit={handleSubmit}
      register={register}
      control={control}
      scheduleType={scheduleType}
      patient={patient}
      onClickCreatePatient={onClickCreatePatient}
      user={user}
      personal={personal}
      stopPropagation={stopPropagation}
      onCloseCreatePatient={onCloseCreatePatient}
    />
  );
};

export default ModalWindowDescriptionEventContainer;
