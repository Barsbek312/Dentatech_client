import React from "react";
import l from "./Login.module.css";
import "react-phone-input-2/lib/style.css";
import { NavLink } from "react-router-dom";

const Login = ({
  handleFormSubmit,
  handleSubmit,
  register,
  errors,
  setTextError,
  textError,
}) => {
  return (
    <main className={l.login__main}>
      <div className="container">
        <div className={l.login__wrapper}>
          <form className={l.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={l.email__wrapper}>
              <label htmlFor="">Почта</label>
              <input
                {...register("email", {
                  required: "Почта является обязательным полем",
                })}
                placeholder={
                  errors["email"] ? errors["email"].message : "Почта"
                }
                style={{
                  borderColor: errors["email"]
                    ? "red"
                    : "rgba(196, 196, 196, 0.50)",
                }}
                type="text"
                // fix
                onChange={() => {
                  setTextError("");
                }}
              />
            </div>
            <div
              className={l.password__wrapper}
              style={{ marginBottom: `${textError ? "15px" : "25px"}` }}
            >
              <label htmlFor="field__password">Пароль</label>
              <input
                {...register("password", {
                  required: "Пароль является обязательным полем",
                })}
                type="password"
                autoComplete="on"
                id="field__password"
                placeholder={
                  errors["password"] ? errors["password"].message : "Пароль"
                }
                style={{
                  borderColor: errors["password"]
                    ? "red"
                    : "rgba(196, 196, 196, 0.50)",
                }}
              />
            </div>
            {/* <div> */}
            <p className={l.error}>{textError}</p>
            {/* </div> */}
            <button
              type="submit"
              className={l.button}
              style={{ marginTop: `${textError ? "15px" : "0px"}` }}
            >
              Войти
            </button>
          </form>

          <div className={l.auth}>
            <NavLink to="/auth">У вас еще нет аккаунта?</NavLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
