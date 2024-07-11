import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetRegistered } from "../../../redux/user";
import Login from "./Login/Login";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [textError, setTextError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading } = useSelector((state) => state.user);

  const handleFormSubmit = async (data, event) => {
    event.preventDefault();
    const res = await dispatch(login(data));
    if (res?.payload?.payload?.status === 200) {
      navigate("/");
    } else if (
      res?.payload?.response?.status === 403 &&
      res?.payload?.response?.data?.message === "Credentials incorrect"
    ) {
      setTextError("Логин или пароль был введен неправильно");
    } else {
      setTextError("Произошла ошибка: попробуйте еще раз или зайдите позже");
    }
  };

  useEffect(() => {
    dispatch(resetRegistered());
  }, []);

  return (
    <Login
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      register={register}
      errors={errors}
      setTextError={setTextError}
      textError={textError}
    />
  );
};

export default LoginContainer;
