import React, { useEffect, useState } from "react";
import l from "./Login.module.css";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import 'react-phone-input-2/lib/style.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login, resetRegistered } from "../../../redux/user";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [textError, setTextError] = useState("");

    const { register, handleSubmit, formState: {errors} } = useForm();

    const {loading} = useSelector(state => state.user);

    const handleFormSubmit = async (data, event) => {
        event.preventDefault();
        const res = await dispatch(login(data));
        if(res?.payload?.payload?.status === 200) {
            navigate('/');
        } else if(res?.payload?.response?.status === 403 && res?.payload?.response?.data?.message === "Credentials incorrect"){
            setTextError('Логин или пароль был введен неправильно')
        } else {
            setTextError('Произошла ошибка: попробуйте еще раз или зайдите позже');
        }
    }

    useEffect(() => {
        dispatch(resetRegistered())
    }, [])

    return (
        <main className={l.login__main}>
            <div className="container">
                <div className={l.login__wrapper}>
                    <form className={l.form} onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className={l.email__wrapper}>
                            <label htmlFor="">Почта</label>
                            <input {...register("email", {
                                    required: "Почта является обязательным полем",
                                })}
                                placeholder={errors['email'] ? errors['email'].message : "Почта"}
                                style={{ borderColor: errors["email"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                                type="text" 
                                onChange={() => {setTextError("")}}
                            />
                        </div>
                        <div className={l.password__wrapper} style={{marginBottom: `${textError ? "15px" : "25px"}`}}>
                            <label htmlFor="field__password">Пароль</label>
                            <input {...register("password", {
                                required: "Пароль является обязательным полем"
                            })}
                                type="password" 
                                autoComplete="on"
                                id="field__password" 
                                placeholder={errors['password'] ? errors['password'].message : "Пароль"}
                                style={{ borderColor: errors["password"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                                />
                        </div>
                        {/* <div> */}
                        <p className={l.error}>{textError}</p>
                        {/* </div> */}
                        <button type="submit" className={l.button} style={{marginTop: `${textError ? "15px" : "0px"}`}}>
                            Войти
                        </button>
                    </form>

                    <div className={l.auth}>
                        <NavLink to="/auth">У вас еще нет аккаунта?</NavLink>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;