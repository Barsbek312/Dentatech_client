import React, { useEffect, useState } from "react";
import t from "./TeethPart.module.css";
import IncisorTooth from "./IncisorTooth/IncisorTooth";
import FangTooth from "./FangTooth/FangTooth";
import PremolarTooth from "./PremolarTooth/PremolarTooth";
import MolarTooth from "./MolarTooth/MolarTooth";

const TeethPart = ({ handleClickOnTooth, teethRowData, isReverse = false }) => {
  const [molarNums, setMolarNums] = useState(null);
  const [premolarNums, setPremolarNums] = useState(null);
  const [fangNums, setFangNums] = useState(null);
  const [incisorNums, setIncisorNums] = useState(null);

  const [teethRow, setTeethRow] = useState([]);

  useEffect(() => {
    setMolarNums(
      teethRowData["teeth"].filter((tooth) => tooth.toothTypeId === 1)
    );
    setPremolarNums(
      teethRowData["teeth"].filter((tooth) => tooth.toothTypeId === 2)
    );
    setFangNums(
      teethRowData["teeth"].filter((tooth) => tooth.toothTypeId === 3)
    );
    setIncisorNums(
      teethRowData["teeth"].filter((tooth) => tooth.toothTypeId === 4)
    );
  }, []);

  useEffect(() => {
    if (incisorNums && fangNums && premolarNums && molarNums) {
      setTeethRow([
        molarNums.map((item) => (
          <MolarTooth
            key={item.id}
            handleClickOnTooth={handleClickOnTooth}
            item={item}
          />
        )),
        premolarNums.map((item) => (
          <PremolarTooth
            key={item.id}
            handleClickOnTooth={handleClickOnTooth}
            item={item}
          />
        )),
        fangNums.map((item) => (
          <FangTooth
            key={item.id}
            handleClickOnTooth={handleClickOnTooth}
            item={item}
          />
        )),
        incisorNums.map((item) => (
          <IncisorTooth
            key={item.id}
            handleClickOnTooth={handleClickOnTooth}
            item={item}
          />
        )),
      ]);
    }
  }, [incisorNums, fangNums, premolarNums, molarNums]);

  return (
    <div className={t.teeth__part_wrapper}>
      <div className={t.tooth__row_wrapper}>
        {isReverse ? teethRow.toReversed() : teethRow}
      </div>
      <div className={t.teeth__part_title}>
        <div>
          <span>{teethRowData && teethRowData["row"]}</span>
        </div>
      </div>
    </div>
  );
};

export default TeethPart;
