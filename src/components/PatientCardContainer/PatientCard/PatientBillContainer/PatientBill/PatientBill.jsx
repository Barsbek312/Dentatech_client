import React from "react";
import pb from "./PatientBill.module.css";
import { Tooltip } from "@mui/material";

const PatientBill = ({
  listOfPatientBill,
  total
}) => {
  return (
    <div className={pb.main__wrapper}>
      <div className="container">
        <div className={pb.main}>
          <table className={pb.bill__table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Процедура</th>
                <th>Дата приема</th>
                <th>Зуб</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {listOfPatientBill
                .slice()
                .reverse()
                .map((item, index) => (
                  <Tooltip title={`Доктор ${item.staff}`}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.procedure}</td>
                      <td>{item.date}</td>
                      <td>{item.tooth}</td>
                      <td>{item.price}</td>
                    </tr>
                  </Tooltip>
                ))}
              <tr>
                <td>Итого</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientBill;
