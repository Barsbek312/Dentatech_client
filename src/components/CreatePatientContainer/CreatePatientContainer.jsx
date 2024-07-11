import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPatient, getDistrict, getPatientStatus, getPatientType } from "../../redux/patient";
import { removeNotification, setErrorNotification, setNotificationText, showNotification } from "../../redux/notification";
import { getCity } from "../../redux/user";
import CreatePatient from "./CreatePatient/CreatePatient";

const CreatePatientContainer = ({ onClose = () => {} }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const { district, patientStatus, patientType } = useSelector(
        (state) => state.patient
      );
      const { user, city } = useSelector((state) => state.user);
      const dispatch = useDispatch();
      const [arrCities, setArrCities] = useState([]);
      const [where, setWhere] = useState([
        "По рекомендации знакомых",
        "Щит на улице",
        "Телевидение",
        "Флаер",
        "Интернет",
      ]);
    
      useEffect(() => {
        dispatch(getDistrict());
        dispatch(getPatientStatus());
        dispatch(getPatientType());
      }, []);
    
      const handleFormSubmit = async (data) => {
        if (user && user.clinicId) {
          data["clinicId"] = user.clinicId;
          data["birthDate"] = new Date(data["birthDate"]).toISOString();
          const res = await dispatch(createPatient(data));
          if (res.payload.status === 201) {
            dispatch(setNotificationText("Пациент был успешно создан"));
            dispatch(setErrorNotification(false));
            dispatch(showNotification());
            removeNotification(dispatch);
          }
          onClose();
        } else {
          dispatch(setNotificationText("Вышла ошибка: попробуйте позже"));
          dispatch(setErrorNotification(true));
          dispatch(showNotification());
          removeNotification(dispatch);
        }
      };
    
      useEffect(() => {
        const fetchCity = async () => {
          await dispatch(getCity());
        };
        fetchCity();
      }, []);
    
      useEffect(() => {
        setArrCities(city);
      }, [city]);
    
      const stopPropagation = (e) => e.stopPropagation();

      return <CreatePatient 
        onClose={onClose}
        stopPropagation={stopPropagation}
        register={register}
        errors={errors}
        control={control}
        arrCities={arrCities}
        district={district}
        where={where}
        patientType={patientType}
        patientStatus={patientStatus}
        handleSubmit={handleSubmit}
        handleFormSubmit={handleFormSubmit}
      />
};

export default CreatePatientContainer;
