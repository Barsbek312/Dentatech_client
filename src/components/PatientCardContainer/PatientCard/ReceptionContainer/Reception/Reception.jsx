import React from "react";
import r from "./Reception.module.css";
import { Tooltip } from "@mui/material";
import ReceptionBillContainer from "./ReceptionBillContainer/ReceptionBillContainer";

const Reception = ({
  clickedReception,
  patientSchedule,
  onClickReception,
  dateConverter,
  startEndHourConverter,
  countTotalSum,
  onClose,
}) => {
  return (
    <div className="container">
      {clickedReception && (
        <ReceptionBillContainer receptionId={clickedReception} onClose={onClose} />
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
                    onClick={onClickReception(item.id)}
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
