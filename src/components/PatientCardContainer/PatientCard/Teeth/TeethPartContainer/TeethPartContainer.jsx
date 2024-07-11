import React, { useEffect, useState } from "react";
import MolarTooth from "./TeethPart/MolarTooth/MolarTooth";
import FangTooth from "./TeethPart/FangTooth/FangTooth";
import PremolarTooth from "./TeethPart/PremolarTooth/PremolarTooth";
import IncisorTooth from "./TeethPart/IncisorTooth/IncisorTooth";
import TeethPart from "./TeethPart/TeethPart";

const TeethPartContainer = ({
  handleClickOnTooth,
  teethRowData,
  isReverse = false,
}) => {
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

  return <TeethPart 
    isReverse={isReverse}
    teethRowData={teethRowData}
    teethRow={teethRow}
  />
};

export default TeethPartContainer;
