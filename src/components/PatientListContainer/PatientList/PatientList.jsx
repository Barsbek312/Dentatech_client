import React from "react";
import p from "./PatientList.module.css";
import add_patient_img from "./../../../assets/images/common__images/add.svg";
import { MenuItem, Select } from "@mui/material";
import "./PatientList.css";
import Nothing from "./../../Common/Nothing/Nothing";
import CreatePatientContainer from "../../CreatePatientContainer/CreatePatientContainer";

const PatientList = ({
  isShow,
  setIsShow,
  user,
  handleChangeStaff,
  personal,
  onClickAddPatient,
  setInputValue,
  inputValue,
  listOfPatients
}) => {
  return (
    <main className={p.main__wrapper}>
      <div className="container">
        {/* fix */}
        {isShow && <CreatePatientContainer onClose={() => setIsShow(false)} />}
        <div className={p.header}>
          <h2>Пациенты</h2>
        </div>
        <div
          className={p.category__list_wrapper + " " + p.adaptive__category_list}
        >
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
                  onClick={onClickAddPatient}
                >
                  <img src={add_patient_img} alt="add-staff-logo" />
                </div>
                <span onClick={onClickAddPatient}>Добавить пациента</span>
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

export default PatientList;
