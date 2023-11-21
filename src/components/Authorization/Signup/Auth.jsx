import React, { useEffect, useState } from "react";
import a from "./Auth.module.css";
import { useForm, Controller } from "react-hook-form"
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from "react-redux";
import { createUser, getPositions } from "../../../redux/user";
import 'react-phone-input-2/lib/style.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [arrPositions, setArrPositions] = useState([]);
    const [textError, setTextError] = useState('');
    
    const { positions } = useSelector(state => state.user);
    const { loadingUser } = useSelector(state => state.user);

    const { control, register, handleSubmit, formState: { errors } } = useForm();

    const handleFormSubmit = async (data, event) => {
        event.preventDefault();
        data['isAdmin'] = true;
        const res = await dispatch(createUser(data));
        if(res?.payload?.status === 201) {
            navigate('/verify-email-notification');
        } else if(res?.payload?.response?.status === 403 && res?.payload?.response?.data?.message === "Credentials taken") {
            setTextError("Аккаунт с такой почтой уже существует");
        } else {
            setTextError('Произошла ошибка: попробуйте еще раз или зайдите позже');
        }
    }

    useEffect(() => {
        const fetchPositions = async () => {
            await dispatch(getPositions());
        }
        fetchPositions();
    }, [])

    useEffect(() => {
        setArrPositions(positions);
    }, [positions])



    return (
        <main className={a.auth__main}>
            <div className="container">
                <div className={a.auth__wrapper}>
                    <form className={a.form} onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className={a.name__wrapper}>
                            <label htmlFor="field__name">Имя</label>
                            <input {...register("name", {
                                required: "Имя является обязательным полем"
                            })}
                                type="text"
                                id="field__name"
                                placeholder={errors['name'] ? errors['name'].message : "Имя"}
                                style={{ borderColor: errors["name"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                            />
                        </div>
                        <div className={a.surname__wrapper}>
                            <label htmlFor="field__surename">Фамилия</label>
                            <input {...register("surname", {
                                required: "Фамилия является обязательным полем"
                            })}
                                type="text"
                                id="field__surename"
                                placeholder={errors['surname'] ? errors['surname'].message : "Фамилия"}
                                style={{ borderColor: errors["surname"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                            />
                        </div>
                        <div className={a.email__wrapper}>
                            <label htmlFor="">Почта</label>
                            <input {...register("email", {
                                required: "Почта является обязательным полем",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address",
                                },
                            })}
                                placeholder={errors['email'] ? errors['email'].message : "Почта"}
                                style={{ borderColor: errors["email"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                                type="text"
                            />
                        </div>
                        <div className={a.phone__wrapper}>
                            <label htmlFor="field__phone">Телефон</label>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue={""}
                                rules={{ required: "Телефон является обязательным полем" }}
                                render={({ field, fieldState: { error } }) => (
                                    <PhoneInput
                                        {...field}
                                        id="field__phone"
                                        country={'kg'}
                                        containerStyle={{
                                            border: error ? '1px solid red' : '',
                                            borderRadius: '5px' // Можете настроить в соответствии со стилем вашего приложения
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={a.surname__wrapper}>
                            <label htmlFor="field__clinic">Клиника</label>
                            <input {...register("clinic", {
                                required: "Клиника является обязательным полем"
                            })}
                                type="text"
                                id="field__clinic"
                                placeholder={errors['clinic'] ? errors['clinic'].message : "Название клиники"}
                                style={{ borderColor: errors["clinic"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                            />
                        </div>
                        <div className={a.surname__wrapper}>
                            <label htmlFor="field__branch">Филиал(адрес)</label>
                            <input {...register("branch", {
                                required: "Филиал является обязательным полем"
                            })}
                                type="text"
                                id="field__branch"
                                placeholder={errors['branch'] ? errors['branch'].message : "Адрес"}
                                style={{ borderColor: errors["branch"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                            />
                        </div>
                        <div className={a.position__wrapper}>
                            <FormControl fullWidth size="small" error={errors['positionId']} >
                                <InputLabel id={a.select_label_position}>
                                    {errors['positionId'] ? errors['positionId'].message : "Должность"}
                                </InputLabel>
                                <Controller
                                    name="positionId"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: "Позиция является обязательным полем" }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <Select
                                                {...field}
                                                labelId={a.select_label_position}
                                                label={error ? error.message : "Должность"}>
                                                {arrPositions && arrPositions.map(position => (
                                                    <MenuItem key={position.id} value={position.id}>{position.position}</MenuItem>
                                                ))}
                                            </Select>
                                        </>
                                    )} />
                            </FormControl>
                        </div>
                        <div className={a.position__wrapper}>
                            <FormControl fullWidth size="small" error={errors['isMale']}>
                                <InputLabel id={a.select_label_position}>
                                    {errors['isMale'] ? errors['isMale'].message : "Пол"}
                                </InputLabel>
                                <Controller
                                    name="isMale"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: "Пол является обязательным полем" }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Select
                                            {...field}
                                            labelId={a.select_label_position}
                                            label={error ? error.message : "Пол"}
                                        >
                                            <MenuItem value={true}>Мужской</MenuItem>
                                            <MenuItem value={false}>Женский</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </div>
                        <div className={a.password__wrapper}>
                            <label htmlFor="field__password">Пароль</label>
                            <input {...register("password", {
                                required: "Пароль является обязательным полем"
                            })}
                                type="password"
                                id="field__password"
                                placeholder={errors['password'] ? errors['password'].message : "Пароль"}
                                style={{ borderColor: errors["password"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                            />
                        </div>
                        <p className={a.text_error}>{textError}</p>
                        <button type="submit" className={a.button}>
                            Регистрация
                        </button>
                    </form>

                    <div className={a.login}>
                        <span>
                            Уже есть аккаунт?
                        </span>
                        <NavLink to="/login">Войти</NavLink>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Auth;