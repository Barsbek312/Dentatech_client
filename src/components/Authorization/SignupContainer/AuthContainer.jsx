import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../../redux/notification";
import { createUser, getCity, getPositions } from "../../../redux/user";
import Auth from "./Auth/Auth";

const AuthContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [arrPositions, setArrPositions] = useState([]);
  const [arrCities, setArrCities] = useState([]);
  const [textError, setTextError] = useState("");
  const [isVisibilePassword, setIsVisibilePassword] = useState(false);
  const [isVisibilePasswordAgain, setIsVisibilePasswordAgain] = useState(false);
  const [isContinued, setIsContinued] = useState(false);

  const { positions, city } = useSelector((state) => state.user);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    if (!isContinued) {
      setIsContinued(true);
      return;
    }
    if (data["password__again"] !== data["password"]) {
      dispatch(setNotificationText("Пароль и его подтверждение не совпали"));
      dispatch(setErrorNotification(true));
      dispatch(showNotification());
      removeNotification(dispatch);
      return 0;
    }
    data["isAdmin"] = true;
    data["staffStatusId"] = 1;
    delete data["password__again"];
    const res = await dispatch(createUser({ ...data, isRegister: true }));
    if (res?.payload?.status === 201) {
      navigate("/verify-email-notification");
    } else if (
      res?.payload?.response?.status === 403 &&
      res?.payload?.response?.data?.message === "Credentials taken"
    ) {
      setTextError("Аккаунт с такой почтой уже существует");
    } else {
      setTextError("Произошла ошибка: попробуйте еще раз или зайдите позже");
    }
  };

  const handleClickOnPasswordVisibility = () => {
    setIsVisibilePassword(!isVisibilePassword);
  };

  const handleClickOnPasswordVisibilityAgain = () => {
    setIsVisibilePasswordAgain(!isVisibilePasswordAgain);
  };

  const handleClickOnBack = () => {
    setIsContinued(false);
  };

  useEffect(() => {
    const fetchPositions = async () => {
      await dispatch(getPositions());
      await dispatch(getCity());
    };
    fetchPositions();
  }, []);

  useEffect(() => {
    setArrPositions(positions);
  }, [positions]);

  useEffect(() => {
    setArrCities(city);
  }, [city]);

  return (
    <Auth
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      isContinued={isContinued}
      handleClickOnBack={handleClickOnBack}
      register={register}
      errors={errors}
      control={control}
      isVisibilePassword={isVisibilePassword}
      handleClickOnPasswordVisibility={handleClickOnPasswordVisibility}
      isVisibilePasswordAgain={isVisibilePasswordAgain}
      handleClickOnPasswordVisibilityAgain={
        handleClickOnPasswordVisibilityAgain
      }
      arrCities={arrCities}
      arrPositions={arrPositions}
      textError={textError}
    />
  );
};

export default AuthContainer;
