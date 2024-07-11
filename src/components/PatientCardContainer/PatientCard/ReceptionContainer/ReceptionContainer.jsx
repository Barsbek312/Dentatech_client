import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientSchedule } from "../../../../redux/patient";
import Reception from "./Reception/Reception";

const ReceptionContainer = () => {
  const dispatch = useDispatch();
  const { patientCard, patientSchedule } = useSelector(
    (state) => state.patient
  );

  const [clickedReception, setClickedReception] = useState(null);

  useEffect(() => {
    if (patientCard && patientCard.id) {
      dispatch(getPatientSchedule(patientCard.id));
    }
  }, [patientCard]);

  const dateConverter = (date) => {
    const inputDate = new Date(date);

    const listOfMonths = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    const day = inputDate.getDate();

    return `${listOfMonths[month]} ${day}, ${year}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const startEndHourConverter = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startTimeFormatted = formatTime(startDate);
    const endTimeFormatted = formatTime(endDate);

    return `${startTimeFormatted}-${endTimeFormatted}`;
  };

  const countTotalSum = (medicalHistory) => {
    const totalSum =
      medicalHistory &&
      medicalHistory.reduce((sum, current) => {
        return sum + parseInt(current.procedure.price);
      }, 0);

    return totalSum;
  };

  const onClickReception = (receptionId) => (e) => {
    if (receptionId) setClickedReception(receptionId);
  };

  const onClose = () => setClickedReception(null);

  return (
    <Reception
      clickedReception={clickedReception}
      patientSchedule={patientSchedule}
      onClickReception={onClickReception}
      dateConverter={dateConverter}
      startEndHourConverter={startEndHourConverter}
      countTotalSum={countTotalSum}
      onClose={onClose}
    />
  );
};

export default ReceptionContainer;
