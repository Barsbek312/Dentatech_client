import React, { useState } from "react";
import sd from "./ServiceDisease.module.css";

const ServiceDisease = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  return (
    <main>
      <div className="container">
        <div className={sd.header}>
          <h2>Архив</h2>
          <div>
            <input
              type="text"
              placeholder="Поиск"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
          </div>
        </div>
        <div className={sd.main}>
          <header>
            <ul>
              {["Болезни", "Текстовые шаблоны", "Услуги"].map((item, index) => {
                return (
                  <li
                    onClick={() => setIsActiveIndex(index)}
                    key={index}
                    className={`${isActiveIndex === index ? sd.active : ""}`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </header>
          <ul className={sd.list__of_personal}>
            <div>
              <ul className={sd.list__of_title}>
                <li>Цвет болезни</li>
                <li>Название болезни</li>
              </ul>
              <div className={sd.add__disease_wrapper}>
                <button
                  onClick={() => {
                    setIsShow(true);
                  }}
                >
                  Добавить болезнь
                </button>
              </div>
            </div>
            {/* {renderPesonal(personalList)} */}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ServiceDisease;
