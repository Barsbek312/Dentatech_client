import React from "react";
import a from "./../Auth.module.css";
import eye_vis  from './../../../../assets/images/login__images/eye-off-line.svg'

const Continuation = ({register, errors, isVisibilePassword, handleClickOnPasswordVisibility, isVisibilePasswordAgain, handleClickOnPasswordVisibilityAgain}) => {
  return (
    <>
      <div className={a.email__wrapper}>
        <label htmlFor="">Почта</label>
        <input
          {...register("email", {
            required: "Почта является обязательным полем",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
          placeholder={errors["email"] ? errors["email"].message : "Почта"}
          style={{
            borderColor: errors["email"] ? "red" : "rgba(196, 196, 196, 0.50)",
          }}
          type="text"
        />
      </div>
      <div className={a.password__wrapper}>
        <label htmlFor="field__password">Пароль</label>
        <input
          {...register("password", {
            required: "Пароль является обязательным полем",
          })}
          type={isVisibilePassword ? "text" : "password"}
          id="field__password"
          placeholder={
            errors["password"] ? errors["password"].message : "Введите пароль"
          }
          style={{
            borderColor: errors["password"]
              ? "red"
              : "rgba(196, 196, 196, 0.50)",
          }}
        />
        <div
          className={a.password__visibility_wrapper}
          onClick={handleClickOnPasswordVisibility}
        >
          <img src={eye_vis} alt="password-visibility" />
        </div>
      </div>
      <div className={a.password__wrapper}>
        <label htmlFor="field__again_password">Подтвердите пароль</label>
        <input
          {...register("password__again", {
            required: "Пароль является обязательным полем",
          })}
          type={isVisibilePasswordAgain ? "text" : "password"}
          id="field__again_password"
          placeholder={
            errors["password__again"]
              ? errors["password__again"].message
              : "Введите пароль"
          }
          style={{
            borderColor: errors["password__again"]
              ? "red"
              : "rgba(196, 196, 196, 0.50)",
          }}
        />
        <div
          className={a.password__visibility_wrapper}
          onClick={handleClickOnPasswordVisibilityAgain}
        >
          <img src={eye_vis} alt="password-visibility" />
        </div>
      </div>
    </>
  );
};

export default Continuation;
