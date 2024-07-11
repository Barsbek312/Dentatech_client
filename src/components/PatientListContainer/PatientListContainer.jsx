import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPatient, getStaffPatientList } from "../../redux/patient";
import { getPersonal } from "../../redux/personal";
import p from "./PatientList/PatientList.module.css";
import PatientList from "./PatientList/PatientList";
import patient_card from './../../assets/images/common__images/user-card.svg'
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const PatientListContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState(-1);
  const { user, isAuth } = useSelector((state) => state.user);
  const { patient, staffPatientList } = useSelector((state) => state.patient);
  const { personal } = useSelector((state) => state.personal);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOnPatient = (patientId) => (e) => {
    navigate(`/patient-card/${patientId}/0`);
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
            onClick={handleClickOnPatient(item.id)}
          >
            <img src={patient_card} alt="patient-card-logo" />
          </div>
        </div>
      </li>
    ));

  const onClickAddPatient = () => setIsShow(true);

  return (
    <PatientList
      isShow={isShow}
      setIsShow={setIsShow}
      user={user}
      handleChangeStaff={handleChangeStaff}
      personal={personal}
      onClickAddPatient={onClickAddPatient}
      setInputValue={setInputValue}
      inputValue={inputValue}
      listOfPatients={listOfPatients}
    />
  );
};

export default compose(WithAuthRedirect)(PatientListContainer);
