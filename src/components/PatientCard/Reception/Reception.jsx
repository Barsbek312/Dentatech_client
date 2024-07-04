import React, { useEffect, useState } from "react";
import r from "./Reception.module.css";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPatientSchedule } from "../../../redux/patient";
import { useNavigate } from "react-router-dom";
import ReceptionBill from "./ReceptionBill/ReceptionBill";

const Reception = () => {
  const dispatch = useDispatch();
  const { patientCard, patientSchedule } = useSelector(
    (state) => state.patient
  );
  const navigate = useNavigate();

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
  return (
    <div className="container">
      {clickedReception && (
        <ReceptionBill
          receptionId={clickedReception}
          onClose={() => setClickedReception(null)}
        />
      )}
      {patientSchedule && patientSchedule.length > 0 ? (
        <>
          <div className={r.reception__header}>
            <h3 className="ellipsis_line_1">Дата приема</h3>
            <h3 className="ellipsis_line_1">Стоматолог</h3>
            <h3 className="ellipsis_line_1">Время</h3>
            <h3 className="ellipsis_line_1">Итого</h3>
          </div>
          <div className={r.reception__wrapper}>
            {patientSchedule &&
              patientSchedule
                .slice()
                .reverse()
                .map((item) => (
                  <Tooltip
                    onClick={() => setClickedReception(item.id)}
                    title={
                      <React.Fragment>
                        <div className={r.reception__description}>
                          {`Назначил прием: ${item.referringStaff.surname} ${item.referringStaff.name}`}{" "}
                          <br />
                          {`Статус: ${item.receptionStatus.receptionStatus}`}{" "}
                          <br />
                          {`Тип консультации: ${item.receptionType.receptionType}`}{" "}
                          <br />
                        </div>
                      </React.Fragment>
                    }
                  >
                    <div className={r.reception}>
                      <div className={r.reception__date_wrapper}>
                        <h4 className="ellipsis_line_1">
                          {dateConverter(item.end)}
                        </h4>
                      </div>
                      <div className={r.reception__doctor}>
                        <h4 className="ellipsis_line_1">
                          {item.attendingStaff.name}{" "}
                          {item.attendingStaff.surname}
                        </h4>
                      </div>
                      <div className={r.reception__start_end}>
                        <h4 className="ellipsis_line_1">
                          {startEndHourConverter(item.start, item.end)}
                        </h4>
                      </div>
                      <div className={r.reception__total_wrapper}>
                        <strong className="ellipsis_line_1">
                          {countTotalSum(item.medicalHistory)}
                        </strong>
                      </div>
                    </div>
                  </Tooltip>
                ))}
          </div>
        </>
      ) : (
        <div className={r.reception__absence}>
          <h4>{"Пока нет процедур :)"}</h4>
        </div>
      )}
    </div>
  );
};

export default Reception;
