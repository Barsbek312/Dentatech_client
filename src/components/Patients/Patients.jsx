import React, { useState, useEffect } from "react";
import p from "./Patients.module.css";
import patient_card from "./../../assets/images/common__images/user-card.svg";
import add_patient_img from "./../../assets/images/common__images/add.svg";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, getStaffPatientList } from "../../redux/patient";
import { useNavigate } from "react-router-dom";
import CreatePatient from "../CreatePatient/CreatePatient";
import { MenuItem, Select } from "@mui/material";
import { getPersonal } from "../../redux/personal";
import "./Patients.css";
import Nothing from "./../Common/Nothing/Nothing";

const Patients = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState(-1);
  const { user, isAuth } = useSelector((state) => state.user);
  const { patient, staffPatientList } = useSelector((state) => state.patient);
  const { personal } = useSelector((state) => state.personal);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOnPatient = async (patientId) => {
    navigate(`/patient-card/${patientId}`);
  };

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (user && isAuth) {
      dispatch(getPatient(user.clinicId));
      dispatch(getPersonal(user.clinicId));
      dispatch(getStaffPatientList(user.id));
    }
  }, [user, isAuth]);

  const handleChangeStaff = async (e) => {
    const currentValue = e.target.value;
    setIsActiveIndex(e.target.value);
    if (user && user.id) {
      if (parseInt(currentValue) === -1) {
        dispatch(getPatient(user.clinicId));
      } else {
        dispatch(getStaffPatientList(currentValue));
      }
    }
  };

  const listOfPatients = (
    isActiveIndex === -1 && patient ? patient : staffPatientList || []
  )
    .filter(
      (item) =>
        item?.["name"].toLowerCase().includes(inputValue.toLowerCase()) ||
        item?.["surname"].toLowerCase().includes(inputValue.toLowerCase())
    )
    ?.map((item) => (
      <li className={p.patient__list_item}>
        <div className={p.patient__info_wrapper}>
          <h2 className="ellipsis_line_1">
            {(item?.name && item?.surname && `${item.name} ${item.surname}`) ||
              "Unknown"}
          </h2>
          <h3 className="ellipsis_line_1">{item?.phone || "Unknown"}</h3>
          <strong className="ellipsis_line_1">
            {(item?.birthDate && calculateAge(item.birthDate)) || "Unknown"}
          </strong>
        </div>
        <div>
          <div
            className={p.patient__card_wrapper}
            onClick={() => handleClickOnPatient(item.id)}
          >
            <img src={patient_card} alt="patient-card-logo" />
          </div>
        </div>
      </li>
    ));

  return (
    <main className={p.main__wrapper}>
      <div className="container">
        {isShow && <CreatePatient onClose={() => setIsShow(false)} />}
        <div className={p.header}>
          <h2>Пациенты</h2>
        </div>
        <div className={p.category__list_wrapper + " " + p.adaptive__category_list}>
          {user && user.id && (
            <Select defaultValue={-1} onChange={handleChangeStaff}>
              <MenuItem value={-1}>Все</MenuItem>
              <MenuItem value={(user && user.id) || null}>Вы</MenuItem>
              {personal &&
                personal.map((item) => {
                  if (item.id !== user.id) {
                    return (
                      <MenuItem value={item.id} key={item.id}>
                        {(item?.name &&
                          item?.surname &&
                          `${item.name} ${item.surname}`) ||
                          "Unknown"}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          )}
        </div>
        <div className={p.main}>
          <div className={p.main_header}>
            <div className={p.begin}>
              <div className={p.add__patient_wrapper}>
                <div
                  className={p.add__logo_wrapper}
                  onClick={() => setIsShow(true)}
                >
                  <img src={add_patient_img} alt="add-staff-logo" />
                </div>
                <span onClick={() => setIsShow(true)}>Добавить пациента</span>
              </div>
            </div>
            <div className={p.category__list_wrapper}>
              {user && user.id && (
                <Select defaultValue={-1} onChange={handleChangeStaff}>
                  <MenuItem value={-1}>Все</MenuItem>
                  <MenuItem value={(user && user.id) || null}>Вы</MenuItem>
                  {personal &&
                    personal.map((item) => {
                      if (item.id !== user.id) {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {(item?.name &&
                              item?.surname &&
                              `${item.name} ${item.surname}`) ||
                              "Unknown"}
                          </MenuItem>
                        );
                      }
                    })}
                </Select>
              )}
            </div>
            <div className={p.search_wrapper}>
              <div className={p.search}>
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
              </div>
            </div>
          </div>
          <div className={p.main_body}>
            {listOfPatients && listOfPatients.length > 0 ? (
              <ul className={p.main__body_list}>{listOfPatients}</ul>
            ) : (
              <Nothing text={"У вас пока нет пациентов"} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Patients;
