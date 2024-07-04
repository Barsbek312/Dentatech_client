import React, { useEffect, useState } from "react";
import pb from "./PatientBill.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientBill } from "../../../redux/bill";
import { Tooltip } from "@mui/material";

const PatientBill = ({ patientId }) => {
  const dispatch = useDispatch();
  const { patientBill } = useSelector((state) => state.bill);

  const [listOfPatientBill, setListOfPatientBill] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(getPatientBill(patientId));
  }, []);

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

  useEffect(() => {
    setListOfPatientBill([]);
    setTotal(0);
    patientBill &&
      patientBill.receptions &&
      patientBill.receptions.forEach((item) => {
        item.medicalHistory.forEach((disease) => {
          setTotal(
            (prevState) => prevState + parseInt(disease.procedure.price)
          );
          setListOfPatientBill((prevState) => [
            ...prevState,
            {
              date: dateConverter(item.end),
              procedure: disease.procedure.procedure,
              tooth: disease.toothPartConnect.tooth.tooth,
              price: parseInt(disease.procedure.price),
              staff: `${item.attendingStaff.surname} ${item.attendingStaff.name}`,
            },
          ]);
        });
      });
  }, [patientBill]);

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
              {listOfPatientBill.slice().reverse().map((item, index) => (
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
