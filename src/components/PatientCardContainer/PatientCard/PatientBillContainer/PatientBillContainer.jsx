import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientBill } from "../../../../redux/bill";
import PatientBill from "./PatientBill/PatientBill";

const PatientBillContainer = ({ patientId }) => {
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

  return <PatientBill listOfPatientBill={listOfPatientBill} total={total} />;
};

export default PatientBillContainer;
